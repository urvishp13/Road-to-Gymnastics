// render the workout to the page based on the type of workout this is i.e. supersets or straight sets
const workout = document.getElementById("workout")
renderWorkout( JSON.parse( sessionStorage.getItem("regiment") ), sessionStorage.getItem("workoutType") )

function renderWorkout(regiment, workoutType) {
    let workoutHTML = ""
    // render 3 sets consisting of:
    for (let i = 1; i <= 1; i++) { 
        let setHTML = `
            <div id="set-${i}" class="set set-${i}">
                <h3>SET ${i}</h3>
                <ul class="set-exercises override-container">
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
            setHTML += "</ul>" // set finished
            workoutHTML += setHTML // add the set to the workout
        }
    } // workout completely generated

    workout.innerHTML = workoutHTML
}

// get the form element from the current exercise (will be used repeatedly as we cycle through the exercises)
const form = document.getElementById("on-current-exercise")

// grab the first exercise
const exercises = document.getElementsByClassName("exercise")
const firstExercise = exercises[0]
const input = firstExercise.lastElementChild.lastElementChild
input.replaceWith(form)

// when NEXT (exercise) button is clicked
form.addEventListener("submit", function() {
    // move the form to the next exercise and make input un-disabled

    // remove the form from the previous exercise and alter its display to: "(rep number) reps" and make it disabled
})

function activateNextExercise() {}

function disablePreviousExercise() {}