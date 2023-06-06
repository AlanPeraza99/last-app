import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom";

export const ProtectedRouters = ({ children }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" replace={true} />
    return <> {children}</> ;
}