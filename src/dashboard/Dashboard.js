import { Fragment } from "react";
import LeftBanner from "../components/dashborad_components/LeftBanner";
import { Col, Row } from "react-bootstrap";
import Header from "../components/dashborad_components/Header/Header";
import CounterCards from "../components/dashborad_components/CounterCard/CounterCards";
import TableUsers from "../components/dashborad_components/TableUsers";

const Dashboard = () => {
  return (
    <Fragment>
      <Row>
        <Col md={2}>
          <LeftBanner></LeftBanner>
        </Col>
        <Col>
          <Header></Header>
          <CounterCards></CounterCards>
          <TableUsers />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Dashboard;
