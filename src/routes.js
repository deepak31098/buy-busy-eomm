import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/home";
import SignUp from "./pages/sign-up";
import NavBar from "./components/navbar";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import Order from "./pages/order";

// router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {index: true, element: <Products />},
      {path: "/login", element: <Login />},
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Order />,
      },
    ],
  },
]);
