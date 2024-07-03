import { Card } from "react-bootstrap";
import { FaTimes } from "react-icons/fa"; // Import the trash icon from react-icons
import "./LogoCard.css"; // Import your CSS file

const LogoCard = ({ logo, handleShow, handleUpdate }) => {
  const { _id, logoUrl, isSelected } = logo;
  return (
    <Card className="image-card">
      <div className="image-buttons">
        <label>
          <input
            checked={isSelected}
            onChange={(e) => handleUpdate(_id, e.target.checked)}
            type="checkbox"
          />
        </label>
      </div>
      <Card.Img variant="top" src={logoUrl} alt="Your Image" />
      <button onClick={() => handleShow(_id)} className="delete-button">
        <FaTimes size={30} />
      </button>
    </Card>
  );
};

export default LogoCard;
