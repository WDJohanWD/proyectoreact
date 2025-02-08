import { useEffect, useState } from "react"

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
    function saveComments(){
        const username = localStorage.getItem("username")
        const registrationDate = new Date().toLocaleString();
        const newComment ={username, comment, date: registrationDate}
        const response =  fetch("http://localhost:5000/comments",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newComment)
        });

        if(!response.ok){
            console.log("Error saving comment.")
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <>  
            <h2>Leave your opinion here</h2>
            <div className="formComments">
                <form action="" onSubmit={saveComments}>
                    <textarea value={comment} onChange={handleCommentChange} placeholder="Write here..."></textarea>

                    <button type="submit">Send Comment</button>
                </form>
            </div>

            <h2>Comments:</h2>
            <div className="comments">
                {comments.length > 0 ? (
                    <table>
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
                                    <td>{comment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </>
    )
}

export default Comments
