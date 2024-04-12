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
}

// on page load
// window.addEventListener("load", () => {
//     if (exercise.)
// })