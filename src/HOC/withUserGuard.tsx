import { useUserStore } from "@/store/AuthSlice";
import { Navigate } from "react-router-dom";

export const withUserGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useUserStore();

    if (!user || !token) {
      return <Navigate to="/login" replace />;
    }

    if (user.role !== "employee") {
      return <Navigate to="/admin" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};