import { exercises } from "./sample-data.js"

// grab the filter buttons from the DOM
const all = document.querySelector(".btn.all")
const custom = document.querySelector(".btn.custom")
const random = document.querySelector(".btn.random")

// add a click event to each of them
// if make one selectable at a time between the 'all' and 'custom' buttons
all.addEventListener("click", function() {
    switchSelection(custom, all)
})

custom.addEventListener("click", function() {
    switchSelection(all, custom)
})

// the random button can be selected regardless of if the 'all' and 'custom' buttons are selected
random.addEventListener("click", function() {
    this.classList.toggle("selected")
})

function switchSelection(selectedSoFar, wantSelected) {
    if (selectedSoFar.classList.contains("selected")) {
        selectedSoFar.classList.remove("selected")
        wantSelected.classList.add("selected")
    }
}

// sort the exercises in alphabetical order
exercises.sort(function(curr, next) {
    if (curr.name < next.name) {
        return -1
    }
    if (curr.name > next.name) {
        return 1
    }
    return 0
})

let exercisesHTML = ''

// if incoming request is to add/swap exercise, insert the add/swap icon into the exercisesHTML
const actionIcon = ''
const swap = '<a class="swap-exercise-button" href="#"><i class="fa-solid fa-right-left" data-decision="swap"></i></a>'
const add = '<a class="add-exercise-button" href="#"><i class="fa-solid fa-plus" data-decision="add"></i></a>'

exercises.forEach(exercise => {
    exercisesHTML += `
    <div class="exercise">
        <h3 class="exercise-name">${exercise.name}</h3>
        ${add} <!-- link to regiment page -->
    </div>
    `
})

// render the exercises on to the page
function render() {
    document.getElementById("all-exercises").innerHTML = exercisesHTML
}

render()

let exerciseChoosen = null
// save the exercise adding/swapping with
document.addEventListener("click", function(e) {
    // if the user decides to add/swap the exercise
    if (e.target.dataset.decision) {
        // save that exercise
        exerciseChoosen = e.target.offsetParent
        // add it to the regiment page
    }

})

export { exerciseChoosen }