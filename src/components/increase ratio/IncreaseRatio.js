import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import classes from "./IncreaseRatio.module.css"
const IncreaseRatio = (props) => {
  return <div className={classes.percentage}><FontAwesomeIcon icon={faArrowUpLong}/> {props.children}%</div>;
};
export default IncreaseRatio;
