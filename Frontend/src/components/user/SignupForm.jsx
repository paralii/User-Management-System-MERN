import { useState } from "react";
import axios from "../../Api/axiosInstance.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { validateForm } from "../../validation/validation.jsx";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button text and cursor

  const displayErrorsAsToasts = (errorsObj) => {
    Object.values(errorsObj).forEach((errorMessage) => {
      toast.error(errorMessage);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    const { newErrors, message: validationMessage } = validateForm(formData);

    if (validationMessage) {
      toast.error(validationMessage);
      setIsSubmitting(false); // Reset submitting state
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      displayErrorsAsToasts(newErrors);
      setIsSubmitting(false); // Reset submitting state
      return;
    }

    try {
      const response = await axios.post("/users/signup", formData);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response) {
        const { errors, message } = error.response.data;
        if (errors) {
          displayErrorsAsToasts(errors);
        } else {
          toast.error(message || "An error occurred");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./Background-Login.jpeg')" }} // Replace with your background image path
    >
      <div className="w-full max-w-md bg-black bg-opacity-70 text-white rounded-lg border border-lime-500 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-lime-500 text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-lime-500 text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-lime-500 text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-lime-500 text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-lime-500 text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-lime-500 hover:bg-lime-600 text-black font-medium py-2 rounded transition-colors ${isSubmitting ? 'cursor-not-allowed' : ''}`}
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? 'Signing Up ...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/" className="text-lime-400 hover:underline">
            Already have an account? Login
          </Link>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default SignupForm;