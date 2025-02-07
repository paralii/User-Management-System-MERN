import {Edit ,Trash2} from 'lucide-react'
import EditUserModal from './Modal/EditUserModal.jsx';
import { useState } from 'react';
import axios from '../../../Api/axiosInstance.jsx';
import { Modal , message } from 'antd';

const Table = ({ users, filteredUsers ,fetchUsers }) => {
 
  const [isEditModalOpen , setIsEditModalOPen] = useState(false);

  const [selectedUser , setSelectedUser] = useState(null);

  const {confirm} = Modal;
   
  const handleEdit =(user)=>{
     
    setSelectedUser(user);

    setIsEditModalOPen(true);
  }

  const handleDelete =  (user) =>{
    setSelectedUser(user);
    confirm({
      title :`Are you sure you want to delete ${user.name}`,
      content :"This action cannot be undone",
      okText :"Delete",
      okType :"Danger",
      cancelText :"cancel",
      onOk: async ()=>{
        try{
          const response = await axios.get(`/admin/deleteUser/${user._id}`);
          message.success(response.data.message);
          fetchUsers();
        }
        catch(error){
            console.log(error);
            message.error("failed to delete user");
        }

      },
      oncancel : ()=>{
        message.info("User deletion cancelled");
      }
    })
   
   
  }

 

  const dataToDisplay = filteredUsers?.length >0? filteredUsers : users ;


  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-white">
        <thead className="bg-cyan-600 text-white">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Profile</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Mobile Number</th>
            <th className="p-4">Last Login</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((user, index) => (
            <tr key={user._id || index} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.mobile}</td>
              <td className="p-4">{user?.lastLogin || 'Not yet logged in'}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="p-1 text-blue-400 hover:text-blue-300" onClick={() =>handleEdit(user)}>
                    <Edit size={18} />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-300" onClick={()=>handleDelete(user)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    
     {/* Edit user Modal */}

     <EditUserModal
       isOpen={isEditModalOpen}
       setIsOpen={() =>setIsEditModalOPen(false)}
       userDetails={selectedUser}
       fetchUsers={fetchUsers}
     />

    
    </div>
  );
}

  export default Table
  