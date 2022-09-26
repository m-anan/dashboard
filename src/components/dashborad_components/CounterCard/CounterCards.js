import CounterCardItem from "../CounterCardItem/CounterCardItem";
import IncreaseRatio from "../../increase ratio/IncreaseRatio";
import ActiveUsers from "../ActivateUsers/ActivateUsers";
import { Row, Col, Container } from "react-bootstrap";
const CounterCards = () => {
  return (
    <Container className="px-4">
      <Row>
        <Col md sm={12}>
          <CounterCardItem title={"Total customers"} count={200}>
            <IncreaseRatio>20</IncreaseRatio>
          </CounterCardItem>
        </Col>
        <Col md sm={12}>
          <CounterCardItem title={"Members"} count={250}>
            <IncreaseRatio>12</IncreaseRatio>
          </CounterCardItem>
        </Col>
        <Col md sm={12}>
          <CounterCardItem title={"Active now"} count={400}>
            <ActiveUsers />
          </CounterCardItem>
        </Col>
      </Row>
    </Container>
  );
};
export default CounterCards;
