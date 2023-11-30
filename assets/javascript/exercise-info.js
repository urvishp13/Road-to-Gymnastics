const exerciseInfo = document.getElementById("exercise-info")

// grab the exercise of interest from the API
// extract the gif (video), name, and instructions of the exercise 
// inject it into an HTML string
const html = `
    <div class="video"></div>
    <h3 class="exercise-title">Exercise Name</h3>
    <p class="exercise-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eum soluta exercitationem amet ex velit a veniam quae 
        voluptates officia at fugit possimus, libero temporibus obcaecati sit. Ullam, eum.
    </p>
`

// write the HTML to the DOM
exerciseInfo.innerHTML = html