import React from 'react'
import { Link } from 'react-router-dom'
export default function Signup() {
  return (
    <div>
     <h1 className="text-3xl text-center font-bold">SignUp</h1>
   <form className='flex flex-col max-w-md mx-auto mt-8'>
    <input type="text" placeholder="Username" className="border border-gray-300 p-2 rounded w-full mb-4"/>
    <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded w-full mb-4"/>
    <input type="password" placeholder="Password" className="border border-gray-300 p-2 rounded w-full mb-4"/>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full uppercase hover:opacity-95">Sign Up</button>
   </form>
   <div className='flex gap-2 justify-center mt-4'>
    <p>Have an account? </p>
    <Link to={"/sign-in"}>
    <span className='text-blue-500 hover:underline cursor-pointer'>
    Sign In</span>
    </Link>
    </div>
    </div>
  )
}
