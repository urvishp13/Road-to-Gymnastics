import { exercises as allExercises} from "./sample-data.js"

// grab the exercises list section from DOM
const exercisesList = document.getElementById("exercises-list")
const exercisesInRegiment = []

function renderExerciseList(exercises) {
    exercisesList.innerHTML = exercises.map((exercise, index) => `
        <div id="exercise-${index+1}" class="exercise" draggable="true">
            <button class="move-exercise"><i class="fa-solid fa-up-down"></i></button>
            <a href="exercise-info.html">${exercise.name}</a>
            <div class="options">
                <button
                    class="options-button"
                    aria-label="options menu button"
                    aria-haspopup="menu"
                    aria-controls="options-menu-${index+1}"
                    aria-expanded="false"
                ><i class="fa-solid fa-ellipsis"></i></button>
                <ul role="menu" id="options-menu-${index+1}" class="options-menu">
                    <li class="swap-exercise">
                        <a class="swap-exercise" data-swap="swap" href="all-exercises.html">
                            <i class="fa-solid fa-right-left"></i> Change
                        </a>
                    </li>
                    <li class="delete-exercise">
                        <a href="#">
                            <i class="fa-solid fa-trash-can"></i> Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `).join("")
}

function createOptionsMenuForExercises(exercises) {

    // grab its options menu button and the options menu itself
    for (const exercise of exercises) {

        const optionsBtn = exercise.lastElementChild.firstElementChild
        const optionsMenu = exercise.lastElementChild.lastElementChild

        // add a click event to the optionsBtn
        optionsBtn.addEventListener("click", function() {
            // open the options menu
            this.setAttribute(
                "aria-expanded",
                optionsBtn.getAttribute("aria-expanded") ? "false" : "true"
            )

            optionsMenu.classList.toggle("open")
        })
    }
}

function makeExercisesDraggable(exercises) {
    // for each exercise
    exercises.forEach(exercise => {
        // add a visual when it is started to be dragged
        exercise.addEventListener("dragstart", function() {
            this.classList.add("dragging")
        })

        // remove the visual when dragging it has ended
        exercise.addEventListener("dragend", function() {
            this.classList.remove("dragging")
        })
    })

    // make the exercisesList a valid drop zone for the dragged exercise
    exercisesList.addEventListener("dragover", function(e) {
        e.preventDefault() // used to turn this exerciseList into a drop zone for the draggable exercises
        
        // take the exercise being dragged
        const draggingExercise = document.querySelector(".dragging")

        // get the exercise below the mouse cursor
        const exerciseBelow = getExerciseBelow(this, e.clientY)
        
        // and append the exercise being dragged above the exercise below it
        if (exerciseBelow) {
            this.insertBefore(draggingExercise, exerciseBelow)
        }
        // if no exercise below it, append the exercise being dragged to the bottom of the list
        else {
            this.appendChild(draggingExercise)
        }
            
    })

    // get the exercise below the dragged exercise
    function getExerciseBelow(container, yMouse) {
        // get all the exercises in the list not being dragged
        const undraggedExercises = [...container.querySelectorAll('.exercise:not(.dragging)')]

        // get the exercise closest to the mouse cursor
        return undraggedExercises.reduce((closest, undragged) => {
            // get the dimensions of the current undragged exercise, so...
            const undraggedRect = undragged.getBoundingClientRect()
            // can get the distance between the midline of that exercise and our mouse
            const distance = yMouse - undraggedRect.top - undraggedRect.height / 2
            
            // if the cursor is above an undragged exercise
            if (distance < 0 && distance > closest.distance) {
                // return that undragged exercise
                return { distance: distance, element: undragged }
            }
            // else, the cursor is above nothing
            else {
                // so return the exercise being dragged
                return closest
            }
        }, { distance: Number.NEGATIVE_INFINITY }).element

    }
}

function createUIUXForExercises() {
    renderExerciseList(exercisesInRegiment)
    createOptionsMenuForExercises(document.getElementsByClassName("exercise"))
    makeExercisesDraggable(document.querySelectorAll(".exercise"))
}

function getExercisesRandomly() {
    const indeces = [] // used in the process of getting unique random numbers (and thus exercises)
    while (exercisesInRegiment.length != 3) {
        const index = Math.floor(Math.random() * allExercises.length)
        // if this index is unique
        if (!indeces.includes(index)) {
            indeces.push(index)
            exercisesInRegiment.push(allExercises[index])
        }
    }

    return exercisesInRegiment
}

function generateRandomRegiment() {
    getExercisesRandomly() // get the exercises in this regiment
    createUIUXForExercises()
}

document.addEventListener("click", function(e) {
    // if the "Change exercise"/"Add exercise" is clicked
        // permiate that decision to other pages
    if (e.target.dataset.swap) {
        sessionStorage.setItem("swapORadd", "swap")
    }
    else if (e.target.dataset.add) {
        sessionStorage.setItem("swapORadd", "add")
    }
    // if an exercise is clicked
    else if (e.target) {
        // save this exercise's information (i.e. name --> every exercise must have a unique name)
        sessionStorage.setItem("exerciseWantInfoOn", e.target.textContent)
    }
})

// when the page is redirected (reloaded) to from the all-exercises page
window.addEventListener("load", function() {
    const exercise = JSON.parse(sessionStorage.getItem("exerciseToTransfer"))
    const decision = sessionStorage.getItem("swapORadd")

    // add the new exercise to the bottom of the exercise list and to the array of this regiment's exercises
    if (exercise) {
        if (decision === "add") {
            exercisesInRegiment.push(exercise)
            createUIUXForExercises()
        }
    }

    sessionStorage.clear()
})

generateRandomRegiment()