import React from "react";
import RolePicture from "./RolePicture";
import "./roleContainer.css";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";

const RoleContainer = () => {
  return (
    <div className="role-container">
      <RolePicture image={image1} title="CEO" name="Richie Profits" role="Chief Executive Officer" />
      <RolePicture image={image2} title="CTO" name="Larry Loophole" role="Chief Technology Officer" />
      <RolePicture image={image3} title="CFO" name="Danny Fraud" role="Chief Financial Officer" />
    </div>
  );
};

export default RoleContainer;
