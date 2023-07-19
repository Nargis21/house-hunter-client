import React, { useEffect, useState } from "react";
import HouseCard from "../components/HouseCard";
import AddBookingModal from "../components/AddBookingModal";

const Home = () => {
  const [addConfirm, setAddConfirm] = useState(null);
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/houses")
      .then((res) => res.json())
      .then((data) => setHouses(data));
  }, []);
  return (
    <div className="bg-red-100">
      {/* <h1 className="text-5xl text-primary text-center pt-10 font-semi-bold">
        All Houses
      </h1> */}
      <div className=" py-20 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:pl-10  ">
        {houses?.data?.map((house) => (
          <HouseCard
            key={house._id}
            house={house}
            addConfirm={addConfirm}
            setAddConfirm={setAddConfirm}
          ></HouseCard>
        ))}
      </div>
      {addConfirm && (
        <AddBookingModal
          addConfirm={addConfirm}
          setAddConfirm={setAddConfirm}
        ></AddBookingModal>
      )}
    </div>
  );
};

export default Home;
