import React, { useState } from "react";

import { toast,ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {validateForm} from "../../validation/userLoginValidation.jsx"

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { loginSuccess } from "../../redux/authSlice.jsx";

import axios from "../../Api/axiosInstance.jsx";


const Login = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

     const displayErrorsAsToasts = (errosObj) =>{
            Object.values(errosObj).forEach((errorMessage) => {
                toast.error(errorMessage);
            })
        }

    const handleSubmit = async(e)=>{

        e.preventDefault();

        const {newErrors,message :validationMessage} = validateForm(formData);

        if(validationMessage){
            toast.error(validationMessage);
            return;
        }

        if(Object.keys(newErrors).length>0){
            displayErrorsAsToasts(newErrors);
            return;
        }

        try{
            const response = await axios.post("/users/login",formData);
            
            const {token,user} = response.data;

            if(response.data.token){
                dispatch(loginSuccess({token,user}));

                localStorage.setItem("user",JSON.stringify(user));
                localStorage.setItem('token',token);

                navigate("/profile");
            }
        }
        catch(error){
            toast.error(error.response?.data?.message || "Error in login");
        }
    }  
    
    const handleChange = (e) =>{
        const {name,value}= e.target;
        setFormData({...formData,[name]:value});
    }

     return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
              <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">     
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
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition-colors"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link to="/signup" className="text-purple-400 hover:underline">
                  Don't have an account ? Register
                  </Link>
                </div>
                <div className="text-center mt-3">
                  <Link to="/admin-login" className="text-purple-400 hover:underline">
                     Admin Login
                  </Link>
                </div>
                <ToastContainer position="top-center" />
              </div>
              
            </div>
          );
}

export default Login