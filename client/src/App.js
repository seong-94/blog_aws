import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Single from "./components/Single";
import Write from "./components/Write";
import Write2 from "./components/Write2";

import "./style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Outlet />
        <Home />
      </>
    ),
  },
  {
    path: "/post/:id",
    element: <Single />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/write2",
    element: <Write2 />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
