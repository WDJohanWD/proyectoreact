import { useEffect, useState } from "react"
import "../styles/Edit.css"

const Comments = () => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

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
    function saveComments() {
        const username = localStorage.getItem("username")
        const registrationDate = new Date().toLocaleString();
        const newComment = { username, comment, date: registrationDate }
        const response = fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment)
        });

        if (!response.ok) {
            console.log("Error saving comment.")
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <>
            <div className="container comments-container d-flex justify-content-center align-items-start mt-4">
                {/* Contenedor dividido en dos columnas */}
                <div className="row w-100">
                    {/* Columna del formulario */}
                    <div className="col-lg-4 col-md-12 d-flex flex-column align-items-center">
                        <div className="edit-container edit-comments w-100">
                            <h2 className="edit-title text-center mb-3">Leave your opinion here</h2>
                            <form action="" onSubmit={saveComments} className="edit-form w-100">
                                <textarea
                                    className="edit-input form-control mb-3"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Write here..."
                                ></textarea>
                                <button
                                    className="dashboard-btn dashboard-btn-primary btn btn-primary w-100"
                                    type="submit"
                                >
                                    Send Comment
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Columna de los comentarios */}
                    <div className="col-lg-8 col-md-12">
                        <div className="dashboard-table-container comments w-100">
                            <h2 className="dashboard-title mb-3">Comments:</h2>
                            {comments.length > 0 ? (
                                <table className="dashboard-table table table-striped w-100">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Comment</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comments.map((comment, index) => (
                                            <tr key={index}>
                                                <td>{comment.username}</td>
                                                <td>{comment.comment}</td>
                                                <td>{comment.date.substring(0, 8)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">No comments available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Comments
