import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Blog = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  //const [text, setCommentTxt] = useState("");
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.post_text);
    }
    fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
      .then((response) => response.json())
      .then((res) => {
        setBlog(res);
        setComments(res.comments || []);
        setTriggerReload((prev) => !prev);

        //setNumOfLikes(res.num_of_likes);
      })
      .catch((error) => console.error(error));
  }, [triggerReload]);

  const handleDeleteComment = (commentID) => {
    const userID = user.id;
    const forBody = { commentID, userID };
    fetch(`http://localhost:3000/posts/comment/${postId}`, {
      method: "delete",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(forBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setComments(data);
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (event) => {
    event.preventDefault();

    const forBody = { title, content };
    console.log(forBody);

    fetch(`http://localhost:3000/posts/${blog.id}`, {
      method: "put",

      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(forBody),
    })
      .then((response) => {
        if (!response.ok) {
          //alert("Invalid credentials");
          throw new Error("Invalid credentials", response);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          alert("post updated");
          navigate("/");
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };

  if (blog) {
    return (
      <div>
        <h1>Here is specific blog!</h1>
        <h1>You can edit it here</h1>
        <form onSubmit={handleEdit}>
          <h2>Title:</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2>Content:</h2>
          <textarea
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <button type="submit">Save changes</button>
        </form>

        <br />
        <h3>Comments:</h3>

        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.comment_text}
            {comment.user_id == user?.id && (
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            )}
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h1>Cant fetch item</h1>
      </>
    );
  }
};

export default Blog;
