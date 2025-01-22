import { Link } from "react-router-dom";

const Card = ({ blogData, onDelete, token }) => {
  const deletePost = (postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "delete",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          onDelete();
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h3>{blogData.title}</h3>
      <p>{blogData.created_at}</p>
      <Link to={`post/${blogData.id}`}>Update blog</Link>
      <button onClick={() => deletePost(blogData.id)}>Delete</button>
    </div>
  );
};

export default Card;
