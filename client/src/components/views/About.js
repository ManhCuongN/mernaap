import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function About() {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button variant="primary" href="#" size="lg">
          Visit my website for more{" "}
        </Button>
      </Col>
    </Row>
  );
}

export default About;
