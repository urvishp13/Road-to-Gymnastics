// grab the filter buttons from the DOM
const all = document.querySelector(".btn.all")
const custom = document.querySelector(".btn.custom")
const random = document.querySelector(".btn.random")

// add a click event to each of them
// if make one selectable at a time between the 'all' and 'custom' buttons
all.addEventListener("click", function() {
    switchSelection(custom, all)
})

custom.addEventListener("click", function() {
    switchSelection(all, custom)
})

// the random button can be selected regardless of if the 'all' and 'custom' buttons are selected
random.addEventListener("click", function() {
    this.classList.toggle("selected")
})

function switchSelection(selectedSoFar, wantSelected) {
    if (selectedSoFar.classList.contains("selected")) {
        selectedSoFar.classList.remove("selected")
        wantSelected.classList.add("selected")
    }
}