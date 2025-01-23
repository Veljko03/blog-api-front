import App from "./App";
import Blog from "./SingleBlog";
import ErrorPage from "./ErrorPage";
import LogIn from "./auth/Log-in";
import AddBlog from "./AddBlog";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "post/:postId",
    element: <Blog />,
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/new-blog",
    element: <AddBlog />,
  },
];

export default routes;
