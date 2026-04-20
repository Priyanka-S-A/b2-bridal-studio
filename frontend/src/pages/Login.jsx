import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      'http://localhost:5000/api/customer/login',
      formData
    );

    // 🔥 SAVE USER
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful");

    // 🔁 Redirect
    window.location.href = "/";

  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-96 space-y-5 shadow-2xl border"
      >

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center">
          Welcome Back
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* BUTTON */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#c9a13b] hover:text-black transition">
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-[#c9a13b] font-semibold">
            Register
          </a>
        </p>

      </form>
    </div>
  );
};

export default Login;