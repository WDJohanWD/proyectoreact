import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

const Profile = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userId");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState([]);
    const [pass, setPass] = useState("")

    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function getUsers() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        data.forEach(user => {
            if (user.username === username) {
                setEmail(user.email);
                setDate(user.date);
                setPass(user.password);
            }
        });
    }

    async function getComments() {
        const response = await fetch("http://localhost:5000/comments");
        const data = await response.json();
        const filteredComments = data.filter(comment => comment.username === username);
        setComments(filteredComments);
    }

    useEffect(() => {
        getUsers();
    });

    useEffect(() => {
        getComments();
    });

    async function updateEmail(e) {
        e.preventDefault();
        if (!newEmail) return setMsg("Please enter a new email.");

        const response = await fetch(`http://localhost:5000/users/${userID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newEmail }),
        });

        if (response.ok) {
            setEmail(newEmail);
            setNewEmail("");
            setMsg("Email updated successfully.");
        } else {
            setMsg("Error updating email.");
        }
    }

    async function updatePassword(e) {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            return setMsg("Please fill in all password fields.");
        }

        if (newPassword !== confirmPassword) {
            return setMsg("New passwords do not match.");
        }

        if (currentPassword !== pass) {
            return setMsg("The current password is not okey")
        }

        const response = await fetch(`http://localhost:5000/users/${userID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: newPassword }),
        });

        if (response.ok) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setMsg("Password changed successfully.");
        } else {
            setMsg("Error changing password.");
        }
    }

    if (!username) {
        return <p className="text-center text-gray-600">No user data available.</p>;
    }

    return (
        <div className="container mx-auto flex justify-center items-center mt-8">
            <div className="w-full md:w-2/3 lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">User Profile</h2>

                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold">
                        {username}
                    </div>
                    <h3 className="text-xl font-semibold mt-4">{username}</h3>
                    <p className="text-gray-500">{email}</p>
                    <p className="text-gray-400">{date.substring(0, 9)}</p>
                </div>

                <div className="mt-6">
                    <form onSubmit={updateEmail}>
                        <h2 className="text-lg text-xl mb-1 font-semibold text-teal-600">Change Email</h2>
                        <label className="block text-gray-700 font-semibold mb-1">New Email</label>
                        <div className="grid grid-cols-6">
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-5"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder={email}
                            />
                            <button
                                className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold ms-1 py-1 px-2 rounded-md transition shadow-md"
                                type="submit"
                            >
                                Change
                            </button>
                        </div>
                    </form>

                    <form onSubmit={updatePassword} className="mt-6">
                        <h2 className="text-lg  text-xl mb-1 font-semibold text-teal-600">Change Password</h2>
                        <label className="block text-gray-700 font-semibold mb-1">Current Password</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current password"
                        />

                        <label className="block text-gray-700 font-semibold mb-1 mt-2">New Password</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                        />

                        <label className="block text-gray-700 font-semibold mb-1 mt-2">Confirm Password</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />

                        {msg && (
                            <div className="mt-1 p-3 text-center rounded-lg font-medium bg-red-100 text-red-700 border-l-4 border-red-700">
                                ⚠️ {msg}
                            </div>
                        )}
                        <div className="mt-2">
                            <button
                                className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                                type="submit"
                            >
                                Change
                            </button>
                        </div>
                    </form>



                    <h2 className="text-lg font-semibold text-teal-600 mt-6">Activity</h2>
                    {comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-teal-700">{comment.username}</h3>
                                        <span className="text-sm text-gray-500">{comment.date.substring(0, 8)}</span>
                                    </div>
                                    <div className="text-gray-700 flex">
                                        {comment.comment}
                                        <p className="ml-auto">{comment.like}</p>
                                        <AiOutlineLike className="mt-1" />
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
    );
};

export default Profile;
