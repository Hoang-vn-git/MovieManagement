import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};
export default PrivateRoute;