import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((response) => response.json())
      .then((res) => setBlogs(res))
      .catch((error) => console.error(error));
  }, []);
  console.log(blogs);

  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are all the blogs</p>
      {blogs.map((blog) => (
        <div key={blog.id}>Title: {blog.title}</div>
      ))}
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
