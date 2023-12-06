const buttonDiv = document.getElementById("btn-container")
const exercise = document.getElementById("exercise-info")

// get incoming data: if this is a swap or an add
const add = `
    <a class="btn add" href="random-regiment.html"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-circle-plus"></i> Add to Workout</span>
    </a>
`
const swap = `
    <a class="btn swap" href="#"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-right-left"></i> Swap Exercise</span>
    </a>
`

buttonDiv.innerHTML = `${sessionStorage.getItem("swapORadd") === "swap" ? swap : add}`

sessionStorage.setItem("exercise", JSON.stringify(exercise.outerHTML))