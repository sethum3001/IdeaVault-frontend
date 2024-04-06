import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate  } from 'react-router-dom';
import { BASE_URL } from '../const';

function SignUp() {
    const navigate  = useNavigate ();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send sign-up request to the server and handle the JWT token response
            const response = await axios.post(
                `${BASE_URL}/user/register`,
                { name, email, password }
            );
            const token = response.data.accessToken;
            // Handle the token, for example, store it in localStorage or session storage
            console.log('JWT token:', token);
            // Redirect the user to the main app page or perform any necessary actions
            navigate('/');
        } catch (error) {
            console.error('Sign-up error:', error);
            // Handle sign-up errors, show error messages, etc.
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center font-semibold">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="Your Name" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="Your Email Address" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="Your Password" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
                </form>
                <p className="text-center text-gray-600 text-sm">Already have an account? <a href="/" className="text-blue-500 hover:underline">Sign In</a></p>
            </div>
        </div>
    );
}

export default SignUp;
