import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/reset-password/${token}`, {
        password,
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Unable to reset password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-green-100 via-emerald-50 to-yellow-50">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white/85 p-8 shadow-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-semibold text-green-900 text-center mb-6">Reset Password</h1>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        {message && <p className="text-sm text-green-700 mb-4">{message}</p>}
        <div className="space-y-5">
          <div>
            <label className="text-sm text-green-900 font-medium mb-2 block">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-green-50 w-full text-sm text-green-900 px-4 py-3 rounded-md outline-0 border border-green-200 focus:border-green-600 focus:bg-white transition"
              placeholder="Enter a new password"
            />
          </div>
          <div>
            <label className="text-sm text-green-900 font-medium mb-2 block">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-green-50 w-full text-sm text-green-900 px-4 py-3 rounded-md outline-0 border border-green-200 focus:border-green-600 focus:bg-white transition"
              placeholder="Confirm your new password"
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="w-full mt-8 py-3 text-white font-medium bg-green-700 hover:bg-green-800 rounded-md shadow-lg transition-transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Update Password
        </motion.button>
        <p className="text-center text-sm text-green-800 mt-5">
          <Link to="/login" className="underline">Back to login</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default ResetPassword;
