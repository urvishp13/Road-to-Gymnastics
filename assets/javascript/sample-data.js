import db from "./firestore.js"
import { collection, doc, getDocs } from "firebase/firestore"
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

async function getSampleDataFromAPI() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    return response.json()
}

const factoryExercises = await getSampleDataFromAPI()


async function getCustomExercisesFromDatabase() {
    // add all the custom exercises documents from the database into the conglomerate list of exercises
    // create an array for all the custom exercises
    const customExercisesDoc = []
    // grab all the custom exercises from the database and write them into the container
    const allCustomExercisesQuerySnapshot = await getDocs(collection(db, "customExercises"))
    allCustomExercisesQuerySnapshot.forEach(doc => {
        // add each custom exercise data to the custom exercises array
        customExercisesDoc.push(doc)
    })
    // the exercises in 'customExercisesDoc' array are Firestore documents at this point
    // extract the data from them and convert them to regular objects for congruency with the data in the 'exercises' array
    const customExercises = []
    customExercisesDoc.forEach(customExercise => {
        customExercises.push(customExercise.data())
    })

    return customExercises
}

const customExercises = await getCustomExercisesFromDatabase()
const allExercises = [...factoryExercises, ...customExercises]

export { allExercises, customExercises }
