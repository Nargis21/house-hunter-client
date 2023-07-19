/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import getAuth from "../hooks/getAuthUser";

const AddBookingModal = ({ addConfirm, setAddConfirm }) => {
  const { _id } = addConfirm;
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

  const validatePhoneNumber = (value) => {
    const isValid = /^(\+88)?01[0-9]{9}$/.test(value);
    return isValid || "Please enter a valid phone number";
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [error, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    const bookingInfo = {
      name: user?.name,
      email: user?.email,
      phoneNumber: data.phoneNumber,
      renter: user?._id,
      house: _id,
    };
    console.log(bookingInfo);
    fetch("http://localhost:5000/api/v1/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          if (data.errorMessages && data.errorMessages.length > 0) {
            setErrorMessage(data.errorMessages[0].message);
          } else {
            setErrorMessage("");
          }
          toast.error("Booking Failed!");
          reset();
        } else {
          reset();
          toast.success(`Booking Successful!`);
          setAddConfirm(null);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="add-booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <div className="card-body items-center ">
            <h2 className="card-title text-xl">Add Booking</h2>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                  defaultValue={user.name}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                  defaultValue={user.email}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    validate: validatePhoneNumber,
                  })}
                />
                {errors.phoneNumber?.type === "required" && (
                  <label className="label">
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  </label>
                )}
                {errors.phoneNumber?.type !== "required" && (
                  <label className="label">
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </span>
                  </label>
                )}
              </div>

              <input
                type="submit"
                className="btn btn-primary w-full mt-4 text-white"
                value="Add Now"
              />
              <div className="mt-2 text-center">
                {error && ( // Display the error message if present
                  <span className=" text-red-500 text-sm ">{error}</span>
                )}
              </div>
            </form>
          </div>
          <div class="modal-action">
            <label for="add-booking-modal" class="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;
