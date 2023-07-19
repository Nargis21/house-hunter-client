import React, { useState, useEffect } from "react";

const getAuthUser = () => {
  const [auth, setAuth] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/getAuth",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              // Add other headers as needed
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Handle the response data
          setAuth(data);
          console.log(data);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once

  return auth;
};

export default getAuthUser;
