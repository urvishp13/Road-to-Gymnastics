import { exercises } from "./sample-data.js"

// grab the filter buttons from the DOM
const all = document.querySelector(".btn.all")
const custom = document.querySelector(".btn.custom")
const random = document.querySelector(".btn.random")

let exerciseChoosen = null // to be exported for use in regiment page

let exercisesHTML = '' // HTML to be rendered to DOM

// if incoming request is to add/swap exercise, insert the add/swap icon into the exercisesHTML
const actionIcon = ''
const swap = '<a class="swap-exercise-button" href="#"><i class="fa-solid fa-right-left" data-decision="swap"></i></a>'
const add = '<a class="add-exercise-button" href="#"><i class="fa-solid fa-plus" data-decision="add"></i></a>'

// save the exercise adding/swapping with
document.addEventListener("click", function(e) {
    const clickedOn = e.target.dataset

    // make one selectable at a time between the 'all' and 'custom' buttons
    // if clickedOn 'all' btn
    if (clickedOn.filter === "all") {
        switchFilterSelection(custom, all)
    }
    // if clickedOn 'custom' btn
    else if (clickedOn.filter === "custom") {
        switchFilterSelection(all, custom)
    }
    // if clickedOn 'random' btn
    else if (clickedOn.filter === "random") {
        // the random button can be selected regardless of if the 'all' and 'custom' buttons are selected
        random.classList.toggle("selected")
    }
    // if the user decides to add/swap the exercise
    else if (clickedOn.decision) {
        // save that exercise
        exerciseChoosen = e.target.offsetParent // add this exercise to the regiment page
    }

})

function switchFilterSelection(selectedSoFar, wantSelected) {
    if (selectedSoFar.classList.contains("selected")) {
        selectedSoFar.classList.remove("selected")
        wantSelected.classList.add("selected")
    }
}

// sort the exercises in alphabetical order
exercises.sort(function(curr, next) {
    const currName = curr.name // current exercise name
    const nextName = next.name // next exercise name

    return currName.localeCompare(nextName)
})

console.log(exercises)

// add the letter separations to the alphabetically ordered exercise list
// go through each exercise
let lastLetter = ''
exercises.forEach(exercise => {
    // the HTML for each individual exercise
    const exerciseHTML = `
        <div class="exercise">
            <a class="exercise-name" href="#"><h3>${exercise.name}</h3></a>
            ${add} <!-- link to regiment page -->
        </div>
    `
    // analyze its first character
    const firstChar = exercise.name.charAt(0).toUpperCase()
    // if its the first time seeing that character
    if (firstChar != lastLetter) {
        // add it to the top of the exerciseHTML as a heading
        const letterHeading = `<h4 class="alpha-header">${firstChar.toUpperCase()}</h4>`
        exercisesHTML += letterHeading + exerciseHTML
        // update the lastLetter in the alphabet seen to be the new one
        lastLetter = firstChar
    }
    // else, add the exercise's HTML to the overall without a heading added before it
    else {
        exercisesHTML += exerciseHTML + "</div>"
    }

})

// render the exercises on to the page
function render() {
    document.getElementById("all-exercises").innerHTML = exercisesHTML
}

render()

export { exerciseChoosen }