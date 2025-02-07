import { useEffect, useState } from "react";
import axios from "../../../Api/axiosInstance.jsx";
import Header from "./Header";
import Table from "./Table";
import TableHeader from "./TableHeader";


const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users , setUsers] = useState([]);
    const [filteredUser , setFilteredUser] = useState([]);
  
    //fetching users from backend

    const fetchUsers = async ()=>{
      const response = await axios.get('/admin/usersData') ;
      setUsers(response.data.users);
      setFilteredUser(response.data.users);
    }

    useEffect(()=>{
      
      fetchUsers();

    },[]);
        

    const filteredUsers = searchTerm
      ? users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;
  
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="p-6">
          <div className="bg-black rounded-lg shadow-lg overflow-hidden">
            <TableHeader onSearch={setSearchTerm} fetchUsers={fetchUsers} />
            <Table users={users} filteredUsers={filteredUsers} fetchUsers={fetchUsers}/>
          </div>
        </main>
      </div>
    );
  };
  
  export default AdminDashboard;