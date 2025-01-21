import App from "./App";
import Blog from "./SingleBlog";
import ErrorPage from "./ErrorPage";
import LogIn from "./auth/Log-in";
import SignIn from "./auth/Sign-in";

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
    path: "/sign-in",
    element: <SignIn />,
  },
];

export default routes;
