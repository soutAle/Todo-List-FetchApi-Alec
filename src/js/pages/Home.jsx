import React, { useState, useEffect } from "react";
import { TodoInput } from "../component/TodoInput.jsx";
import { TodoList } from "../component/TodoList.jsx";
import { TodoCounter } from "../component/TodoCounter.jsx";
import {
    getTodos,
    addTodo,
    deleteTodo,
    deleteAllTodos,
    createTodoList
} from "../services/TodoServices.jsx"

export const Home = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {
        try {
            const todosData = await getTodos();
            setTodos(todosData)
        } catch {
            await createTodoList();
            fetchTodos();
        }
    }

    const handleAddTodo = async () => {
        if (inputValue.trim() === "") return;
        const newTodo = { label: inputValue, is_done: false };
        await addTodo(newTodo);
        setInputValue('');
        fetchTodos();
    }

    const handleDeleteTodo = async (todos) => {
        await deleteTodo(todos);
        fetchTodos();
    }

    const handleDeleteAll = async () => {
        await deleteAllTodos(todos);
        fetchTodos();
    }

    return (
        <div className="container container-body border mt-5">
                <h1 className="text-center text-white my-3">My To-do's</h1>
                <TodoInput
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    onAdd={handleAddTodo}
                />
                <div className="">
                    <TodoList todos={todos} onDelete={handleDeleteTodo} />
                </div>
                <TodoCounter count={todos.length} />
                <div className="d-flex justify-content-center my-5">
                    <button className="btn btn-primary" onClick={handleDeleteAll}>
                        Delete all
                    </button>
                </div>
        </div>
    )
}
