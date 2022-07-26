import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
function AddPostModel() {
  const { showModalAddPost, setShowModalAddPost, addPost, setShowToast } =
    useContext(PostContext);

  //New Post
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const onCloseDialog = () => {
    setNewPost(false);
    setShowModalAddPost(false);
  };
  const { title, description, url } = newPost;
  const onChangeAddPost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await addPost(newPost);
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowModalAddPost(false);
    setShowToast({ type: status ? "success" : "danger", message, show: true });
  };

  return (
    <Modal show={showModalAddPost} onHide={onCloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChangeAddPost}
              required
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={onChangeAddPost}
              placeholder="Description"
              name="description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeAddPost}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPostModel;
