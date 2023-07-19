import React, { useEffect, useState } from "react";
import House from "../components/House";
import getAuth from "../hooks/getAuthUser";
import Booking from "../components/Booking";

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

  return (
    <div>
      {user?.role === "owner" && <House></House>}
      {user?.role === "renter" && <Booking></Booking>}
      {user?.role === undefined && "No"}
    </div>
  );
};

export default Dashboard;
