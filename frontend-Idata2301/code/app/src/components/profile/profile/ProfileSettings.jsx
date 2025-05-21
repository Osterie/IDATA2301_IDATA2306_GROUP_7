import { useEffect, useState } from "react";
import styles from "./profileSettings.module.css";
import { getProfileCookies } from "../../../utils/profileUtils";
import { deleteSelf } from "../../../library/Identity/users";

const ProfileSettings = ({ user }) => {
  const [profilePrefs, setProfilePrefs] = useState(null);

  useEffect(() => {
    const prefs = getProfileCookies();
    setProfilePrefs(prefs);
  }, []);

  const handleDeleteSelf = async () => {
    try {
      await deleteSelf();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className={styles["profile-settings"]}>
      <header>
        <h2>Profile Settings</h2>
        {user ? (
          <p>Manage your personal information here.</p>
        ) : (
          <p>Please log in to see your profile information.</p>
        )}
        <br />
      </header>

      {user && (
        <>
          <section
            aria-labelledby="profile-info-heading"
            className={styles.section}
          >
            <h3 id="profile-info-heading">Profile Information</h3>
            <table className={styles["profile-table"]}>
              <tbody>
                <tr>
                  <th scope="row">Username</th>
                  <td>{user.username || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email || profilePrefs?.current_email || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">User ID</th>
                  <td>{user.id || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Roles</th>
                  <td>{user.roles?.join(", ") || "USER"}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      <section
        aria-labelledby="location-pref-heading"
        className={styles.section}
      >
        <h3 id="location-pref-heading">Location & Preferences</h3>
        <dl className={styles["definition-list"]}>
          <div>
            <dt>Country</dt>
            <dd>{profilePrefs?.country || "N/A"}</dd>
          </div>
          <div>
            <dt>Departure Airport</dt>
            <dd>{profilePrefs?.departur_airport || "N/A"}</dd>
          </div>
          <div>
            <dt>Preferred Currency</dt>
            <dd>{profilePrefs?.preferred_currency || "N/A"}</dd>
          </div>
        </dl>
      </section>

      {user && (
        <section
          aria-labelledby="danger-zone-heading"
          className={`${styles.section} ${styles["danger-zone"]}`}
        >
          <h3 id="danger-zone-heading">Danger Zone</h3>
          <p>
            Deleting your account is irreversible. Please proceed with caution.
          </p>
          <button
            type="button"
            className={styles["delete-button"]}
            onClick={handleDeleteSelf}
          >
            Delete Account
          </button>
        </section>
      )}
    </section>
  );
};

export default ProfileSettings;
