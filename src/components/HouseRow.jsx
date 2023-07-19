import React from "react";

const HouseRow = ({
  house,
  index,
  refetch,
  setDeleteConfirm = { setDeleteConfirm },
}) => {
  const { name, city, bedrooms, bathrooms, roomSize, rentPerMonth } = house;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{city}</td>
      <td>{bedrooms}</td>
      <td>{bathrooms}</td>
      <td>{roomSize}</td>
      <td>{rentPerMonth}</td>
      <td>
        <label
          onClick={() => setDeleteConfirm(house)}
          for="delete-house-modal"
          class="btn btn-sm bg-red-300 modal-button"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default HouseRow;
