import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message);

      // Store token in localStorage if provided
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Clear form after successful signup
      setForm({ username: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2331]">
      <div className="bg-[#151824] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Sign Up
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Create a new account to get started.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <UserIcon className="h-5 w-5" />
            </span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full py-2 pl-10 pr-3 rounded bg-[#232941] text-green-300 border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <EnvelopeIcon className="h-5 w-5" />
            </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full py-2 pl-10 pr-3 rounded bg-[#232941] text-green-300 border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <LockClosedIcon className="h-5 w-5" />
            </span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full py-2 pl-10 pr-3 rounded bg-[#232941] text-green-300 border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide shadow transition"
          >
            Sign Up
          </button>
          <div
            className={`text-center min-h-5 font-medium ${
              message === "User registered successfully"
                ? "text-green-500"
                : "text-red-400"
            }`}
          >
            {message}
          </div>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 hover:underline transition"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
