import React, { useState, useEffect } from "react";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const urlApi = "https://playground.4geeks.com/todo/";

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        fetch(urlApi + "users/Alec")
            .then(response => {
                if (!response.ok) {
                    createTodoList();
                    throw new Error("La lista no existe");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos recibidos:", data);
                setTodos(data.todos);
            })
            .catch(error => {
                console.error("Error al obtener tareas:", error);
            });
    };

    const createTodoList = () => {
        fetch(urlApi + "users/Alec", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
                getTodos();
            })
            .catch(error => {
                console.error("Error al crear lista de tareas:", error);
            });
    };


    const addTodo = () => {
        const newTodo = {
            label: inputValue,
            is_done: false
        };

        fetch(urlApi + "todos/Alec", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
                getTodos();
                setInputValue("");
            })
            .catch(error => {
                console.error("Error al agregar tarea:", error);
            });
    };

    const deleteTodo = (todoId) => {
        fetch(urlApi + `todos/${todoId}`, {
            method: "DELETE",
            body: JSON.stringify(todoId),
            headers:{
                "Content-Type" : "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar tarea");
                }
                getTodos();
            })
            .catch(error => {
                console.error("Error al eliminar tarea:", error);
            });
    };

    const deleteAllTodos = () => {
        const deletePromises = todos.map(todo =>
            fetch(urlApi + `todos/${todo.id}`, {
                method: "DELETE"
            })
        );

        Promise.all(deletePromises)
            .then(() => {
                getTodos();
            })
            .catch(error => {
                console.error("Error al eliminar todas las tareas:", error);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            addTodo();
        }
    };

    return (
        <div className="container container-body border justify-content-center mt-5">
            <div className="row justify-content-center my-3">
                <div className="col-12 col-md-8">
                    <h1 className="text-center">My To-do's</h1>
                </div>
            </div>
            <div className="row justify-content-center mb-2">
                <div className="col-12 col-md-8 mt-3">
                    <input
                        className="form-control"
                        type="text"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Next Task"
                        aria-label="Next Task"
                    />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                        <ul className="list-group">
                            {todos.length === 0 ? (
                                <li className="list-group-item text-center">No hay tareas pendientes</li>
                            ) : (
                                todos.map((task) => (
                                    <li key={task.id} className="task-list list-group-item d-flex justify-content-between align-items-center">
                                        {task.label}
                                        <i
                                            className="fas fa-trash-alt icon"
                                            onClick={() => deleteTodo(task.id)}
                                            role="button"
                                            aria-label="Delete task"
                                        ></i>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="list-counter mt-3 text-center fs-5">
                        {`${todos.length} Tasks on your list.`}
                    </div>
                    <div className=" d-flex justify-content-center mt-5">
                        <button className="btn btn-primary" onClick={deleteAllTodos}>Delete all</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;




