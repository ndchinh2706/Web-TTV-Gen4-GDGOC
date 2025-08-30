import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Form from "@/pages/Form";
import ChatBot from "@/pages/ChatBot";
import NotFound from "@/pages/404";
import FormSpare from "@/pages/FormSpare";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
  {
    path: "/form-spare",
    element: <FormSpare />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);
