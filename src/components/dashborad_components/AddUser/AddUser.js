import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import Card from "../../UI/Card/Card";
import classes from "./AddUser.module.css";
import { Modal, Button } from "react-bootstrap";
import faker from "faker";
import Input from "../../UI/Input/Input";

const firstNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { value: "", isValid: false };
};
const lastNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const AddUser = (props) => {
  /*Popup state message*/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [formIsValid, setFormIsValid] = useState(false);
  const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
    value: "",
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const first_nameInputRef = useRef();
  const last_nameInputRef = useRef();
  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: first_nameIsValid } = firstNameState;
  const { isValid: last_nameIsValid } = firstNameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        emailIsValid && passwordIsValid && first_nameIsValid && last_nameIsValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, first_nameIsValid, last_nameIsValid]);
  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: "USER_INPUT", val: event.target.value });
  };
  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: "USER_INPUT", val: event.target.value });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: "INPUT_BLUR" });
  };

  const validateLastNameHandler = () => {
    dispatchFirstName({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (e) => {
    const User = {
      id: Math.random().toString(16).slice(-4),
      email: emailState.value,
      first_name: firstNameState.value,
      last_name: lastNameState.value,
      password: passwordState.value,
      avatar: faker.image.business(200, 200),
    };
    if (formIsValid) {
      await axios
        .post(
          "https://dashboard-affae-default-rtdb.firebaseio.com/users.json",
          User
        )
        .then((res) => {
          setTitle("Add user");
          setMessage("Add user success.");
          setShow(true);
        })
        .catch((e) => {
          setTitle("Error");
          setMessage(e);
          setShow(true);
        });
      window.location.reload();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else if (!first_nameIsValid) {
      first_nameInputRef.current.focus();
    } else {
      last_nameInputRef.current.focus();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className={classes.add}>
        <form onSubmit={submitHandler}>
          <Input
            ref={first_nameInputRef}
            id="first_name"
            label="First name"
            type="text"
            name="first_name"
            value={firstNameState.value}
            onChange={firstNameChangeHandler}
            onBlur={validateFirstNameHandler}
          />
          <Input
            ref={last_nameInputRef}
            id="last_name"
            label="Last name"
            type="text"
            name="last_name"
            value={lastNameState.value}
            onChange={lastNameChangeHandler}
            onBlur={validateLastNameHandler}
          />
          <Input
            ref={emailInputRef}
            id="email"
            label="E-Mail"
            type="email"
            name="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            name="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />

          <div className={classes.actions}>
            <button type="SUBMIT" className={classes.btn}>
              Add
            </button>
            {props.children}
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
