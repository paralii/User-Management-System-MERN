import {BrowserRouter as Router , Routes , Route, Navigate} from "react-router-dom"
import LoginPage from "./pages/userPages/LoginPage"
import SignupPage from "./pages/userPages/SignupPage"
import UserHomePage from "./pages/userPages/UserHomePage"
import AdminLoginPage from "./pages/adminPages/AdminLoginPage"
import DashbardPage from "./pages/adminPages/DashboardPage"
import NotFoundPage from "./components/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin"
import { useSelector } from "react-redux"

export default function App() {

  const auth = useSelector((state) => state.auth.isAuthenticated)
  const role = useSelector((state) => state.auth.user?.role || "");

  return (
    <Router>

      <Routes>

        <Route path="/signup" element={!auth ? <SignupPage /> : <Navigate to="/profile" replace />} />
        <Route path="/" element={auth ? (
                role === 'user' ? <Navigate to="/profile" /> : <Navigate to="/dashboard" replace/>
              ) : (
                <LoginPage />
              )} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserHomePage />
          </ProtectedRoute>
        }
        />
        <Route path="/admin-login" element={!auth ?  <AdminLoginPage /> : <Navigate to="/dashboard" replace/>} />
        <Route path="/dashboard" element={
          <ProtectedRouteAdmin>
            <DashbardPage />
          </ProtectedRouteAdmin>
        } />
       <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </Router>
    
  )
}

