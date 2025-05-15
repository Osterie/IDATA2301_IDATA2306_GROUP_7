import React, { useEffect, useState } from "react";
import styles from "./profileSettings.module.css";
import { getProfileCookies } from "../../../utils/profileUtils";

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const profileData = getProfileCookies();
    setProfile(profileData);
  }, []);

  if (!profile) {
    return (
      <section className={styles["profile-settings"]}>
        <h2>Profile Settings</h2>
        <p>Loading profile...</p>
      </section>
    );
  }

  return (
    <section className={styles["profile-settings"]}>
      <header>
        <h2>Profile Settings</h2>
        <p>Manage your personal information here.</p>
        <br />
      </header>

      {/* Profile Info Section */}
      <section aria-labelledby="profile-info-heading" className={styles.section}>
        <h3 id="profile-info-heading">Profile Information</h3>
        <table className={styles["profile-table"]}>
          <tbody>
            <tr>
              <th scope="row">Username</th>
              <td>{profile.current_username || "N/A"}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{profile.current_email || "N/A"}</td>
            </tr>
            <tr>
              <th scope="row">User ID</th>
              <td>{profile.current_user_id || "N/A"}</td>
            </tr>
            <tr>
              <th scope="row">Roles</th>
              <td>{profile.current_user_roles?.join(", ") || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Location & Preferences Section */}
      <section aria-labelledby="location-pref-heading" className={styles.section}>
        <h3 id="location-pref-heading">Location & Preferences</h3>
        <dl className={styles["definition-list"]}>
          <div>
            <dt>Country</dt>
            <dd>{profile.country || "N/A"}</dd>
          </div>
          <div>
            <dt>Departure Airport</dt>
            <dd>{profile.departur_airport || "N/A"}</dd>
          </div>
          <div>
            <dt>Preferred Currency</dt>
            <dd>{profile.preferred_currency || "N/A"}</dd>
          </div>
        </dl>
      </section>

      {/* Danger Zone Section */}
      <section
        aria-labelledby="danger-zone-heading"
        className={`${styles.section} ${styles["danger-zone"]}`}
      >
        <h3 id="danger-zone-heading">Danger Zone</h3>
        <p>
          Deleting your account is irreversible. Please proceed with caution.
        </p>
        <button type="button" className={styles["delete-button"]}>
          Delete Account
        </button>
      </section>
    </section>
  );
};

export default ProfileSettings;
