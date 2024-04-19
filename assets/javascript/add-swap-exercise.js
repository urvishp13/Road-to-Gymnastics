import { allExercises } from "./sample-data.js"
import db from "./firestore.js"
import { doc, deleteDoc } from "firebase/firestore"

const add = `
    <a class="btn add" href="random-regiment.html"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-circle-plus"></i> Add to Workout</span>
    </a>
`
const swap = `
    <a class="btn swap" href="random-regiment.html"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-right-left"></i> Swap Exercise</span>
    </a>
`

const exerciseInfo = document.getElementById("exercise-info")
const buttonDiv = document.getElementById("btn-container")
const exerciseAddOrSwap = sessionStorage.getItem("exerciseAddOrSwap")
const backArrow = document.getElementById("back-arrow")

// grab the exercise of interest from the API
// extract the gif (video), name, and instructions of the exercise 
// inject it into an HTML string
const html = `
    <div class="video"></div>
    <h3 class="exercise-title">${exerciseAddOrSwap}</h3>
    <p class="exercise-desc">
        ${allExercises.filter((exercise) => {
            return exercise.title === exerciseAddOrSwap
        })[0].body}
    </p>
`

// write the HTML to the DOM
exerciseInfo.innerHTML = html

// get incoming data: if this is a swap or an add
buttonDiv.innerHTML = `${sessionStorage.getItem("swapORadd") === "swap" ? swap : add}`

// if this exercise is a CUSTOM exercise,
if (sessionStorage.getItem("isCustom")) {
    // allow the option to delete it
    const deleteBtn = `
        <a id="delete-btn" class="btn delete">
            <span><i class="fa-solid fa-trash-can"></i> Delete</span>
        </a>
    `
    buttonDiv.insertAdjacentHTML("beforeend", deleteBtn)
}

document.querySelector(".btn").addEventListener("click", function() {
    sessionStorage.setItem("exerciseToTransfer", JSON.stringify(allExercises.filter((exercise) => exercise.title === exerciseAddOrSwap)[0]))
    // removed the saved isCustom-exercise variable after a button is clicked as it won't be relevant for the next click
    sessionStorage.removeItem("isCustom")
})

backArrow.addEventListener("click", function() {
    // removed the saved isCustom-exercise variable after a button is clicked as it won't be relevant for the next click
    sessionStorage.removeItem("isCustom")
})

// allow the DELETE button to delete the button once clicked 
buttonDiv.children[1].addEventListener("click", async function() {
    await deleteDoc(doc(db, "customExercises", `${exerciseAddOrSwap}`))
    console.log("exercise deleted")
    // redirect to the all-exercises page
    window.location.href = "all-exercises.html"
})

