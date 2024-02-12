import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { Context, ContextProvider } from "./Context/Context";
import { ChatContextProvider } from "./Context/chatContext";

const Main = () => {
  const { user } = useContext(Context);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Chat /> : <Login />,
        },
        {
          path: "/register",
          element: user ? <Chat /> : <Register />,
        },
        {
          path: "/login",
          element: user ? <Chat /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <Main />
  </ContextProvider>
);

reportWebVitals();
