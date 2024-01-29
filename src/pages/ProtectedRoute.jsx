import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react";

const ProtectedRoute = ({ children }) =>
{

    const { isAuthentication } = useAuth();
    const navigate = useNavigate();

    useEffect(() =>
    {
        if (!isAuthentication) navigate("/");
    })

    return isAuthentication ? children : ''
}

export default ProtectedRoute