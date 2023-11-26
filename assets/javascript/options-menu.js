// grab the exercises list section from DOM
const exercisesList = document.getElementById("exercises-list")

// populate it with 3 exercises
// add a click event to each of the ellipsis to function as a more-options dropdown
for (let i = 1; i <= 3; i++) {
    let exerciseEl = `
        <div id="exercise-${i}" class="exercise">
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