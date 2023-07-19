import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../utils/Loading";
import HouseRow from "./HouseRow";
import DeleteHouseModal from "./DeleteHouseModal";
import AddHouseModal from "./AddHouseModal";
import EditHouseModal from "./EditHouseModal";

const Dashboard = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [addConfirm, setAddConfirm] = useState(null);
  const [editConfirm, setEditConfirm] = useState(null);

  const { data, isLoading, refetch } = useQuery("data", () =>
    fetch(
      "https://house-hunter-server-tawny.vercel.app/api/v1/houses/getOwned",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your ALL Houses</h1>
        <label
          onClick={() => setAddConfirm(1)}
          for="add-house-modal"
          class="btn btn-primary modal-button"
        >
          Add New House
        </label>
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
                {data?.data?.map((house, index) => (
                  <HouseRow
                    key={house._id}
                    house={house}
                    index={index}
                    refetch={refetch}
                    setEditConfirm={setEditConfirm}
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
        {editConfirm && (
          <EditHouseModal
            editConfirm={editConfirm}
            setEditConfirm={setEditConfirm}
            refetch={refetch}
          ></EditHouseModal>
        )}
      </div>
      {addConfirm && (
        <AddHouseModal
          setAddConfirm={setAddConfirm}
          refetch={refetch}
        ></AddHouseModal>
      )}
    </div>
  );
};

export default Dashboard;
