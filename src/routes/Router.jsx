import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import Shop from "../pages/Shop";

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
            }
        ]
    }
])