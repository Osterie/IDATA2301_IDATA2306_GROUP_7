import RolePicture from "./RolePicture";
import "./roleContainer.css";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";

const RoleContainer = () => {
  return (
    <section className="role-container" aria-labelledby="leadership-team-heading">
      <h2 id="leadership-team-heading">Leadership Team</h2>
      <ul className="role-list">
        <li>
          <RolePicture
            image={image1}
            title="CEO"
            name="Richie Profits"
            role="Chief Executive Officer"
          />
        </li>
        <li>
          <RolePicture
            image={image2}
            title="CTO"
            name="Larry Loophole"
            role="Chief Technology Officer"
          />
        </li>
        <li>
          <RolePicture
            image={image3}
            title="CFO"
            name="Danny Fraud"
            role="Chief Financial Officer"
          />
        </li>
      </ul>
    </section>
  );
};

export default RoleContainer;
