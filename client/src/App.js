import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Single from "./components/Single";
import "./style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <NavBar />
      </>
    ),
  },
  {
    path: "/post/:id",
    element: <Single />,
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
