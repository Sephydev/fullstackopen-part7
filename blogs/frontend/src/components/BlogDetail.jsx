import { useDispatch } from "react-redux";
import {
  incrementLikes,
  removeBlog,
  addComment,
} from "../reducers/blogsReducer";
import { useNavigate } from "react-router";
import { useState } from "react";

const BlogDetail = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVote = async () => {
    dispatch(incrementLikes(blog.id));
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    console.log(comment);
    e.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleVote}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button onClick={handleDelete}>delete</button>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleComment} value={comment} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogDetail;
