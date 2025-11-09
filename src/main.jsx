import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import "./index.css";

// 🧩 Redux imports
import { Provider } from "react-redux";
import store from "./redux/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ Redux now wraps your entire app */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
