import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Blog = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [text, setCommentTxt] = useState("");
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
    fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
      .then((response) => response.json())
      .then((res) => {
        setBlog(res);
        setComments(res.comments || []);
        setNumOfLikes(res.num_of_likes);
      })
      .catch((error) => console.error(error));
  }, [triggerReload]);

  const handleLike = (event) => {
    event.preventDefault();
    if (token) {
      const userID = user.id;
      console.log(userID);

      fetch(`http://localhost:3000/posts/like/${postId}`, {
        method: "post",

        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ userID }),
      })
        .then((response) => {
          if (!response.ok) {
            alert("Invalid credentials");
            throw new Error("Invalid credentials");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setNumOfLikes(data.num_of_likes);
          } else {
            throw new Error("Login failed: no token provided");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("log in first");
      navigate("/log-in");
    }
  };

  const hadleCommentAdd = (event) => {
    event.preventDefault();

    if (token) {
      const userID = user.id;
      const forBody = { text, userID };

      fetch(`http://localhost:3000/posts/comment/${postId}`, {
        method: "post",

        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(forBody),
      })
        .then((response) => {
          if (!response.ok) {
            alert("Invalid credentials");
            //navigate("/log-in");
            throw new Error("Invalid credentials");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setCommentTxt("");
            setTriggerReload((prev) => !prev);
          } else {
            throw new Error("Login failed: no token provided");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("log in first");
      navigate("/log-in");
    }
  };

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

  if (blog) {
    return (
      <div>
        <h1>Here is specific blog!</h1>
        <h2>{blog.title}</h2>
        <p>{blog.post_text}</p>
        <br />
        <br />
        <h4>{numOfLikes} likes</h4>
        <button onClick={handleLike}>like/unlike</button>
        <h3>Comments:</h3>
        <br />
        {/* <form onSubmit={hadleCommentAdd}>
          <textarea
            value={text}
            onChange={({ target }) => setCommentTxt(target.value)}
            placeholder="Your comment"
          ></textarea>
          <button type="submit"> Submit</button>
        </form> */}
        {comments.map((comment) => (
          <div key={comment.id}>
            <br />
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
