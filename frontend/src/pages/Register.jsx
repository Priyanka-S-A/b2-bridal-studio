import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      'http://localhost:5000/api/customer/register',
      formData
    );

    // 🔥 SAVE USER
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Registered successfully");

    // 🔁 Redirect to home
    window.location.href = "/";

  } catch (err) {
    alert(err.response?.data?.error || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-96 space-y-5 shadow-2xl border border-gray-100"
      >

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-black">
          Create Account
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a13b]"
          required
        />

        {/* BUTTON */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#c9a13b] hover:text-black transition">
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-[#c9a13b] font-semibold">
            Login
          </a>
        </p>

      </form>
    </div>
  );
};

export default Register;