// render the workout to the page based on the type of workout this is i.e. supersets or straight sets
const workout = document.getElementById("workout")
renderWorkout( JSON.parse( sessionStorage.getItem("regiment") ), sessionStorage.getItem("workoutType") )

function renderWorkout(regiment, workoutType) {
    let workoutHTML = ""
    // render 3 sets consisting of:
    for (let i = 1; i <= 3; i++) { 
        let setHTML = `
            <div id="set-${i}" class="set set-${i}">
                <h3>SET ${i}</h3>
                <ul class="set-exercises">
        `

        // if supersets, 
        if (workoutType === "supersets") {
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
    } // workout completely generated

    workout.innerHTML = workoutHTML
}

// get the form element from the current exercise (will be used repeatedly as we cycle through the exercises)
const form = document.getElementById("on-current-exercise")

// grab the first exercise
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
        disablePreviousExercise()
    }

    // make the current exercise's rep input field interactable
    activateCurrentExercise()

    // if reached the last exercise in the workout
    if (current === exercises.length) {
        // replace the next button with a done button
        const next = document.getElementById("next-exercise-btn")
        const done = document.getElementById("finished-workout-btn")

        next.style.display = "none"
        done.style.display = "inline"
    }

    // previous rep record carries over to next exercise, so reset the field
    form.reset()
})

function activateCurrentExercise() {
    // get the next exercise in the set
    const currentExercise = exercises[current]
    // get the number of reps entered for this exercise
    const input = currentExercise.lastElementChild.lastElementChild
    // move the form to the next exercise and make input un-disabled
    input.replaceWith(form)
    // move on to the next exercise
    current++
}

// remove the ability to interact with the previous exercise: alter the display to: "(rep number) reps" and make input field disabled
function disablePreviousExercise() {
    const inputField = form.children[1]
    const repsDone = inputField.value
    const wrapper = document.createElement("div")
    wrapper.classList.add("previous-exercise")
    wrapper.innerHTML = `<input type="number" value="${repsDone}" disabled> reps`
    form.replaceWith(wrapper)
}