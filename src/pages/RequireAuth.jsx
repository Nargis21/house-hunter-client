import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import getAuth from "../hooks/getAuthUser";

const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const user = await getAuth();
      if (user) {
        setUser(user);
      }
    }

    fetchData();
  }, []);
  console.log();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default RequireAuth;
