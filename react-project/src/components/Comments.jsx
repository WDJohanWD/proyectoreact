import { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Añado AiFillLike para el "like" lleno
import "../styles/Edit.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const Comments = () => {
    const userID = localStorage.getItem("userId");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4; // Número de comentarios por página

    useEffect(() => {
        if (userID) {
            getUsers();
        }
        fetchComments();
    }, [userID]);

    const handleCommentChange = (event) => setComment(event.target.value);

    // Fetch user data for the logged-in user
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users");
            const data = await response.json();
            const user = data.find((user) => user.id === userID);
            if (user) {
                setUsername(user.username);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fetch comments from the server
    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/comments");
            if (!response.ok) {
                throw new Error("Error fetching comments");
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Save new comment to the server
    const saveComments = async (event) => {
        event.preventDefault();
        if (!userID) {
            setMsg("To comment, you have to be logged in.");
            return;
        }
        if (!comment) {
            setMsg("You cannot write an empty comment");
            return;
        }

        const newComment = { username, comment, date: new Date().toLocaleString(), like: 0, liked: false };

        try {
            const response = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) {
                throw new Error("Error saving comment");
            }
            setMsg("Comment added successfully!");
            setComment(""); // Clear the textarea
            fetchComments(); // Refresh comments
        } catch (error) {
            console.error("Error saving comment:", error);
            setMsg("There was an error adding your comment.");
        }
        setTimeout(() => setMsg(""), 3000);
    };

    // Increment or decrement likes for a specific comment
    const handleLike = async (commentId) => {
        try {
            const updatedComments = comments.map((com) => {
                if (com.id === commentId) {
                    const newLikeCount = com.liked ? com.like - 1 : com.like + 1; // Si tiene like, resta 1, si no, suma 1
                    return { ...com, like: newLikeCount, liked: !com.liked }; // Cambia el estado de liked y el contador de likes
                }
                return com;
            });
            setComments(updatedComments);

            const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    like: updatedComments.find((com) => com.id === commentId).like,
                    liked: updatedComments.find((com) => com.id === commentId).liked,
                }),
            });

            if (!response.ok) {
                throw new Error("Error updating like count");
            }
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    // Pagination functions
    const totalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

    const getPaginatedComments = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return comments.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-start px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-25">
                {/* Comment form */}
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
                            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-md transition" type="submit">
                                Send Comment
                            </button>
                        </form>
                    </div>
                    {username && (
                        <div className="w-full bg-white shadow-lg m-1 rounded-lg p-6">
                            {comments.length > 0 ? (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 my-1 pb-2">My comments:</h2>
                                    {comments.filter((com) => com.username === username).map((comment, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-teal-700">{comment.username.toUpperCase()}</h3>
                                                <span className="text-sm text-gray-500">{comment.date.substring(0, 8)}</span>
                                            </div>
                                            <div className="text-gray-700 flex">
                                                {comment.comment}
                                                <div className="ml-auto flex items-center gap-2">
                                                    <p>{comment.like}</p>
                                                    <AiOutlineLike className="mt-1 cursor-pointer"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">There are no comments yet.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* All comments */}
                <div className="md:col-span-2">
                    <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-2">
                        <h2 className="text-3xl font-semibold text-gray-800 my-6 border-b-2 border-teal-500 pb-2">Comments</h2>
                        {loading ? (
                            <p className="text-center text-gray-600">Loading comments...</p>
                        ) : comments.length > 0 ? (
                            <div className="space-y-4">
                                {getPaginatedComments().map((comment, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-teal-700">{comment.username.toUpperCase()}</h3>
                                            <span className="text-sm text-gray-500">{comment.date.substring(0, 8)}</span>
                                        </div>
                                        <div className="text-gray-700 flex">
                                            {comment.comment}
                                            <div className="ml-auto flex items-center gap-2">
                                                <p>{comment.like}</p>
                                                {comment.liked ? (
                                                    <AiFillLike className="mt-1 cursor-pointer text-teal-500" onClick={() => handleLike(comment.id)} />
                                                ) : (
                                                    <AiOutlineLike className="mt-1 cursor-pointer" onClick={() => handleLike(comment.id)} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600">No comments available.</p>
                        )}
                        
                        {/* Pagination controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <SlArrowLeft />
                            </button>
                            <span className="text-sm text-gray-700">
                                Showing page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <SlArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
