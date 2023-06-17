import { useState } from "react";
import {
  EditFilled,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "../styles/UserCard.css";
import "../styles/Modal.css";

const UserCard = ({ user, deleteUser, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      editedUser.name &&
      editedUser.email &&
      editedUser.phone &&
      editedUser.website
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(editedUser)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onEdit(editedUser);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-image">
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            alt={user.username}
          />
        </div>
        <div className="card-details">
          <h2 className="card-name">{user.name}</h2>
          <p className="card-info">
            <MailOutlined /> {user.email}
          </p>
          <p className="card-info">
            <PhoneOutlined /> {user.phone}
          </p>
          <p className="card-info">
            <GlobalOutlined /> {user.website}
          </p>
        </div>
        <div className="card-actions">
          <button className="card-action-button like-button">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={
                <Favorite sx={{ color: "red", backgroundColor: "#e0dcdc" }} />
              }
            />
          </button>
          <button
            className="card-action-button edit-button"
            onClick={() => setIsModalOpen(true)}
          >
            <EditFilled style={{ color: "gray", fontSize: "20px" }} />
          </button>
          <button
            className="card-action-button delete-button"
            onClick={() => deleteUser(user.id)}
          >
            <DeleteFilled style={{ color: "gray", fontSize: "20px" }} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target.className === "modal-container") setIsModalOpen(false);
          }}
        >
          <div className="modal">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone: </label>
                <input
                  type="number"
                  name="phone"
                  value={parseInt(editedUser.phone.replace(/[^0-9]/g, ""))} //parsing the phone number
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website: </label>
                <input
                  type="text"
                  name="website"
                  value={editedUser.website}
                  onChange={handleInputChange}
                />
              </div>

              {errors && (
                <div className="error">{`Please include ${errors}`}</div>
              )}

              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                OK
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
