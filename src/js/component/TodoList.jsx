import React from "react";

export const TodoList = ({todos, onDelete}) => (
    <ul className="list-group tasks-container my-3">
        {todos.length === 0 ? (
            <li className="No-list text-center text-secondary">No hay tareas pendientes</li>
        ):(
            todos.map((task) =>(
                <li 
                    key={task.id}
                    className="task-list mt-1 d-flex justify-content-between align-items-center me-2"
                >
                    <p className="task-item text-white m-2">{task.label}</p>
                    <i 
                        className="fas fa-trash-alt icon me-2"
                        onClick={()=> onDelete(task.id)}
                        role="button"
                        aria-label="Delete task"
                    ></i>
                </li>
            ))
        )}
    </ul>
)

    
