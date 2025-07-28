import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ Component, getCookie }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    
    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }

    }, [])
    if (isAuthenticated === null) {
        return
    }
    return isAuthenticated ? <Component getCookie={getCookie} /> : <Navigate to='/' replace />
}

export default PrivateRoute;