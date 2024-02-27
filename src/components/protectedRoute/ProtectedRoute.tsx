import { Navigate } from "react-router-dom";
import { User } from "../../types/Types";

const ProtectedRoute = ({ user, children }: { user: User | null, children: React.ReactElement }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute
