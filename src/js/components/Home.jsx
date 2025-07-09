import React from "react";

import { useState, useEffect } from "react";



const Home = () => {
  
  const apiUrl = "https://playground.4geeks.com/todo/users/alda"

	const [tasks, setTasks] = useState([])

	const [createTask, setCreateTask] = useState("");

  const onload = () => {
    fetch(apiUrl).then(Response =>{
      return Response.json()
    }).then(datos => {
      setTasks(datos.todos)
    })
  }

  useEffect(onload, []) 

	let addTask = (tecla) => {
		if (tecla === "Enter") {
				if (createTask ===""){
					return;
				}
			setTasks([...tasks, createTask.trim()])
			setCreateTask("")
		}
	}
	const deleteTask = (index) => {
		setTasks(tasks.filter((item, i) => index != i))
	}
	const Tarea = ({ descripcion, onDelete }) => {
		const [isHover, setIsHover] = useState(false)
		return (
			<p className="border-bottom mt-2" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >{descripcion}
				{isHover && <button className="btn btn-secondary text-white ms-2" onClick={onDelete}  > x </button>}
			</p>
		)
	}

	return (
		<div className="card text-center mt-5 container d-flex justify-content-center align-items-center" >
			<div className="card-body ">
				<div>
					<h1 className="card-title">Todoo List</h1>
					<input onChange={event => setCreateTask(event.target.value)} type="text" placeholder="agrga alguna tarea" value={createTask}
						onKeyUp={event => addTask(event.key)}

					/>
				</div>

				{tasks.map((tarea, index) => {
					return (<Tarea key={index} descripcion={tarea.label} onDelete={() => deleteTask(index)} />)
				})
				}
			</div>

			<div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
				<small className="text-muted">
					{tasks.length === 0
						? "No hay tareas, añadir tareas"
						: tasks.length === 1
							? "1 tarea"
							: `${tasks.length} tareas`
					}
				</small>
			</div>

		</div>
	)
}

export default Home;