import { createBrowserRouter } from "react-router-dom";
import {Home} from '../pages/Home';
import {EmployeeList} from '../pages/EmployeeList';
import {NotFound} from "../pages/NotFound";
import {Layout} from '../Layout/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/communaute",
        element: <EmployeeList />,
      },
    ],
  },
]);

export {router};