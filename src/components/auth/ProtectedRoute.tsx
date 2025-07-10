
import { Navigate, useLocation } from "react-router-dom";

const user = {
  isAuthenticated: true,
  role: "admin", // mock role
};

export const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: st }) => {
  const location = useLocation();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};