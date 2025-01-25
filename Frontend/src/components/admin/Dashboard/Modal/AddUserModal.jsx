import React from "react";

import {User} from 'lucide-react'

import { useState } from "react";

import {message} from 'antd';

import axios from "../../../../Api/axiosInstance.jsx";


import {validateForm } from "../../../../validation/adminAddUserValidation.jsx"; 


const AddUserModal = ({ isOpen, setIsOpen , fetchUsers }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const displayErrorsAsToasts = (errosObj) =>{
    Object.values(errosObj).forEach((errorMessage) => {
        message.error(errorMessage);
    })
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const {newErrors , message :validationMessage} = validateForm(formData);
    
            if(validationMessage){
                message.error(validationMessage);
                return;
            }
    
            if(Object.keys(newErrors).length > 0){
                displayErrorsAsToasts(newErrors);
                return;
            }
    
    try {

      const response = await axios.post('/admin/addUser',formData);
       
      message.success(response.data.message);

      fetchUsers();
      
      setIsOpen(false);

    } 
    catch (error){
 
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      }
       else { message.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-md bg-gray-900 text-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Add New User</h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal