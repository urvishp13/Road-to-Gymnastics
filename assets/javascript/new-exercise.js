import { exercises } from './sample-data.js'
import { customExercises } from './custom-exercises.js'

const form = document.getElementById("exercise-form")

const exerciseTitleInput = document.getElementById("new-exercise-title")
const exerciseDescInput = document.getElementById("new-exercise-desc")

form.addEventListener("submit", writeExerciseToPage)

const exercise = document.getElementById("exercise")

function writeExerciseToPage(e) {
  e.preventDefault()
  form.innerHTML = `
    <div class="video"></div>
    <h3 class="exercise-title">${exerciseTitleInput.value}</h3>
    <p class="exercise-desc">${exerciseDescInput.value}</p>
  `
  addExerciseToData()
}

function addExerciseToData() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify({
            title: exerciseTitleInput.value,
            body: exerciseDescInput.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(newExercise => {
            customExercises.push(newExercise)
        })
}