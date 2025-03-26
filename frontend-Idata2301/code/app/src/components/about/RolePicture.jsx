import React from "react";
import "./rolePicture.css";

const RolePicture = ({ image, title, name, role }) => {
  return (
    <div className="role-picture">
      <img src={image} alt={name} className="profile-image" />
      <h3 className="title">{title}</h3>
      <p className="name">{name}</p>
      <p className="role">{role}</p>
    </div>
  );
};

export default RolePicture;
