import { useState, useEffect } from "react";
import { getAllUsers } from "../../library/Identity/users.js";
import { deleteUser } from "../../library/Identity/users.js"; // You'll implement this
import "./manageUserPage.css";
import { assignRoleToUser } from "../../library/Identity/users.js"; // You'll implement this

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
        console.log(response);
        setUsers(response); // Assuming the response is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);

      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Call your API here
      await deleteUser(userId);
      console.log(`User with ID ${userId} deleted`);
      // setUsers(users.filter((user) => user.id !== userId));
      // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setUsers((prevUsers) => {
        const updated = prevUsers.filter((user) => user.id !== userId);
        console.log("Updated users:", updated);
        return updated;
      });
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
      // Call your backend to add role here
      console.log(`Assigning role "${newRole}" to user ID ${userId}`);
      await assignRoleToUser(userId, newRole); // <- call your API

      // Optionally update UI state here to reflect the new role
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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Users</h1>
      <p>This is the user management page for admins.</p>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        // TODO change style to be css
        <div className="user-card-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.username}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Roles:</strong>{" "}
                {user.roles.map((r) => r.role).join(", ")}
              </p>
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
