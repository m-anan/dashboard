import classes from "./UserItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const UserItem = (props) => {
  const [editMode, setEdaitMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [firstNameValue, setFirstNameValue] = useState(props.item.first_name);
  const [lastNameValue, setLastNameValue] = useState(props.item.last_name);
  const [emailValue, setEmailValue] = useState(props.item.email);

  let firstName, lastName, email;
  if (editMode) {
    firstName = (
      <input
        type="text"
        value={firstNameValue}
        onChange={(e) => setFirstNameValue(e.target.value)}
        name="first_name"
      ></input>
    );
    lastName = (
      <input
        type="text"
        onChange={(e) => setLastNameValue(e.target.value)}
        value={lastNameValue}
        name="last_name"
      ></input>
    );
    email = (
      <div>
        <input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          name="email"
        ></input>
      </div>
    );
  } else {
    firstName = <p>{props.item.first_name}</p>;
    lastName = <p>{props.item.last_name}</p>;
    email = <p>{props.item.email}</p>;
  }

  return (
    <tr className={classes.user}>
      <td></td>
      <td>
        <img alt="avatar" src={props.item.avatar}></img>
      </td>
      <td className={classes.text}>{firstName}</td>
      <td className={classes.text}>{lastName}</td>
      <td className={classes.text}>{email}</td>
      <td>
        {editMode ? (
          <>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faCheck}
              onClick={() =>
                props.userEditHandler(props.item.id, {
                  first_name: firstNameValue,
                  last_name: lastNameValue,
                  email: emailValue,
                  avatar: props.item.avatar,
                })
              }
            />
            <FontAwesomeIcon
              className={classes.icon}
              icon={faX}
              onClick={() => setEdaitMode(false)}
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faEdit}
              onClick={() => setEdaitMode(true)}
            />
            {deleteMode ? (
              <>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faCheck}
                  onClick={() => props.userRemoveHandler(props.item.id)}
                />
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faX}
                  onClick={() => setDeleteMode(false)}
                />
              </>
            ) : (
              <FontAwesomeIcon
                className={classes.icon}
                icon={faTrash}
                onClick={() => setDeleteMode(true)}
              />
            )}
          </>
        )}
      </td>
    </tr>
  );
};
export default UserItem;
