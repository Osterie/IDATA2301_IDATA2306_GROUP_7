import { useState, useEffect } from "react";
import { getAllUsers } from "../../library/Identity/users.js";
import { deleteUser } from "../../library/Identity/users.js";
import { assignRoleToUser } from "../../library/Identity/users.js";
import { removeRoleFromUser } from "../../library/Identity/users.js";
import "./manageUserPage.css";
import { getCookie, setCookie } from "../../library/tools.js";

const ManageUserPage = ({ setActivePage }) => {
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
      setNewRole(newRole.trim().toUpperCase()); // Ensure the role is in uppercase
      await assignRoleToUser(userId, newRole); // <- call your API

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                roles: [...user.roles, { role: newRole.trim().toUpperCase() }], // Add new role to the user's roles
              }
            : user
        )
      );

      if (userId == getCookie("current_user_id")) {
        let allUserRoles = getCookie("current_user_roles");
        let newRoleFormatted = newRole.trim().toUpperCase();

        // Convert to array, filter out empty strings
        let rolesArray = allUserRoles
          ? allUserRoles
              .split(",")
              .map((r) => r.trim().toUpperCase())
              .filter((r) => r)
          : [];

        // Add new role if it's not already in the list
        if (!rolesArray.includes(newRoleFormatted)) {
          rolesArray.push(newRoleFormatted);
        }

        // Save updated roles back to cookie
        setCookie("current_user_roles", rolesArray.join(","));
      }

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
                roles: user.roles.filter((r) => r.role !== role), // Remove the role from the user
              }
            : user
        )
      );

      if (userId == getCookie("current_user_id")) {
        let allUserRoles = getCookie("current_user_roles");
        let roleToRemove = role.trim().toUpperCase();

        // Convert to array, filter out empty strings
        let rolesArray = allUserRoles
          ? allUserRoles
              .split(",")
              .map((r) => r.trim().toUpperCase())
              .filter((r) => r)
          : [];

        // Remove the role if it exists in the list
        rolesArray = rolesArray.filter((r) => r !== roleToRemove);

        // Save updated roles back to cookie
        setCookie("current_user_roles", rolesArray.join(","));
      }
    } catch (error) {
      console.error("Error removing role:", error);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <button onClick={() => setActivePage("admin")} className="back-button">← Back to admin page</button>
      <h1 className="manage-user-header">Manage Users</h1>
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
