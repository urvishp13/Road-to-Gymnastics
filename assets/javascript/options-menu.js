// grab the exercises list section from DOM
const exercisesList = document.getElementById("exercises-list")

// populate it with 3 exercises
// add a click event to each of the ellipsis to function as a more-options dropdown
for (let i = 1; i <= 3; i++) {
    let exerciseEl = `
        <div id="exercise-${i}" class="exercise" draggable="true">
            <button class="move-exercise"><i class="fa-solid fa-up-down"></i></button>
            <span>Exercise ${i}</span>
            <div class="options">
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
        <div class="drop-zone"></div>
    `
    exercisesList.insertAdjacentHTML("beforeend", exerciseEl)

    // grab the current exercise
    exerciseEl = document.getElementById(`exercise-${i}`)
    
    // grab its options menu button and the options menu itself
    const optionsBtn = exerciseEl.lastElementChild.firstElementChild
    const optionsMenu = exerciseEl.lastElementChild.lastElementChild

    // add a click event to the optionsBtn
    optionsBtn.addEventListener("click", function(e) {
        // open the options menu
        this.setAttribute(
            "aria-expanded",
            optionsBtn.getAttribute("aria-expanded") ? "false" : "true"
        )

        optionsMenu.classList.toggle("open")
    })

}

for (const exerciseEl of document.getElementsByClassName("exercise")) {
    exerciseEl.addEventListener("dragstart", startDrag)
}

const dropZones = document.getElementsByClassName("drop-zone")

for (const dropZone of dropZones) {
    dropZone.addEventListener("dragenter", dragEnter)
    dropZone.addEventListener("dragover", dragOver)
    dropZone.addEventListener("dragleave", dragLeave)
    dropZone.addEventListener("drop", drop)
}

// on the start of dragging the exercise
function startDrag(e) {
    e.dataTransfer.setData("text/plain", e.target.id)
    // hide the exercise in the DOM while dragging it
    setTimeout(function() {
        e.target.classList.add("hide")
    }, 0)
}

// when draggable exercise enters droppable space (i.e. the space between exercises)
function dragEnter(e) {
    e.preventDefault() // allows one exercise to be dropped on top of another one
    console.log(e.target)
    e.target.classList.add("drag-over")
}

// when draggable exercise is inside droppable space (i.e. the space between exercises)
function dragOver(e) {
    e.preventDefault() // allows one exercise to be dropped on top of another one
    e.target.classList.add("drag-over")
}

// when draggable exercise leaves droppable space
function dragLeave(e) {
    e.target.classList.remove("drag-over")
}

// when draggable exercise is dropped
function drop(e) {
    e.target.classList.remove("drag-over")

    // get the dragging exericse
    const id = e.dataTransfer.getData("text/plain")
    const dragging = document.getElementById(id)

    // add it to the drop target (i.e. after the drop-zone hovering over)
    e.target.insertAdjacentElement("afterend", dragging)

    // make the dragging exercise visible again
    dragging.classList.remove("hide")
}