import { useState, useEffect } from "react";
import { getAllUsers } from "../../library/Identity/users.js";
import { deleteUser } from "../../library/Identity/users.js";
import { assignRoleToUser } from "../../library/Identity/users.js";
import { removeRoleFromUser } from "../../library/Identity/users.js";
import "./manageUserPage.css";

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response); // Assuming the response is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("The server is currently down. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      console.log(`User with ID ${userId} deleted`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddRole = (userId) => {
    setEditingUserId(userId);
    setNewRole("");
  };

  const handleConfirmRole = async (userId) => {
    try {
      console.log(`Assigning role "${newRole}" to user ID ${userId}`);
      await assignRoleToUser(userId, newRole); // <- call your API

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                roles: [...user.roles, { role: newRole }] // Add new role to the user's roles
              }
            : user
        )
      );

      setEditingUserId(null);
      setNewRole("");
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  const handleCancelRole = () => {
    setEditingUserId(null);
    setNewRole("");
  };

  const handleRemoveRole = async (userId, role) => {
    try {
      await removeRoleFromUser(userId, role);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                roles: user.roles.filter((r) => r.role !== role) // Remove the role from the user
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error removing role:", error);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Users</h1>
      <p>This is the user management page for admins.</p>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p> // Show the error message if there's an error
      ) : (
        <div className="user-card-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.username}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div>
                <strong>Roles:</strong>
                <div className="roles-container">
                  {user.roles.map((r) => (
                    <div key={r.role} className="role-card">
                      <button
                        onClick={() => handleRemoveRole(user.id, r.role)}
                        className="remove-role-button"
                        >
                        x
                      </button>
                      <span>{r.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleDelete(user.id)}
                className="delete-user-button"
              >
                Delete
              </button>

              {editingUserId === user.id ? (
                <>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Enter role"
                  />
                  <button onClick={() => handleConfirmRole(user.id)}>
                    Confirm
                  </button>
                  <button onClick={handleCancelRole}>Cancel</button>
                </>
              ) : (
                <button
                  onClick={() => handleAddRole(user.id)}
                  className="add-role-button"
                >
                  Add Role
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ManageUserPage;
