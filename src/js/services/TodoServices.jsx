const API_URL = "https://playground.4geeks.com/todo";

export const getTodos = async () =>{
    try {
       const response = await fetch(`${API_URL}/users/Alec`);
       if(!response.ok) throw new Error("La lista esta vacía")
        const data = await response.json();
    return data.todos;
    } catch (error) {
        console.error(error);
    }
}

export const createTodoList = async () => {
    try {
       const response = await fetch(`${API_URL}/users/Alec`,{
            method:'POST',
            body: JSON.stringify([]),
            headers:{
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            throw new Error("Algo salió mal al intentar crear la lista de tareas.")
        } 

        return response.json();

    } catch (error) {
        console.error('Error al crear la lista de tareas', error)
        throw error;
    }
}

export const addTodo = async (todo) => {
    try {
        const response = await fetch(`${API_URL}/todos/Alec`, {
            method:'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('respuesta: ', response)
        if(!response.ok){
            throw new Error("Error al agregar tarea a la lista.")
        }

        return response.json();

    } catch (error) {
        console.error("Error al agregar tarea: ", error)
        throw error
    }
}

export const deleteTodo = async (todoId) =>{
    
    try {
        const response = await fetch(`${API_URL}/todos/${todoId}`, {
            method: 'DELETE',
            body: JSON.stringify(todoId),
            headers: {
                "Content-Type": "application"
            }
            });
            console
        if(!response.ok) throw new Error('Error al intentar eliminar la tarea.')

    } catch (error) {
        console.error("Error al intentar elimanar la tarear.")
        throw error
    }
}

export const deleteAllTodos = async (todos) => {
    if(!todos || todos.length === 0){
        alert("No hay tareas para eliminar.");
        return
    }

    const deletePromises = todos.map(async (todo) => {
        try {
            const response = await fetch(`${API_URL}/todos/${todo.id}`, {method: 'DELETE'});
            if(!response.ok) throw new Error('Error al intentar eliminar todas las tareas.')
        } catch (error) {
            console.error('Error al intentar eliminar todas las tareas.')
        }
    });

    try {
        await Promise.all(deletePromises);
    } catch (error) {
        console.error('Error al eliminar todas las tareas', error);
    }
}