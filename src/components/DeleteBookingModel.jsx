/* eslint-disable react/no-unknown-property */
import React from "react";
import { toast } from "react-toastify";

const DeleteBookingModal = ({ deleteConfirm, setDeleteConfirm, refetch }) => {
  const { _id } = deleteConfirm;
  const handleProductDelete = () => {
    fetch(`http://localhost:5000/api/v1/bookings/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Booking deleted Successfully!`);
          setDeleteConfirm(null);
          refetch();
        } else {
          toast.error(`Failed to delete booking!`);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="delete-booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Are you sure want to delete this booking?
          </h3>
          <div class="modal-action">
            <button
              className="btn btn-error  px-6 btn-sm"
              onClick={handleProductDelete}
            >
              Delete
            </button>
            <label for="delete-booking-modal" class="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;
