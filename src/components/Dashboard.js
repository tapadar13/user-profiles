import { useState, useEffect } from "react";
import UserCard from "./UserCard.js";
import Loader from "./Loader.js";
import config from "../constants/config.js";
import "../App.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(config.apiEndpoint);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  console.log(users);

  const handleDeleteUser = (id) => {
    let newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  const handleEditUser = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="card-items">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <UserCard
                user={user}
                onEdit={handleEditUser}
                deleteUser={handleDeleteUser}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
