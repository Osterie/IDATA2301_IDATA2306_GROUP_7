import { useState, useEffect } from "react";
import { isAdmin, getAuthenticatedUser } from "../../library/Identity/authentication.js";
import "./adminPage.css";

const AdminPage = ({ setActivePage }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const user = getAuthenticatedUser();
    setIsAuthorized(isAdmin(user));
  }, []);

  if (isAuthorized === null || !isAuthorized) {
    return (
      <main>
        <div className="admin-card">
          <h1>Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-card">
        <h1>Admin Dashboard</h1>
        <p>Welcome, admin. Please choose an action below:</p>
        <div className="admin-actions">
          <button onClick={() => setActivePage("manage-users")}>
            Manage Users
          </button>
          <button onClick={() => setActivePage("hidden-products")}>
            View Hidden Products
          </button>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
