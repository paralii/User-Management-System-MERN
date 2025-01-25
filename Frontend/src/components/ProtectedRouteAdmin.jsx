import {  useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({children}) =>{

    const auth = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.user?.role);

    if(!auth){
        const token = localStorage.getItem('token');

        if(!token){
        return <Navigate to="/admin-login"  replace/>
        }
    }

    if(role !=='admin'){
        return <Navigate to="/profile" replace />
    }

    return children;

}

export default ProtectedRouteAdmin