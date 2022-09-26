import { Nav } from "react-bootstrap";
const DashboardMenu = () => {
  return (
    <Nav variant="tabs" defaultActiveKey="/overview">
      <Nav.Link eventKey="link-0">Overview</Nav.Link>
      <Nav.Link eventKey="link-1">table</Nav.Link>
      <Nav.Link eventKey="link-2">List view</Nav.Link>
      <Nav.Link eventKey="link-3">Segment</Nav.Link>
      <Nav.Link eventKey="link-4">Custom</Nav.Link>
    </Nav>
  );
};
export default DashboardMenu;
