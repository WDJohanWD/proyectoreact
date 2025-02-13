import { useEffect, useState } from "react"
import { AiOutlineLike } from "react-icons/ai";

import "../styles/Edit.css"

const Comments = () => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [msg, setMsg] = useState("");

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    async function fetchComments() {
        try {
            const response = await fetch("http://localhost:5000/comments")
            if (!response.ok) {
                throw new Error("Error fetching comments")
            }
            const data = await response.json()
            setComments(data)
        } catch (error) {
            console.error(error)
        }
    }

    function saveComments(event) {
        event.preventDefault(); // Evita la recarga de la página

        const username = localStorage.getItem("username");
        const registrationDate = new Date().toLocaleString();

        if (!username) {
            setMsg("To comment, you have to be logged in.");
            return;
        }
        if (!comment) {
            setMsg("Yo can not write a empty comment")
            return;
        }

        const newComment = { username, comment, date: registrationDate, like: 0 };

        fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error saving comment.");
                }
                return response.json();
            })
            .then(() => {
                setMsg("Comment added successfully!");
                setComment(""); // Limpiar el textarea después de enviar el comentario
                fetchComments(); // Actualiza los comentarios sin recargar la página
            })
            .catch(() => {
                setMsg("There was an error adding your comment.");
            });

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMsg(""), 3000);
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <>
            <div className="container mx-auto flex justify-center items-start mt-8 px-4">
                {/* Contenedor dividido en dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {/* Columna del formulario */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        <div className="w-full bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-center mb-4">Leave your opinion here</h2>
                            <form onSubmit={saveComments} className="w-full">
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Write here..."
                                ></textarea>
                                {msg && (
                                    <div className={`p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm ${msg.includes("successfully") ? "bg-green-100 text-green-700 border-l-4 border-green-700" : "bg-red-100 text-red-700 border-l-4 border-red-700"}`}>
                                        <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                                    </div>
                                )}
                                <br />
                                <button
                                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-md transition"
                                    type="submit"
                                >
                                    Send Comment
                                </button>
                            </form>
                        </div>
                        <div className="w-full bg-white shadow-lg m-1 rounded-lg p-6">
                                Your comments:
                                {comments.length > 0 ? (
                                <div className="space-y-4">
                                    {comments.filter(comment => comment.username === localStorage.getItem("username")).map((comment, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-teal-700">{comment.username}</h3>
                                                <span className="text-sm text-gray-500">{comment.date.substring(0, 8)}</span>
                                            </div>
                                            <div className="text-gray-700 flex">
                                                {comment.comment}
                                                <p className="ml-auto">
                                                    {comment.like}</p><AiOutlineLike className="mt-1" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">No comments available.</p>
                            )}
                        </div>
                    </div>

                    {/* Columna de los comentarios */}
                    <div className="md:col-span-2">
                        <div className="w-full bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-3xl font-semibold text-gray-800 my-6 border-b-2 border-teal-500 pb-2">
                            Comments
                        </h2>
                            {comments.length > 0 ? (
                                <div className="space-y-4">
                                    {comments.map((comment, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-teal-700">{comment.username}</h3>
                                                <span className="text-sm text-gray-500">{comment.date.substring(0, 8)}</span>
                                            </div>
                                            <div className="text-gray-700 flex">
                                                {comment.comment}
                                                <p className="ml-auto">
                                                    {comment.like}</p><AiOutlineLike className="mt-1" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">No comments available.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>



    )
}

export default Comments
