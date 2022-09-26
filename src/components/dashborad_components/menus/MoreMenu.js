import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

const MoreMenu = () => {
  return (
    <Nav variant="pills" className="flex-column">
      <Nav.Link eventKey="/noticications">
        <FontAwesomeIcon icon={faBell} className="me-2" />
        Noticications
      </Nav.Link>
      <Nav.Link eventKey="/supports">
        <FontAwesomeIcon icon={faCircleQuestion} className="me-2" />
        Supports
      </Nav.Link>
      <Nav.Link eventKey="/sittings">
        <FontAwesomeIcon icon={faSlidersH} className="me-2" />
        Settings
      </Nav.Link>
    </Nav>
  );
};
export default MoreMenu;
