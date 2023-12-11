// grab the exercises list section from DOM
const exercisesList = document.getElementById("exercises-list")

// populate it with 3 exercises
// add a click event to each of the ellipsis to function as a more-options dropdown
for (let i = 1; i <= 3; i++) {
    let exerciseEl = `
        <div id="exercise-${i}" class="exercise" draggable="true">
            <button class="move-exercise"><i class="fa-solid fa-up-down"></i></button>
            <a href="#" data-click="exercise">Exercise ${i}</a>
            <div class="options" data-click="ellipsis">
                <button
                    class="options-button"
                    aria-label="options menu button"
                    aria-haspopup="menu"
                    aria-controls="options-menu-${i}"
                    aria-expanded="false"
                ><i class="fa-solid fa-ellipsis"></i></button>
                <ul role="menu" id="options-menu-${i}" class="options-menu">
                    <li class="swap-exercise">
                        <a href="#">
                            <span><i class="fa-solid fa-right-left"></i> Change</span>
                        </a>
                    </li>
                    <li class="delete-exercise">
                        <a href="#">
                            <span><i class="fa-solid fa-trash-can"></i> Delete</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `
    exercisesList.insertAdjacentHTML("beforeend", exerciseEl)

    // grab the current exercise
    exerciseEl = document.getElementById(`exercise-${i}`)
    
    // grab its options menu button and the options menu itself
    const optionsBtn = exerciseEl.lastElementChild.firstElementChild
    const optionsMenu = exerciseEl.lastElementChild.lastElementChild

    // add a click event to the optionsBtn
    optionsBtn.addEventListener("click", function(e) {
        // console.log(e.target.offsetParent)
        // open the options menu
        // this.setAttribute(
        //     "aria-expanded",
        //     optionsBtn.getAttribute("aria-expanded") ? "false" : "true"
        // )

        // optionsMenu.classList.add("open") // used "toggle()" rather than "add" to allow user to click the ellipsis again to hide the menu
        // // e.target.offsetParent.setAttribute("data-ellipsis", "open")
    })

}

document.addEventListener("click", function(e) {
    // if the ellipsis is clicked
    if (e.target.offsetParent.dataset.click === "ellipsis") {
        // if no option menus are open
        if (!document.querySelector(".open")) {
            // open this one
            e.target.offsetParent.children[1].classList.add("open")
            e.target.offsetParent.firstElementChild.setAttribute("aria-expanded", "true")
        }
        // if an options menu is already open
        else {
            // close it
            document.querySelector(".open").classList.remove("open")
            e.target.offsetParent.firstElementChild.setAttribute("aria-expanded", "false")
        }
        
    }
    // if anywhere else on the page is clicked
    else if (e.target.offsetParent.dataset.click !== "ellipsis"){
        // close the open menu
        document.querySelector(".open").classList.remove("open")
        document.querySelector("button[aria-expanded='true']").setAttribute("aria-expanded", "false")
    }
})

// get all the exercises from the DOM
const exercises = document.querySelectorAll(".exercise")

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