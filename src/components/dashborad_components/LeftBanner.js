import MainMenu from "./menus/MainMenu";
import classes from "./LeftBanner.module.css";
import MoreMenu from "./menus/MoreMenu";
import UserCard from "../UserCard";
import { Navbar } from "react-bootstrap";
const LeftBanner = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className={classes.banner}>
          <div>
            <h1>Dashboard UI</h1>
            <MainMenu></MainMenu>
          </div>
          <div>
            <MoreMenu></MoreMenu>
            <UserCard></UserCard>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default LeftBanner;
