import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"
let checked = false

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [doneWorkouts, setDoneWorkouts]= useState([])

  const addNewWorkout = (event) => {
    const newWorkout = generateWorkout()
    event.preventDefault()
    const newWorkouts = [...workouts,newWorkout]
    console.log(newWorkout.id)
    setWorkouts(newWorkouts)
  }

  const deleteWorkout = (workout) => {
    const filteredWorkouts = workouts.filter(item => item.id!==workout.id)
    setWorkouts(filteredWorkouts)
    
  }

  const completeWorkout = (workout) => {
    const filteredWorkouts = workouts.map (item => {
      if (item.id === workout.id){
        item.done = true
      }
      return item
    })
    setWorkouts(filteredWorkouts) 
  }

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const updateWorkouts = workouts.map (item => {
      if (item.id === workout.id){
        item = newWorkout
      }
      return item
    })
    setWorkouts(updateWorkouts)
  }

  
  const showCompleted = (event) => {
    if (event.target.checked){
      console.log("ok")
      const filteredWorkouts = workouts.filter(item => item.done !== false)
      console.log(filteredWorkouts)
      setDoneWorkouts(filteredWorkouts) 
    }
    checked = event.target.checked
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <p className="this">Show only completed!
      <input 
        type="checkbox"
        label = "Show only completed"
        onChange = {showCompleted}
      />
      </p>
      <ul>
        {checked===false && workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <p>
            <button onClick={e=>replaceWorkout(workout)}>Replace</button>
            </p>
          </li>
        ))}
        {checked===true && doneWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <p>
            <button onClick={e=>replaceWorkout(workout)}>Replace</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
