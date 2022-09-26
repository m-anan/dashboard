import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MainMenu = () => {
  return (
    <Nav variant="pills" defaultActiveKey="/dashboard" className="flex-column">
      <Nav.Link href="/home">
        <FontAwesomeIcon icon={faHouse} className="me-2" /> Home
      </Nav.Link>
      <Nav.Link eventKey="/dashboard">
        <FontAwesomeIcon icon={faAreaChart} className="me-2" />
        Dashboard
      </Nav.Link>
      <Nav.Link eventKey="/projects">
        <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
        Projects
      </Nav.Link>
      <Nav.Link eventKey="/tasks">
        <FontAwesomeIcon icon={faTasks} className="me-2" />
        Tasks
      </Nav.Link>
      <Nav.Link eventKey="/reporting">
        <FontAwesomeIcon icon={faPieChart} className="me-2" />
        Reporting
      </Nav.Link>
      <Nav.Link eventKey="/users">
        <FontAwesomeIcon icon={faUser} className="me-2" />
        Users
      </Nav.Link>
    </Nav>
  );
};
export default MainMenu;
