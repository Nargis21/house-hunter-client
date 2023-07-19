import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../utils/Loading";
import HouseRow from "./HouseRow";
import DeleteHouseModal from "./DeleteHouseModal";

const Dashboard = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading, refetch } = useQuery("data", () =>
    fetch("http://localhost:5000/api/v1/houses/getOwned", {
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
      <div>
        <h1 className="text-2xl font-bold">Your ALL Houses</h1>
        <button></button>
      </div>
      <div>
        <div className="border">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Index</th>
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
                {data.data.map((house, index) => (
                  <HouseRow
                    key={house._id}
                    house={house}
                    index={index}
                    refetch={refetch}
                    setDeleteConfirm={setDeleteConfirm}
                  ></HouseRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {deleteConfirm && (
          <DeleteHouseModal
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            refetch={refetch}
          ></DeleteHouseModal>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
