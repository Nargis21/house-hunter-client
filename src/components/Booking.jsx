import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../utils/Loading";
import HouseRow from "./HouseRow";
import DeleteHouseModal from "./DeleteHouseModal";
import AddHouseModal from "./AddHouseModal";
import EditHouseModal from "./EditHouseModal";
import BookingRow from "./BookingRow";
import DeleteBookingModal from "./DeleteBookingModel";

const Booking = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading, refetch } = useQuery("data", () =>
    fetch("http://localhost:5000/api/v1/bookings", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Your Bookings</h1>
      </div>
      <div>
        <div className="border">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Bed Rooms</th>
                  <th>Bath Rooms</th>
                  <th>Size</th>
                  <th>Rent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((booking, index) => (
                  <BookingRow
                    key={booking._id}
                    booking={booking}
                    index={index}
                    refetch={refetch}
                    setDeleteConfirm={setDeleteConfirm}
                  ></BookingRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {deleteConfirm && (
          <DeleteBookingModal
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            refetch={refetch}
          ></DeleteBookingModal>
        )}
      </div>
    </div>
  );
};

export default Booking;
