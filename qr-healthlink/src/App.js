import "./App.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";

const router = createHashRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/a",
    element: <Page1 />,
  },
  {
    path: "/b",
    element: <Page2 />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
