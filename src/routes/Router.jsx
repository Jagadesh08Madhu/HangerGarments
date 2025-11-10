import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ProductDetails from "../pages/ProductDetails";
import AdminProduct from "../components/Dashboard/AdminProduct";
import Dashboard from "../components/Dashboard/Dashboard";
import AddProduct from "../components/Dashboard/AddProduct";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/about-us",
                element:<Aboutus />
            },
            {
                path:"/shop",
                element:<Shop />
            },
            {
                path:"/shop/:category",
                element:<Shop />
            },
            {
                path:"/contact",
                element:<Contact />
            },
            {
                path:"/product-details",
                element:<ProductDetails />
            },

            // Authenticated
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Signup />
            },

            // Dashboard
            {
                path:"/admin",
                element:<Dashboard />
            },
            {
                path:"/admin/product",
                element:<AdminProduct />
            },
            {
                path:"/admin/add-product",
                element:<AddProduct />
            },
        ]
    }
])