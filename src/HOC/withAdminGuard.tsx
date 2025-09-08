import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const withAdminGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useAuthStore();
    
    const pathname = window.location.pathname;

    if (user && user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    if ((!user || !token) && pathname !== '/checkout') {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAdminGuard;