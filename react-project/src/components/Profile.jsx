import { useEffect, useState } from "react";

const Profile = () => {
    const username = localStorage.getItem("username");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    
    async function getUsers() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        data.forEach(user => {
            if(user.username == username)
                setEmail(user.email)
                setDate(user.date)
        });
    }

    useEffect(() => {
        getUsers()
        
    }, []);

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
                </div>
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-teal-600">Activity</h4>
                </div>
            </div>
        </div>
    );
};

export default Profile;
