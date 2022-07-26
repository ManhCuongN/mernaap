import { createContext, useReducer, useEffect, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    isPostLoading: true,
    post: null,
  });

  const [showToast, setShowToast] = useState({
    type: null,
    message: "",
    show: false,
  });

  //Show modal
  const [showModalAddPost, setShowModalAddPost] = useState(false);
  const [showModalUpdatePost, setShowModalUpdatePost] = useState(false);

  //Call post
  const getPost = async () => {
    try {
      const response = await axios.get(`${apiURL}/post/get`);
      if (response.data.status) {
        dispatch({ type: "POST_LOADED_SUCCESS", payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: "POST_LOADED_FAILED" });
    }
  };

  //ADD POST
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiURL}/post/create`, newPost);
      if (response.status) {
        dispatch({ type: "ADD_POST", payload: response.data.post });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { status: false, message: error.message };
    }
  };

  //DELETE POST
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiURL}/post/${postId}`);
      if (response.status) {
        dispatch({ type: "DELETE_POST", payload: postId });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //Update Post
  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiURL}/post/${updatePost._id}`,
        updatePost
      );
      if (response.status) {
        dispatch({ type: "UPDATE_POST", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { status: false, message: error.message };
    }
  };

  //FIND POST
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: "FIND_POST", payload: post });
  };

  //Context Data
  const postContextData = {
    postState,
    getPost,
    showModalAddPost,
    setShowModalAddPost,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showModalUpdatePost,
    setShowModalUpdatePost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
