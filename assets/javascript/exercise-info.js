import { exercises as allExercises} from "./sample-data.js"

const exerciseInfo = document.getElementById("exercise-info")
const exerciseWantInfoOn = sessionStorage.getItem("exerciseWantInfoOn")

// grab the exercise of interest from the API
// extract the gif (video), name, and instructions of the exercise 
// inject it into an HTML string
const html = `
    <div class="video"></div>
    <h3 class="exercise-title">${exerciseWantInfoOn}</h3>
    <p class="exercise-desc">
        ${allExercises.filter(function(exercise) {
            return exercise.name === exerciseWantInfoOn
        })[0].desc}
    </p>
`

// write the HTML to the DOM
exerciseInfo.innerHTML = html

sessionStorage.removeItem("exerciseWantInfoOn")