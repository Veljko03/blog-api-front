import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./BlogCard";
import { useAuth } from "./AuthContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  console.log(user);

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
  }, []);
  console.log(user);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  }
  if (token && user) {
    return (
      <div>
        <h1>Hello from the main page of the app!</h1>
        <h1>You are logged in, hi {user.user_name}</h1>
        <button onClick={handleLogout}>Logout</button>
        <p>Here are all the blogs</p>
        {blogs.map((blog) => (
          <Card key={blog.id} blogData={blog} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hello from the main page of the app!</h1>

        <Link to={"/log-in"}>
          <button>log in</button>
        </Link>

        <Link to={"/sign-in"}>
          <button>sign in</button>
        </Link>
        <p>Here are all the blogs</p>
        {blogs.map((blog) => (
          <Card key={blog.id} blogData={blog} />
        ))}
      </div>
    );
  }
};

export default App;
