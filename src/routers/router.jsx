import {
    createBrowserRouter,
  } from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/orders",
          element: <PrivateRoute><OrderPage></OrderPage></PrivateRoute>,
        },
        {
          path: "/about",
          element: <div>About</div>,
        },
        {
          path:"/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/cart",
          element: <CartPage/>,
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>,
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path:"/admin",
          element: <AdminLogin/>
        },
        {
          path: "/dashboard",
          element: <AdminRoute><DashboardLayout/></AdminRoute>,
          childern: [
            {
              path: "",
              element: <AdminRoute><div>Dashboard Home</div></AdminRoute>
            },
            {
              path: "add-new-book",
              element: <AdminRoute><div>Add New Book</div></AdminRoute>
            },
            {
              path: "edit-book/:id",
              element: <AdminRoute><div>Edit Book</div></AdminRoute>
            },
            {
              path: "manage-book",
              element: <AdminRoute><ManageBooks/></AdminRoute>
            },
          ]
        }
      ]
    },
  ]);


  export default router;