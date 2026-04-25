import { jwtDecode } from "jwt-decode";
import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface props {
  children: ReactNode;
  role: string | string[];
}

const ProtectedRoute = ({ children, role }: props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token, "checking token in protected route");
    if (!token) {
      navigate("/home");
    }

    try {
      const decode: any = jwtDecode(token as string);
      console.log(decode.role, "checking the role dfrom token");
      const allowedRoles = Array.isArray(role) ? role : [role];
      if (!allowedRoles.includes(decode.role)) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      navigate("/home");
    }
  }, [navigate, role]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
