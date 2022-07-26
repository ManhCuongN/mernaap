import { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import deleteIcon from "../../assets/trash.svg";
import editIcon from "../../assets/pencil.svg";
import { PostContext } from "../../contexts/PostContext";

function ActionButtons({ url, _id }) {
  const { deletePost, findPost, setShowModalUpdatePost } =
    useContext(PostContext);

  const onFindPost = (postId) => {
    findPost(postId);
    setShowModalUpdatePost(true);
  };

  const onDeletePost = async (_id) => {
    await deletePost(_id);
  };
  return (
    <Fragment>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>

      <Button className="post-button" onClick={() => onFindPost(_id)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>

      <Button className="post-button" onClick={() => onDeletePost(_id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </Fragment>
  );
}

export default ActionButtons;
