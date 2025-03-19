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
      <div className="bg-[#0D1321] min-h-screen">
        <AppNavbar />
        <div className="pt-20">
          <Menu />
        </div>
      </div>
    ),
    errorElement: <h1 className="text-center text-2xl text-red-500 pt-20">Page Not Found 404</h1>,
  },
  {
    path: "/create",
    element: (
      <div className="bg-[#0D1321] min-h-screen">
        <AppNavbar />
        <div className="pt-20 flex justify-center">
          <Create />
        </div>
      </div>
    ),
  },
  {
    path: "/signup",
    element: <RegisterForm />,
    errorElement: <h1 className="text-center text-2xl text-red-500">Page Not Found 404</h1>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/learn",
    element: (
      <div className="bg-[#0D1321] min-h-screen">
        <AppNavbar />
        <div className="pt-20">
          <Card />
        </div>
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
