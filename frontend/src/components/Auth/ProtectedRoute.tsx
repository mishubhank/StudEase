import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "react-select";
interface props {
  children: React.ReactNode;
  role: string;
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
      if (decode.role !== role) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      navigate("/home");
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
