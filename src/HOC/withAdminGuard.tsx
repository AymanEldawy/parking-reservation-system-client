import { useUserStore } from "@/store/AuthSlice";
import { Navigate } from "react-router-dom";

const withAdminGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useUserStore();

    // Not logged in → redirect to login
    if (!user || !token) {
      return <Navigate to="/login" replace />;
    }

    // Logged in but not admin → redirect to user home
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    // Authorized → render component
    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAdminGuard;