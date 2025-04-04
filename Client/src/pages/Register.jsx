import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            alert('Registration successful');
            Navigate("/login")
        } catch (error) {
            alert('Error registering user');
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-teal-600 mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
