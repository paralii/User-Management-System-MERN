import { LogOut } from "lucide-react";

import { logout } from "../../../redux/authSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Header = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = ()=>{

    dispatch(logout());

    navigate("/admin-login");
    
  }

  return(
    <header className="flex justify-between items-center bg-gray-900 p-4 border-b border-gray-700">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </header>
  );
}

export default Header