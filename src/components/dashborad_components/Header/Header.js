import { Row, Col, Modal, Button } from "react-bootstrap";
import classes from "./Header.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../../Store/auth-context";

import AddUser from "../AddUser/AddUser";
const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const ctx = useContext(AuthContext);

  return (
    <Row className={classes.header}>
      <Col xs={4}>
        <h2>Customers</h2>
      </Col>
      <Col style={{ textAlign: "right" }}>
        <button className={classes.button} onClick={() => setShow(!show)}>
          Add User
        </button>
        <button className={classes.logout} onClick={ctx.onLogout}>
          Logout
        </button>
      </Col>

      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser></AddUser>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};
export default Header;
