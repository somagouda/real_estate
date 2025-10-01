
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); // ✅ for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // ✅ Clear error if success
      setError(null);
      setLoading(false);

       alert("Signup successful! Please sign in.");

    // ✅ redirect to Sign In page
    navigate("/signin");

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">SignUp</h1>
      <form
        className="flex flex-col max-w-md mx-auto mt-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          onChange={handleChange}
          id="username"
        />
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="flex gap-2 justify-center mt-4">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}
