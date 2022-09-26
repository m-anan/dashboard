import faker from "faker";
import classes from "./ActivateUsers.module.css";
const ActiveUsers = () => {
  return (
    <div className={classes.avatar}>
      <img alt="user" src={faker.image.business(200, 200)} width={40} />
      <img alt="user" src={faker.image.business(220, 220)} width={40} />
      <img alt="user" src={faker.image.business(150, 150)} width={40} />
      <img alt="user" src={faker.image.business(165, 165)} width={40} />
      <img alt="user" src={faker.image.business(150, 150)} width={40} />
    </div>
  );
};
export default ActiveUsers;
