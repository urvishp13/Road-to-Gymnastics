// render the workout to the page based on the type of workout this is i.e. supersets or straight sets
const workout = document.getElementById("workout")
// create a filler, repetitions-done tracker for all the exercises
let repsTracker = []
renderWorkout( JSON.parse( sessionStorage.getItem("regiment") ), sessionStorage.getItem("workoutType") )

function renderWorkout(regiment, workoutType) {
    let workoutHTML = ""
    // if supersets, 
    if (workoutType === "supersets") {
        // render 3 sets consisting of:
        for (let i = 1; i <= 3; i++) { 
            let setHTML = `
                <div class="set">
                    <h3>SET ${i}</h3>
                    <ul class="set-exercises">
            `
        
            // add 1 instance of each exercise to the set
            regiment.forEach((exercise, index) => {
                setHTML += `
                    <li class="exercise exercise-${index+1}">
                        <label>${exercise.name}
                            <input type="number" disabled>
                        </label>
                    </li>
                `
                
            })
            setHTML += "</ul></div>" // set finished
            workoutHTML += setHTML // add the set to the workout
        }
    }
    else if (workoutType === "straight sets") {
        // render as many sets as exercises in regiment
        for (let i = 0; i < regiment.length; i++) { 
            let setHTML = `
                <div class="set">
                    <h3>SET ${i+1}</h3>
                    <ul class="set-exercises">
            `

            let exercise = regiment[i]
            // add 3 instances of an exercise to the set
            for (let j = 0; j < 3; j++) {
                setHTML += `
                    <li class="exercise">
                        <label>${exercise.name}
                            <input type="number" disabled>
                        </label>
                    </li>
                `
            }

            setHTML += "</ul></div>" // set finished
            workoutHTML += setHTML // add the set to the workout
        }
    }

    // workout completely generated
    workout.innerHTML = workoutHTML

    // populated repsTracker with as many 0s as exercises
    for (let i = 0; i < 3 * regiment.length; i++) {
        repsTracker.push(0)
    }

    sessionStorage.setItem( "workout", JSON.stringify(repsTracker) )
}

// get the form element from the current exercise (will be used repeatedly as we cycle through the exercises)
const form = document.getElementById("on-current-exercise")

const exercises = document.getElementsByClassName("exercise")

let current = 0
// start the workout with the reps for the first exercise to be recordable
window.addEventListener("load", function() {
    activateCurrentExercise()
})

// when current exercise is finished
form.addEventListener("submit", function(e) {
    e.preventDefault() // prevent the form from resetting

    // if not the first exercise in the workout
    if (current > 0) {
        disablePreviousExercise(current-1)
    }

    // if on the last exercise
    if (current === exercises.length) {
        // do not propagate form down the workout list anymore
        return
    }

    // if not the last exercise in the workout
    if (current < exercises.length) {
        // make the current exercise's rep input field interactable
        activateCurrentExercise()
    }

    // if reached the last exercise in the workout
    if (current === exercises.length) {
        // replace the "next" button with a "done" button
        const next = document.getElementById("next-exercise-btn")
        const done = document.getElementById("finished-workout-btn")

        next.style.display = "none"
        done.style.display = "inline"
    }

    // previous rep record carries over to next exercise, so reset the field
    form.reset()
})

function activateCurrentExercise() {
    // get the current exercise in the set
    const currentExercise = exercises[current]
    // get the input field for this exercise
    const input = currentExercise.lastElementChild.lastElementChild
    // move the form to the current exercise and make its input un-disabled
    input.replaceWith(form)
    // prep for activating the next exercise
    current++
}

// remove the ability to interact with the previous exercise: alter the display to: "(rep number) reps" and make input field disabled
function disablePreviousExercise(exercise) {
    const inputField = form.children[1]
    const repsDone = inputField.value

    // changes the 0 reps for the exercise to the inputted (completed reps) value
    repsTracker = repsTracker.map((rep, index) => {
        return index === exercise ? repsDone : rep
    })
    sessionStorage.setItem( "workout", JSON.stringify(repsTracker) )

    // disable the previous exercise's input element
    const wrapper = document.createElement("div")
    wrapper.classList.add("previous-exercise")
    wrapper.innerHTML = `<input type="number" value="${repsDone}" disabled> reps`
    form.replaceWith(wrapper)
}