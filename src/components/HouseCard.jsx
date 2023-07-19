import React, { useEffect, useState } from "react";
import getAuth from "../hooks/getAuthUser";

const HouseCard = ({ house, setAddConfirm }) => {
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

  const {
    _id,
    name,
    city,
    address,
    bedrooms,
    bathrooms,
    roomSize,
    rentPerMonth,
    phoneNumber,
    availabilityDate,
    description,
    picture,
  } = house;
  return (
    <div className="">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-8 pt-8">
          <img src={picture} alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-accent font-serif text-2xl ">{name}</h2>
          <p>
            <span className="font-bold">Address: </span>
            {address} {city}
          </p>
          <p>
            <span className="font-bold">Number of Bedrooms: </span>
            {bedrooms}
          </p>
          <p>
            <span className="font-bold">Number of Bathrooms: </span>
            {bathrooms}
          </p>
          <p>
            <span className="font-bold">Room Size: </span>
            {roomSize}
          </p>
          <p>
            <span className="font-bold">Rent Per Month: </span>
            {rentPerMonth}
          </p>
          <p>
            <span className="font-bold">Phone Number: </span>
            {phoneNumber}
          </p>
          <p>
            <span className="font-bold">Availability Datw: </span>
            {availabilityDate}
          </p>
          <p>
            <span className="font-bold">Description: </span>
            {description}
          </p>
          {user?.role === "renter" && (
            <>
              <label
                onClick={() => setAddConfirm(house)}
                for="add-booking-modal"
                class="btn btn-primary modal-button mt-6"
              >
                Add New House
              </label>
            </>
          )}
          {user?.role === "owner" && (
            <>
              <label disabled class="btn btn-primary modal-button mt-6">
                Add New House
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
