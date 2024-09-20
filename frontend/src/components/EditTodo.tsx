import React, { useState } from "react";

const EditTodo = ({ todo }: { todo: any }) => {
    const [description, setDescription] = useState(todo.description);
    const [isOpen, setIsOpen] = useState(false); // State to handle modal visibility

    // Edit description function
    const updateDescription = async (e: any) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(`http://localhost:3000/todos/${todo.todo_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location.href = "/";
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <div>
            {/* Button to open modal */}
            <button
                type="button"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                Edit
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-96"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-semibold">Edit Todo</h4>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="mt-4">
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-all duration-300"
                                onClick={(e) => {
                                    updateDescription(e);
                                    setIsOpen(false);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all duration-300"
                                onClick={() => {
                                    setDescription(todo.description);
                                    setIsOpen(false);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTodo;
