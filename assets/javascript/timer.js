const timer = document.getElementById("timer")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")

// get the current time from the DOM
let time = Number(timer.textContent)
// start the timer
setInterval(function() {
    // decrease the time by 1 second
    time--

    // once time expires,
    if (time <= 0) {
        // redirect the user back to the workout page
        window.location.replace("workout.html")
    }

    // write the time to the DOM
    timer.textContent = time

}, 1000)

// if the user wants to increase the amount of rest time
increase.addEventListener("click", function() {
    // increase the rest time by 10s
    time += 10
})

// if the user wants to decrease the amount of rest time
decrease.addEventListener("click", function() {
    // decrease the rest time by 10s
    time -= 10
})
