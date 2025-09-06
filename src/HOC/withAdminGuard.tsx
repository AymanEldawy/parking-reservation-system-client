import { useUserStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";

const withAdminGuard = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useUserStore();
    const pathname = window.location.pathname;

    // Logged in but not admin → redirect to user home
    if (user && user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    // Not logged in → redirect to login
    if ((!user || !token) && pathname !== '/checkout') {
      return <Navigate to="/login" replace />;
    }

    // Authorized → render component
    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAdminGuard;