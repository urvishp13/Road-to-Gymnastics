// export const exercises = [
//     {
//         name: "a Exercise",
//         video: "",
//         desc: "1"
//     },
//     {
//         name: "c Exercise",
//         video: "",
//         desc: "2"
//     },
//     {
//         name: "aa Exercise",
//         video: "",
//         desc: "3"
//     },
//     {
//         name: "A Exercise",
//         video: "",
//         desc: "3"
//     },
//     {
//         name: "B Exercise",
//         video: "",
//         desc: "4"
//     },
//     {
//         name: "ab Exercise",
//         video: "",
//         desc: "5"
//     },
//     {
//         name: "AA Exercise",
//         video: "",
//         desc: "6"
//     }
// ]

let exercises

async function getExercises() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    exercises = data
}

getExercises()

export { exercises }
