import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import getBaseUrl from '../utils/baseURL'; // Import getBaseUrl

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired, please login again');
                    navigate("/");
                }, 3600 * 1000);
            }
            alert("Admin login successful");
            navigate("/dashboard");
        } catch {
            setMessage("Please provide a valid email and password");
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            {...register("username", { required: "Username is required" })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

                    <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-gray-500 text-xs">
                    &copy;2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;