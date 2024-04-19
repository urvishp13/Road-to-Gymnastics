import db from "./firestore.js"
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

const form = document.getElementById("exercise-form")

const exerciseTitleInput = document.getElementById("new-exercise-title")
const exerciseDescInput = document.getElementById("new-exercise-desc")

const exerciseTitlePlaceholder = document.getElementById("new-exercise-title-placeholder")
const exerciseDescPlaceholder = document.getElementById("new-exercise-desc-placeholder")

const saveBtn = document.getElementById("save-btn")
const editBtn = document.getElementById("edit-btn")
const addBtn = document.getElementById("add-btn")

const customExercisesRef = collection(db, "customExercises")

let prevExerciseTitle
// when saving the new exercise's details
form.addEventListener("submit", async function (e) {
    e.preventDefault()

    const exerciseTitle = exerciseTitleInput.value
    const exerciseDesc = exerciseDescInput.value
    const exerciseRef = doc(db, "customExercises", `${exerciseTitle}`)
    const exerciseSnapshot = await getDoc(exerciseRef)

    const prevExerciseRef = doc(db, "customExercises", `${prevExerciseTitle}`)
    const prevExerciseSnapshot = await getDoc(prevExerciseRef)

    // if the exercise is new
    if (!exerciseSnapshot.exists()) {
        console.log("exercise is new")
        // add the exercise to the database
        try {
            await setDoc(doc(customExercisesRef, `${exerciseTitle}`), {
                title: exerciseTitle,
                body: exerciseDesc,
            })
            console.log("Document written with ID: ", exerciseRef.id)
        }
        catch (e) {
            console.error("Error adding document: ", e)
        }

        // during this pass in the code, a new entry will be made in the database under a new exercise title
        // delete the entry with the old exercise title
        prevExerciseSnapshot.exists() ? await deleteDoc(doc(db, "customExercises", prevExerciseTitle)) : null
    }
    // else, if the exercise was already made
    else {
        console.log("exercise exists")
        // update the database to reflect the changes in the UI
        await updateDoc(exerciseRef, {
            title: exerciseTitleInput.value,
            body: exerciseDescInput.value,
        })
    }

    // write the data to the page
    exerciseTitlePlaceholder.innerHTML = `<h3 class="exercise-title">${exerciseTitle}</h3>`
    exerciseDescPlaceholder.innerHTML = `<p class="exercise-desc">${exerciseDesc}</p>`

    // replace the SAVE button with the EDIT and ADD button
    saveBtn.style.display = "none"
    editBtn.style.display = "block"
    addBtn.style.display = "block"

    // keep track of this exercise title in case if changes in it are made
    prevExerciseTitle = exerciseTitle
})

// when editing the custom exercise's details
editBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    // re-display the SAVE button by replacing the EDIT and ADD button with it
    editBtn.style.display = "none"
    addBtn.style.display = "none"
    saveBtn.style.display = "block"

    const exerciseTitle = exerciseTitlePlaceholder.textContent

    // get the exercise document from the database
    const exerciseRef = doc(db, "customExercises", `${exerciseTitle}`)
    const exerciseSnapshot = await getDoc(exerciseRef)

    // get the exercise data from the database and populate the form fields with it
    exerciseTitlePlaceholder.textContent = '' // erase the displayed title
    exerciseDescPlaceholder.textContent = '' // erase the displayed desc
    exerciseTitlePlaceholder.insertAdjacentElement("afterbegin", exerciseTitleInput) // insert the input field to write the new title
    exerciseDescPlaceholder.insertAdjacentElement("afterbegin", exerciseDescInput) // insert the textarea to write the new desc
    exerciseTitleInput.value = exerciseSnapshot.data().title // populate the title input with the previous written title
    exerciseDescInput.value = exerciseSnapshot.data().body // populate the desc textarea with the previous written desc
})

