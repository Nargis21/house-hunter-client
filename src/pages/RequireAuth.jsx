/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../utils/Loading";
import { useQuery } from "react-query";

const RequireAuth = ({ children }) => {
  const {
    isLoading,
    data: auth,
    refetch,
  } = useQuery("users", () =>
    fetch("http://localhost:5000/api/v1/auth/getAuth", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  console.log(auth);
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAuth;
