import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import AlertMess from "../../components/layouts/AlertMess";

import { Link } from "react-router-dom";
function LoginForm() {
  const [alert, setAlert] = useState(null);
  //COntextS
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.status) {
        // history("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Form className="my-4" onSubmit={login}>
        <AlertMess info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
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
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <br></br>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>Don't have an account</p>
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-2">
          Register
        </Button>
      </Link>
    </Fragment>
  );
}

export default LoginForm;
