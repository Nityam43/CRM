import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect to dashboard on successful login
      if (
        res.status === 200 &&
        res.data.message.toLowerCase().includes("login successful")
      ) {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2331]">
      <div className="bg-[#151824] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Log In
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Log in to your account to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <EnvelopeIcon className="h-5 w-5" />
            </span>
            <input
              name="identifier"
              type="text"
              placeholder="Username or Email"
              value={form.identifier}
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
            Log In
          </button>
          <div
            className={`text-center min-h-5 font-medium ${
              message === "Login successful" ? "text-green-500" : "text-red-400"
            }`}
          >
            {message}
          </div>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
