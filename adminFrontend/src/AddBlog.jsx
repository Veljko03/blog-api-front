import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

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

  const handleAddingBlog = (event) => {
    event.preventDefault();
    const userID = user.id;
    const forBody = { title, content, userID };

    fetch(`http://localhost:3000/posts`, {
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
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          alert("post added");
          navigate("/");
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Here you can add new post</h1>
      <h3>Title:</h3>
      <form onSubmit={handleAddingBlog}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <br />
        <h3>Blog content:</h3>
        <br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)}>
          Content:
        </textarea>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
