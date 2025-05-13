import React, { useState } from "react";
import styles from "./settingsMenu.module.css";

import ProfileSettings from "./profile/ProfileSettings";
import FavoriteFlights from "./favoriteFlights/FavoriteFlights";
import PurchasedFlights from "./purchases/Purchases";

const SettingsMenu = ({user}) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "favorites":
        return <FavoriteFlights />;
      case "purchased":
        return <PurchasedFlights user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.settingsMenu}>
      <div className={styles.sidebar}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "profile" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Settings
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "favorites" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorite Flights
        </button>

        {user && (
          <button
            className={`${styles.tabButton} ${
              activeTab === "purchased" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("purchased")}
          >
            Purchased Flights
          </button>
        )}
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default SettingsMenu;
