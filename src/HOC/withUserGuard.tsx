import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export const withUserGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const pathname = window.location.pathname;
    const { user, token } = useAuthStore();
    if (user && user.role !== "employee") {
      return <Navigate to="/admin" replace />;
    }

    if ((!user || !token) && pathname === '/checkpoint') {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};