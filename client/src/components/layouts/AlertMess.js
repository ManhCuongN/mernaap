import Alert from "react-bootstrap/Alert";

function AlertMess({ info }) {
  return info === null ? null : <Alert>{info.message}</Alert>;
}

export default AlertMess;
