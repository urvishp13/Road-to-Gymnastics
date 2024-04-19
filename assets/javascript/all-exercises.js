import { allExercises, customExercises } from "./sample-data.js"
// import db from "./firestore.js"
// import { collection, doc, getDocs } from "firebase/firestore"

// grab the filter buttons from the DOM
const all = document.querySelector(".btn.all")
const custom = document.querySelector(".btn.custom")
const random = document.querySelector(".btn.random")

// if incoming request is to add/swap exercise, insert the add/swap icon into the exercisesHTML
const actionIcon = sessionStorage.getItem("swapORadd")
const swap = '<a class="swap-exercise-button" href="random-regiment.html"><i class="fa-solid fa-right-left" data-decision="swap"></i></a>'
const add = '<a class="add-exercise-button" href="random-regiment.html"><i class="fa-solid fa-plus" data-decision="add"></i></a>'

const search = document.getElementById("search")

// const customExercises = await getCustomExercisesFromDatabase()
// const allExercises = [...exercises, ...customExercises]

// save the exercise adding/swapping with
document.addEventListener("click", function (e) {
    const clickedOn = e.target.dataset

    // make one selectable at a time between the 'all' and 'custom' buttons
    // if clickedOn 'all' btn
    if (clickedOn.filter === "all") {
        switchFilterSelection(custom, all)
        render(allExercises, false)
    }
    // if clickedOn 'custom' btn
    else if (clickedOn.filter === "custom") {
        switchFilterSelection(all, custom)
        // show CUSTOM exercises only
        render(customExercises, true)
    }
    // if clickedOn 'random' btn
    else if (clickedOn.filter === "random") {
        // the random button can be selected regardless of if the 'all' and 'custom' buttons are selected
        random.classList.toggle("selected")
    }
    // if the user decides to add/swap the exercise 
    else if (clickedOn.decision) {
        // save that exercise
        sessionStorage.setItem("exerciseAddOrSwap", e.target.parentElement.previousElementSibling.textContent.trim())
    }
    // if the user selects one exercise from the list
    else if (clickedOn.exercise) {
        sessionStorage.setItem("exerciseAddOrSwap", e.target.textContent.trim())
    }

})

function switchFilterSelection(selectedSoFar, wantSelected) {
    if (selectedSoFar.classList.contains("selected")) {
        selectedSoFar.classList.remove("selected")
        wantSelected.classList.add("selected")
    }
}

// sort the exercises in alphabetical order
function sortExercisesList(exercisesList) {
    exercisesList.sort(function (curr, next) {
        const currName = curr.title // current exercise name
        const nextName = next.title // next exercise name

        return currName.localeCompare(nextName)
    })
}

function generateExerciseList(list, isCustom) {
    // add the letter separations to the alphabetically ordered exercise list
    // go through each exercise
    let lastLetter = ''
    let exercisesHTML = '' // HTML to be rendered to DOM
    list.forEach(exercise => {
        // the HTML for each individual exercise
        const exerciseHTML = `
            <div class="exercise" data-add-swap="true">
                <a class="exercise-name" href="add-swap-exercise.html" data-custom=${isCustom}><h3 data-exercise="true">${exercise.title}</h3></a>
                ${actionIcon === "swap" ? swap : add} <!-- link to regiment page -->
            </div>
        `
        // analyze the exercise's first character
        const firstChar = exercise.title.charAt(0).toUpperCase()
        // if its the first time seeing that character
        if (firstChar != lastLetter) {
            // AND if already passed the first character of the alphabet ("A")
            if (firstChar !== "A") {
                // close the previous div.alpha-grouping
                exercisesHTML += "</div>"
            }

            // add the character to the overall exercisesHTML markup as a header
            exercisesHTML += `
                <div class="alpha-grouping">
                    <h4 class="alpha-header">${firstChar.toUpperCase()}</h4>
            `
            // update the lastLetter in the alphabet seen to be the new one
            lastLetter = firstChar
        }

        // add the current exercise to the total exercisesHTML markup
        exercisesHTML += exerciseHTML
    })

    return exercisesHTML
}

// render the exercises on to the page
function render(exercisesList, isCustom) {
    sortExercisesList(exercisesList)
    document.getElementById("exercises").innerHTML = generateExerciseList(exercisesList, isCustom)
    document.querySelectorAll(".exercise")
        .forEach(exercise => exercise.addEventListener("click", function () { // if the exercise is clicked
            // find the exercise that is meant to be added/swapped with from the list of exercises
            const transfer = exercisesList.find((exercise) => exercise.title === this.textContent.trim())
            // and store it for transfer
            sessionStorage.setItem("exerciseToTransfer", JSON.stringify(transfer))
            // store whether the exercise is a custom exercise
            if (isCustom) {
                sessionStorage.setItem("isCustom", isCustom)
            }
        }))
}

search.addEventListener("input", function (e) {
    // get the typed query
    const value = e.target.value.toLowerCase()

    // if ANY query exists
    value
        // remove the alphabet letter headings from the list of exercise
        ? document.querySelectorAll(".alpha-header")
            .forEach(header => header.classList.add("hide"))
        // else, if no query, put the alphabet letter headings back into the list
        : document.querySelectorAll(".alpha-header")
            .forEach(header => header.classList.remove("hide"))

    document.querySelectorAll(".exercise")
        .forEach(exerciseEl => {
            const isVisible = exerciseEl.textContent.trim().toLowerCase().includes(value)
            exerciseEl.classList.toggle("hide", !isVisible)
        })
})

render(allExercises)