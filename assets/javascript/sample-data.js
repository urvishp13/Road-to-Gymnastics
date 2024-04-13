// export const exercises = [
//     {
//         title: "a Exercise",
//         video: "",
//         desc: "1"
//     },
//     {
//         title: "c Exercise",
//         video: "",
//         desc: "2"
//     },
//     {
//         title: "aa Exercise",
//         video: "",
//         desc: "3"
//     },
//     {
//         title: "A Exercise",
//         video: "",
//         desc: "3"
//     },
//     {
//         title: "B Exercise",
//         video: "",
//         desc: "4"
//     },
//     {
//         title: "ab Exercise",
//         video: "",
//         desc: "5"
//     },
//     {
//         title: "AA Exercise",
//         video: "",
//         desc: "6"
//     }
// ]

async function getDataFromAPI() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    return response.json()
}

const exercises = await getDataFromAPI()

export { exercises }
