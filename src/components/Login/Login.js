import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";
import { Modal } from "react-bootstrap";

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

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authctx = useContext(AuthContext);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const checkEmail = (serverUsers, formData) => {
    let user = serverUsers.find(
      (user) =>
        user.email === formData.target.email.value &&
        user.password === formData.target.password.value
    );
    if (user) authctx.onLogin(emailState.value, passwordState.value);
    else setShow(true);
  };
  const submitHandler = async (formData) => {
    formData.preventDefault();
    if (formIsValid) {
      await axios
        .get("https://dashboard-affae-default-rtdb.firebaseio.com/admins.json")
        .then((res) => {
          checkEmail(res.data, formData);
        })
        .catch((e) => {
          alert(e);
        });
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check your email and passsword</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
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
            <Button type="submit" className={classes.btn}>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
