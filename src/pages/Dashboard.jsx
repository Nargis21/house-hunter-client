import React, { useEffect, useState } from "react";
import House from "../components/House";
import getAuth from "../hooks/getAuthUser";

const Dashboard = () => {
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
  return <div>{user?.role === "owner" ? <House></House> : "hello"}</div>;
};

export default Dashboard;
