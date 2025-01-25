import React, { useState } from "react";

import axios from "../../Api/axiosInstance.jsx";

import { ToastContainer,toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import { validateForm } from "../../validation/validation.jsx"; 

import { useNavigate } from "react-router-dom";


const SignupForm = ()=>{
   
  const navigate = useNavigate();
    
  const [formData,setFormData] = useState({
        name:"",
        email:"",
        mobile:"",
        password:"",
        confirmPassword:"",
    });

  const displayErrorsAsToasts = (errosObj) =>{
        Object.values(errosObj).forEach((errorMessage) => {
            toast.error(errorMessage);
        })
    }


  const handleSubmit = async(e)=>{
    
        e.preventDefault();
        
  const {newErrors , message :validationMessage} = validateForm(formData);

        if(validationMessage){
            toast.error(validationMessage);
            return;
        }

        if(Object.keys(newErrors).length > 0){
            displayErrorsAsToasts(newErrors);
            return;
        }

        try {
                const response = await axios.post("/users/signup",formData);
                toast.success(response.data.message);
                setTimeout(()=>{
                  navigate("/");
                },1000);
        } 
        
        catch(error){

          if(error.response){

            const {errors,message} = error.response.data;

            if(errors){

              displayErrorsAsToasts(errors)

            }
            else{

              toast.error(message || "An error Occured")

            }

          }
          else
          {
            toast.error("Something went wrong")
          }
           
        }
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-8">
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
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition-colors"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-3">
            <Link to="/" className="text-purple-400 hover:underline">
              Already have an account ? Login
            </Link>
            </div>
            <ToastContainer position="top-center" />
          </div>
        </div>
      );
}

export default SignupForm
   


























