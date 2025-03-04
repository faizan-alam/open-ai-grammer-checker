"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../compnents/Form/Input";
import "../styles/styles.css";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName.length < 3) {
      toast.error("Full Name must be at least 3 characters long.");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Enter a valid email.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/register", formData);

      if (response.status === 201) {
        toast.success("Signup Successful!");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">Signup</h2>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="Full Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>

      <p className="label">
        Already have an account?{" "}
        <a href="/login" className="toggle">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
