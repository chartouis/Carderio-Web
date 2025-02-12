import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import Card from "./components/CardPlace.tsx";
import Create from "./components/Create.tsx";
import AppNavbar from "./components/AppNavBar.tsx";
import Wrapper from "./components/BgWrap.tsx";
import Menu from "./components/Menu.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <AppNavbar />
        <Menu />
      </div>
    ),
    errorElement: <h1>Page Not Found 404</h1>,
  },
  {
    path: "/create",
    element: (
      <div>
        <AppNavbar />
        <Create />
      </div>
    ),
  },
  {
    path: "/signup",
    element: <RegisterForm />,
    errorElement: <h1>TI SHO DAUN, SILKA HUINYA</h1>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/learn",
    element: (
      <div>
        <AppNavbar />
        <Card />
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </StrictMode>
);
