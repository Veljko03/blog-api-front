import App from "./App";
import Blog from "./SingleBlog";
import ErrorPage from "./ErrorPage";
import LogIn from "./auth/Log-in";

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
  // {
  //   path:"/sign-in",

  // }
];

export default routes;
