import { Navigate } from "react-router-dom";
import { user } from "../../types/Types";

const ProtectedRoute = ({ user, children }: { user: user | null, children: React.ReactElement }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute
