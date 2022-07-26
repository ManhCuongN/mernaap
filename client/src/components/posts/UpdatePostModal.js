import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

function UpdatePostModal() {
  const {
    postState: { post },
    showModalUpdatePost,
    setShowModalUpdatePost,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);
  const { title, description, url, status } = updatedPost;
  const onChangeUpdatedPostForm = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };
  const closeDialog = () => {
    setUpdatedPost(post);
    setShowModalUpdatePost(false);
  };

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { status, message } = await updatePost(updatedPost);
    setShowModalUpdatePost(false);
    setShowToast({ show: true, message, type: status ? "success" : "danger" });
  };

  return (
    <Modal show={showModalUpdatePost} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
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

export default UpdatePostModal;
