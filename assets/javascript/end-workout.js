// get the type of workout completed
const workoutType = sessionStorage.getItem("workoutType")
// get the reps completed during the workout
const repsCompleted = sessionStorage.getItem("completedWorkout")
// get the exercises in the workout
const regiment = JSON.parse(sessionStorage.getItem("regiment"))
// get the DOM element to place the workout summary in
const summary = document.getElementById("summary")

let summaryHTML = ''

// if the workoutType is supersets
if (workoutType === "supersets") {
    // there will only be 3 sets
    for (let i = 1; i <= 3; i++) {
        summaryHTML += `
            <div id="set-${i}" class="set">
                <h4>Set ${i}</h4>
            </div>
        ` 
    }
}
// else if the workoutType is straigth sets
else {
    // there will be as many sets as exercises
    for (let i = 1; i <= regiment.length; i++) {
        summaryHTML += `
            <div id="set-${i}" class="set">
                <h4>Set ${i}</h4>
            </div>
        ` 
    }
}
summary.innerHTML = summaryHTML

// FOR SUPERSETS
// go through the repsCompleted array 1-by-1
// each set starts at multiples of numbers of exercises - 1

// FOR STRAIGHT SETS
// each set will have 3 instances of 1 exercise