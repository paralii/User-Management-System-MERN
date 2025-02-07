import "react";

import { useState } from "react";

import { Search ,UserPlus } from "lucide-react";

import AddUserModal from "./Modal/AddUserModal";

const TableHeader = ({ onSearch,fetchUsers }) => 
 {

  const [isAddModalOpen , setIsAddModalOpen] = useState(false);
  
  const handleAdd = () =>{
    setIsAddModalOpen(true);
  }


  return(
    <div className="flex justify-between items-center p-4 bg-cyan-600">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <UserPlus size={18} />
        <span>Add User</span>
      </button>
      
      {/* Add user Modal */}
    <AddUserModal
      isOpen={isAddModalOpen}
      setIsOpen={setIsAddModalOpen}
      fetchUsers ={fetchUsers}
     />

    </div>
  );
}

  export default TableHeader