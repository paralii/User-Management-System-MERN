import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) =>{

    const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector((state)=>state.auth);

    if(!isAuthenticated){
        return <Navigate to="/" replace/>;
    }

    if(user?.role !=='user'){
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default ProtectedRoute