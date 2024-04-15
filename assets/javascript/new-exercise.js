import db from "./firestore.js"
import { collection, doc, setDoc } from "firebase/firestore"

const form = document.getElementById("exercise-form")

const newExerciseTitleInput = document.getElementById("new-exercise-title")

const saveBtn = document.getElementById("save-btn")
const editBtn = document.getElementById("edit-btn")

const formData = new FormData(form)

const customExercisesRef = collection(db, "customExercises")
  
// when saving the new exercise's details
form.addEventListener("submit", async function(e) {
  e.preventDefault()
  // add the exercise to the database
  try {
    await setDoc(doc(customExercisesRef, `${formData.get("new-exercise-title")}`), {
      title: formData.get("new-exercise-title"),
      body: formData.get("new-exercise-desc"),
    })
    const docRef = doc(db, "customExercises", `${formData.get("new-exercise-title")}`)
    console.log("Document written with ID: ", docRef.id)
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }
  
})

