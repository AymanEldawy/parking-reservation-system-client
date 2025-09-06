import { useUserStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";

export const withUserGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const pathname = window.location.pathname;
    const { user, token } = useUserStore();

    if (user && user.role !== "employee") {
      return <Navigate to="/admin" replace />;
    }

    if ((!user || !token) && pathname === '/checkout') {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};