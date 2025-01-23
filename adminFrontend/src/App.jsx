import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./BlogCard";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
    if (t) {
      setToken(t);
    }
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((response) => response.json())
      .then((res) => setBlogs(res))
      .catch((error) => console.error(error));
  }, [triggerReload]);
  console.log(user);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  }

  function del() {
    setTriggerReload((prev) => !prev);
  }
  if (token && user) {
    return (
      <div>
        <h1>Hello from the ADMIN page</h1>
        <h1>You are logged in, hi {user.user_name}</h1>
        <h2>Here you can edit, delate and add new posts</h2>

        <button onClick={handleLogout}>Logout</button>

        <p>Here are all the blogs</p>
        <br />
        <Link to={"/new-blog"}>Add new blog</Link>
        <br />
        {blogs.map((blog) => (
          <Card key={blog.id} blogData={blog} onDelete={del} token={token} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hello from the ADMIN page</h1>
        <h2>Here you can edit, delate and add new posts</h2>

        <Link to={"/log-in"}>
          <button>log in</button>
        </Link>

        <p>log in to se blohs</p>
      </div>
    );
  }
};

export default App;
