import { useState } from "react";
import styles from "../components/profile/profilePage.module.css";

import ProfileSettings from "../components/profile/profile/ProfileSettings";
import FavoriteFlights from "../components/profile/favoriteFlights/FavoriteFlights";
import PurchasedFlights from "../components/profile/purchases/Purchases";

const ProfilePage = ({ user, setSelectedFlight, setActivePage }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings user={user} />;
      case "favorites":
        return <FavoriteFlights user={user} setSelectedFlight={setSelectedFlight} setActivePage={setActivePage} />;
      case "purchased":
        return <PurchasedFlights user={user} setSelectedFlight={setSelectedFlight} setActivePage={setActivePage} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.profilePage}>
      <div className={styles.sidebar}>
        <button
          className={`${styles.tabButton} ${activeTab === "profile" ? styles.activeTab : ""
            }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Settings
        </button>

        {user && (
          <button
            className={`${styles.tabButton} ${activeTab === "favorites" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorite Flights
          </button>
        )}


        {user && (
          <button
            className={`${styles.tabButton} ${activeTab === "purchased" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("purchased")}
          >
            Purchased Flights
          </button>
        )}
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </section>
  );
};

export default ProfilePage;
