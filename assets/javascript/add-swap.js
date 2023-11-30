const buttonDiv = document.getElementById("add-swap")

// get incoming data: if this is a swap or an add
const add = `
    <a class="add" href="#"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-circle-plus"></i> Add to Workout</span>
    </a>
`
const swap = `
    <a class="swap" href="#"> <!-- link to regiment page -->
        <span><i class="fa-solid fa-right-left"></i> Swap Exercise</span>
    </a>
`

buttonDiv.innerHTML = add