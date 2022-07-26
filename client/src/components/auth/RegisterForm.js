import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";

import AlertMess from "../layouts/AlertMess";
import { AuthContext } from "../../contexts/AuthContext.js";

function RegisterForm() {
  const { registerUser } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const register = () => {
    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password and Confirm Password must be the same",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }

    try {
      const registerData = registerUser(registerForm);
      if (!registerData.status) {
        setAlert({
          type: "danger",
          message: registerData.message,
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Form className="my-4" onSubmit={register}>
        <AlertMess info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={onChangeRegisterForm}
            value={username}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <br></br>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>You have already account</p>
      <Link to="/login">
        <Button variant="info" size="sm" className="ml-2">
          Login
        </Button>
      </Link>
    </Fragment>
  );
}

export default RegisterForm;
