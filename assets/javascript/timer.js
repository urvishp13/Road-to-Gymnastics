const timer = document.getElementById("timer")

// get the current time from the DOM
let time = timer.textContent
// start the timer
setInterval(function() {
    // decrease the time by 1 second
    time--

    // once time expires,
    if (time === 0) {
        // redirect the user back to the workout page
        console.log(time)
        window.location.replace("workout.html")
    }

    // write the time to the DOM
    timer.textContent = time

}, 1000)
