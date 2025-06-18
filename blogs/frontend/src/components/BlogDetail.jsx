import { useDispatch } from "react-redux";
import { incrementLikes, removeBlog } from "../reducers/blogsReducer";
import { useNavigate } from "react-router";

const BlogDetail = ({ blog }) => {
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

  if (!blog) {
    return null;
  }
  console.log(blog);
  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleVote}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button onClick={handleDelete}>delete</button>
    </>
  );
};

export default BlogDetail;
