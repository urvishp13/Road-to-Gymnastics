// get the type of workout completed
const workoutType = sessionStorage.getItem("workoutType")
// get the reps completed during the workout
const repsCompleted = JSON.parse(sessionStorage.getItem("completedWorkout"))
// get the exercises in the workout
const regiment = JSON.parse(sessionStorage.getItem("regiment"))
// get the DOM element to place the workout summary in
const summary = document.getElementById("summary")
const modal = document.getElementById("modal")

let summaryHTML = ''

// if the workoutType is supersets
if (workoutType === "supersets") {
    // there will only be 3 sets
    for (let i = 1; i <= 3; i++) {
        summaryHTML += `
            <div class="set" data-set="${i}">
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
            <div class="set" data-set="${i}">Set ${i}</div>
        ` 
    }
}
summary.innerHTML = summaryHTML

// FOR SUPERSETS
// go through the repsCompleted array 1-by-1
// each set starts at (multiples of numbers of exercises) - 1

// FOR STRAIGHT SETS
// each set will have 3 instances of 1 exercise
// each set starts at (multiples of 3) - 1

document.addEventListener("click", function(e) {
    
    if (e.target.dataset.set) {
        // get the set number
        const setNumber = Number(e.target.dataset.set)
        // console.log(setNumber)
        // get the set from the repsDone array
        const setReps = repsCompleted.slice((setNumber - 1) * 3 , setNumber * 3)
        // console.log(setReps)

        if (workoutType === "straight sets") {
            modal.innerHTML = `
                <button id="close-modal-btn" class="close-modal-btn">Close</button>
                <h4 class="set-title">Set ${setNumber}</h4>
                <div class="set-summary">
                    <ul class="set-exercises">
                        <li class="exercise">
                            <label>${regiment[setNumber-1].name}</label>
                            <input type="number" value=${setReps[0]} disabled> reps
                        </li>
                        <li class="exercise">
                            <label>${regiment[setNumber-1].name}</label>
                            <input type="number" value=${setReps[1]} disabled> reps
                        </li>
                        <li class="exercise">
                            <label>${regiment[setNumber-1].name}</label>
                            <input type="number" value=${setReps[2]} disabled> reps
                        </li>
                    </ul>
                </div>
            `
            modal.showModal()
            document.getElementById("close-modal-btn").addEventListener("click", function() {
                modal.close()
            })
        }
    }
})