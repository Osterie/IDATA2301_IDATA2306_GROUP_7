import { useState, useEffect } from "react";
import { isAdmin, getAuthenticatedUser } from "../../library/Identity/authentication.js";

const AdminPage = ({ setActivePage }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const user = getAuthenticatedUser();
    setIsAuthorized(isAdmin(user));
  }, []);

  if (isAuthorized === null || !isAuthorized) {
    console.log("User is not authorized to view this page.");
    return (
      <main>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  console.log("User is authorized to view this page.");
  return (
    <main>
      <h1>Admin Page</h1>
      <button onClick={() => setActivePage("manage-users")}>
        Manage Users
      </button>
      <button onClick={() => setActivePage("hidden-products")}>
        View hidden products
      </button>
    </main>
  );
};

export default AdminPage;
