
import { useState } from 'react';
import { User } from 'lucide-react';
import axios  from '../../../../Api/axiosInstance.jsx';
import {message} from 'antd';
import {validateForm } from "../../../../validation/AdminEditUserValidation.jsx"; 

// Edit User Modal Component

const EditUserModal = ({ isOpen, setIsOpen, userDetails,fetchUsers  }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    mobile: userDetails?.mobile || '',
  });

    const displayErrorsAsToasts = (errosObj) =>{
      Object.values(errosObj).forEach((errorMessage) => {
          message.error(errorMessage);
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name] : value }));
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
       const response = await axios.patch(`admin//updateUsers/${userDetails._id}`,formData);  

       const displayMessage = response.data.message;

       message.success(displayMessage);
       fetchUsers()
      setTimeout(()=>{
        setIsOpen(false);
      },1000);

        
    } catch (error) {
      message.error(error?.response?.data?.message || "something went wrong")
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-md bg-gray-900 text-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
                     
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-6">
            {userDetails?.profilePic ? (
              <img
                src={userDetails.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                <User  size={48} />
              </div>
            )}
          </div>

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
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter name"
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
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter email"
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
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter mobile number"
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
                  className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;