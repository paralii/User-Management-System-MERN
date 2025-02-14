  import React, { useState } from "react";

  import { toast,ToastContainer } from "react-toastify";

  import "react-toastify/dist/ReactToastify.css";

  import {validateForm} from "../../validation/userLoginValidation.jsx"

  import { useNavigate } from "react-router-dom";

  import { useDispatch } from "react-redux";

  import { Link } from "react-router-dom";

  import { loginSuccess } from "../../redux/authSlice.jsx";

  import axios from "../../Api/axiosInstance.jsx";


  const AdminLogin = ()=>{

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
              const response = await axios.post("/admin/login",formData);
              
              const {token,user} = response.data;

              if(response.data.token){
                  dispatch(loginSuccess({token,user}));

                  localStorage.setItem("user",JSON.stringify(user));
                  localStorage.setItem('token',token);

                   navigate("/dashboard");
                  toast.success(response.data.message);
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
        <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
          <div className="w-full max-w-md bg-[#1E1E1E] text-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
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
                  className="w-full px-4 py-2 rounded bg-[#2D2D2D] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-4 py-2 rounded bg-[#2D2D2D] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium py-2 rounded transition-colors"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/signup" className="text-cyan-400 hover:underline">
                Don't have an account? Register
              </Link>
            </div>
            <div className="text-center mt-3">
              <Link to="/" className="text-cyan-400 hover:underline">
                User Login
              </Link>
            </div>
            <ToastContainer position="top-center" theme="dark" />
          </div>
        </div>
      );
    };
    
    export default AdminLogin;