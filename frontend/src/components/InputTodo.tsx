import React, { Fragment, useState } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState("")
    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        try {
            const body = { description };
            if (description === '') {
                throw new Error('Oops: Please fill the input button')
            }
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            window.location.href = "/";
        } catch (err: any) {
            console.error(err.message);
            setError(err.message)
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-center mt-5 text-[40px] font-bold">Pern Todo List</h1>
            <form className="flex md:w-[600px] sm:w-[400px] w-[300px] gap-3" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="border w-full py-2  px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-2 rounded-md shadow-md">Add</button>
            </form>
            <p className="flex md:w-[600px] sm:w-[400px] w-[300px] text-sm text-red-500 font-bold">{error}</p>
        </div>
    );
};

export default InputTodo;