import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { logout } from '../../redux/authSlice';

import { toast, ToastContainer } from 'react-toastify';

import axios from "../../Api/axiosInstance.jsx"

import "react-toastify/dist/ReactToastify.css";

const UserHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const[userData , setUserData] = useState({
    name:"",
    email:"",
    mobile:"",
    role:""  
  });


  const [previewUrl, setPreviewUrl] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [key,setKey] = useState(0);

 useEffect(()=>{
  const fetchData = async () =>{
    try{
    const response = await axios.get('/users/profile');

    const {name , email , mobile , role ,profilePic} = response.data;

    setUserData({name , email , mobile , role});

    if(profilePic){
      setPreviewUrl(profilePic)
    }
    else{
      setPreviewUrl('/defaultImages/rb_174669.png')
    }
    }
    catch(err){
      console.log(err);
      const errors= err.response.data.message || err.message;
      toast.error(errors);
    }
  }
  fetchData();
 },[key])

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setEdit(true);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProfilePic) {
      toast.error("Please select a new profile picture to upload", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    const formData = new FormData();
    formData.append('profile', newProfilePic);

    try {
      setLoading(true);
      const response = await axios.post("/users/updateProfile", formData);
      setEdit(false);
      setLoading(false);
      toast.success("Profile picture updated successfully", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
     catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error uploading profile picture", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          {/* Top Banner */}
          <div className="h-40 bg-gradient-to-r from-[#2D2D2D] to-[#1E1E1E] relative">
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Picture Section */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-[#1E1E1E] shadow-xl overflow-hidden bg-[#2D2D2D]">
                  <img
                    src={previewUrl}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                  {!edit && (
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute top-45 left-0 right-0 mx-auto bg-black bg-opacity-30 text-white py-1 text-sm"
                    >
                      Edit Photo
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {edit && newProfilePic && (
                  <div className="absolute top-30 w-full flex justify-center gap-4 mt-[10px]">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`px-3 py-1 rounded-full text-xs ${
                        loading
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700'
                      } transition-colors duration-300`}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setEdit(false);
                        setPreviewUrl(null);
                        setNewProfilePic(null);
                        setKey((prev)=>prev+1)
                      }}
                      className="px-3 py-1 rounded-full text-xs bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* User Info Section */}
            <div className="pt-28 text-center">
              <h1 className="text-3xl font-bold text-gray-100 mt-4">{userData.name}</h1>
              <p className="text-purple-400 mt-1">{userData.role}</p>

              {/* Contact Information */}
              <div className="mt-8 grid gap-6 max-w-2xl mx-auto">
                <div className="p-4 bg-[#2D2D2D] rounded-xl border border-gray-800">
                  <h2 className="text-sm font-medium text-gray-400 mb-2">Email Address</h2>
                  <p className="text-gray-200">{userData.email}</p>
                </div>

                <div className="p-4 bg-[#2D2D2D] rounded-xl border border-gray-800">
                  <h2 className="text-sm font-medium text-gray-400 mb-2">Mobile Number</h2>
                  <p className="text-gray-200">{userData.mobile || 'Not provided'}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
};

export default UserHome;
