import { createBrowserRouter } from "react-router";
import { Home, Login, SignUp } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
