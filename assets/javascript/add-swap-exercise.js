import { exercises as allExercises} from "./sample-data.js"

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

document.querySelector(".btn").addEventListener("click", function() {
    sessionStorage.setItem("exerciseToTransfer", JSON.stringify(allExercises.filter((exercise) => exercise.title === exerciseAddOrSwap)[0]))
})

sessionStorage.removeItem("exerciseAddOrSwap")