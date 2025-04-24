import { useState, useEffect } from "react";
import { getAllUsers } from "../../library/Identity/users.js";
import { deleteUser } from "../../library/Identity/users.js"; // You'll implement this

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);
        setUsers(response); // Assuming the response is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Users</h1>
      <p>This is the user management page for admins.</p>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "1rem",
                width: "250px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Roles:</strong> {user.roles.map((r) => r.role).join(", ")}</p>
              <button
                onClick={() => handleDelete(user.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ManageUserPage;
