import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://mighty-mesa-62871-571878c34ddf.herokuapp.com/api/check-token", {
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoute;