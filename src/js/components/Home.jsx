import React from "react";

import { useState, useEffect } from "react";



const Home = () => {
  
  const apiUrl = "https://playground.4geeks.com/todo/users/alda"

  const crearusuario = () => {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        
      }),
      headers: {
        "Content-Type": "application/json"
    }})
    .then(resp => {
        console.log(resp.ok);
        if (resp.ok){
          onload()
          
        } // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 201, 300, 400, etc.
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    
  }  

	const [tasks, setTasks] = useState([])

	const [createTask, setCreateTask] = useState("");

  const onload = () => { 
    fetch(apiUrl).then(Response =>{
      if (!Response.ok ){
        crearusuario()
      }
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
			// setTasks([...tasks, createTask.trim()])
			// setCreateTask("")
      fetch('https://playground.4geeks.com/todo/todos/alda', {
      method: "POST",
      body: JSON.stringify({
        label: createTask,
        is_done: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok);
        if (resp.ok){
          //onload()
          setCreateTask("")
        } // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 201, 300, 400, etc.
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      	setTasks([...tasks, data])
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
		}
	}
	const deleteTask = (id) => {
		// setTasks(tasks.filter((item, i) => index != i))

    fetch('https://playground.4geeks.com/todo/todos/'+ id, {
      method: "DELETE",
    })
    .then(resp => {
        console.log(resp.ok);
        if (resp.ok){
          onload()
        } // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 201, 300, 400, etc.
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
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
					return (<Tarea key={index} descripcion={tarea.label} onDelete={() => deleteTask(tarea.id)} />)
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