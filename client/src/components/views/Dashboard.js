import { Fragment, useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SinglePost from "../posts/SinglePost";
import AddPostModel from "../posts/AddPostModel";
import addIcon from "../../assets/plus-circle-fill.svg";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UpdatePostModal from "../posts/UpdatePostModal";
function Dashboard() {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, post, isPostLoading },
    getPost,
    showModalAddPost,
    setShowModalAddPost,
    setShowToast,
    showToast: { type, message, show },
  } = useContext(PostContext);

  console.log("kk", posts.length);
  //Call get post
  useEffect(() => {
    getPost();
  }, []);

  let body;
  if (isPostLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <Fragment>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username} </Card.Header>
          <Card.Body>
            <Card.Title>Welcom to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="info" onClick={() => setShowModalAddPost(true)}>
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </Fragment>
    );
  } else {
    body = (
      <Fragment>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>
        {/* Open modal edit post */}

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowModalAddPost(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {body}
      <AddPostModel />
      {post !== null && <UpdatePostModal />}
      {/* After add post */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ type: null, message: "", show: false })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </Fragment>
  );
}

export default Dashboard;
