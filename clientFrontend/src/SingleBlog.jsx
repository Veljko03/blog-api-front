import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Blog = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`, { mode: "cors" })
      .then((response) => response.json())
      .then((res) => setBlog(res))
      .catch((error) => console.error(error));
  }, []);
  console.log(blog);
  console.log(blog);

  if (blog) {
    return (
      <div>
        <h1>Hello from a blog page!</h1>
        <h2>{blog.title}</h2>
        <p>{blog.post_text}</p>
        <br />
        <br />

        <h3>Comments:</h3>
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
