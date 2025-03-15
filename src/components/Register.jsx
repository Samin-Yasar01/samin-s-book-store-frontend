import React from 'react'
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useAuth } from '../context/AuthContex';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [message, setMessage] = useState(""); 
    const { registerUser, signInWithGoogle } = useAuth(); 
    const navigate = useNavigate(); // ✅ Fix: Correct function name

    const { register, handleSubmit, formState: { errors } } = useForm(); // ✅ Only one handleSubmit now
    //gersister user

    const onSubmit = async(data) => {
            console.log(data);
            try {
                await registerUser(data.email, data.password);
                alert("User registered successfully");
            } catch {
                setMessage("Please provide a valid email and password");
            }
            //✅ Clear error message if login succeeds
        };
    
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Sign successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
        };
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

                {/* ✅ No duplicate handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input  
                            {...register("email", { required: "Email is required" })}  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
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
                            Register
                        </button>
                    </div>
                </form>

                <p className="inline-block align-baseline font-medium mt-4 text-sm">
                    Have an account? Please 
                    <Link to="/login" className='text-blue-500 hover:text-blue-800'> Login</Link>
                </p>

                {/* Google Sign-In */}
                <div>
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="w-full flex flex-wrap gap-1 items-center justify-center bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <FaGoogle className="mr-2" />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-5 text-center text-gray-500 text-xs">
                    &copy;2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
  )
}

export default Register
