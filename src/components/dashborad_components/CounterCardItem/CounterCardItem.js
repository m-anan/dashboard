import { Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import classes from "./CounterCardItem.module.css";
const CounterCardItem = (props) => {
  return (
    <Card className={classes.card}>
      <Container>
        <Row>
          <Col xs="6" md={6}>
            <h5>{props.title}</h5>
            <p className={classes.number}>{props.count}</p>
          </Col>
          <Col xs="6" md={6} className={classes.rightC}>
            <div>
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
            {props.children}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
export default CounterCardItem;
