import { Row, Col, Card } from "react-bootstrap";
import classes from "./UserCard.module.css";
const UserCard = () => {
  return (
    <Card className={classes.card}>
      <Row>
        <Col xs={2} lg="3">
          <img alt="avatar" src="https://reqres.in/img/faces/7-image.jpg"></img>
        </Col>
        <Col xs={8} lg="8">
          <p className={classes.user}>Mohamad Anan</p>
          <p className={classes.user_name}>@Anan</p>
        </Col>
      </Row>
    </Card>
  );
};
export default UserCard;
