import { useEffect, useState } from "react"
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

        const newComment = { username, comment, date: registrationDate };

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
            <div className="container mx-auto flex justify-center items-start mt-8">
                {/* Contenedor dividido en dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {/* Columna del formulario */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        <div className="w-full bg-white shadow-md rounded-lg p-6">
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
                                <button
                                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-md transition"
                                    type="submit"
                                >
                                    Send Comment
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Columna de los comentarios */}
                    <div className="md:col-span-2">
                        <div className="w-full bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
                            {comments.length > 0 ? (
                                <div className="overflow-x-auto">

                                    {comments.map((comment, index) => (
                                        <div key={index} className="border border-gray-200">
                                            <h2 className="px-4 py-2">{comment.username}</h2>
                                            <p className="px-4 py-2">{comment.date.substring(0, 8)}</p>

                                            <td className=" px-4 py-2">{comment.comment}</td>
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
