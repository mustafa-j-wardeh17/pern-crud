import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // delete todo function
    const deleteTodo = async (id: any) => {
        try {
            await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter((todo: any) => todo.todo_id !== id));
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="w-full flex justify-center">
            <table className="mt-5 w-[80%] text-center border-collapse">
                <thead>
                    <tr className=" border-b-2  border-t-2 border-gray-300 h-[60px]">
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Edit</th>
                        <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length > 0 && todos.map((todo: any) => (
                        <tr key={todo.todo_id} className="border-b-[1px] border-gray-200 h-[50px]">
                            <td className="px-4 py-2">{todo.description}</td>
                            <td className="px-4 py-2">
                                <EditTodo todo={todo} />
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-all duration-300"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTodos;
