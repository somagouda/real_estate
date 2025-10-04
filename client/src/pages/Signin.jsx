import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/user.Slice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = React.useState({});
  const { loading, error } = useSelector((state) => state.user); // ✅ from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart()); // ✅ set loading true
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Invalid credentials!"));
        return;
      }

      dispatch(signInSuccess(data.user)); // ✅ save user in Redux
      alert("Signin Successful!  Welcome back.");
      navigate("/"); // ✅ redirect
    } catch (err) {
      dispatch(signInFailure("Something went wrong!"));
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">SignIn</h1>
      <form
        className="flex flex-col max-w-md mx-auto mt-8"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full uppercase hover:opacity-95"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="flex gap-2 justify-center mt-4">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}
