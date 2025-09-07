import AdminLayout from "@/components/layout/AdminLayout";
import Layout from "@/components/layout/Layout";
import type { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import ControlPanel from "@/pages/admin/ControlPanel";
import ParkingStateReport from "@/pages/admin/ParkingStateReport";
import Gates from "@/pages/employee/Gates";
import Checkpoint from "@/pages/employee/Checkpoint";
import Zones from "@/pages/employee/Zones";
import Employee from "./pages/admin/Employee";
import NotFound from "./pages/NotFound";

const routes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      { index: true, element: <ControlPanel /> },
      { path: "employees", element: <Employee /> },
      { path: "parking-state-report", element: <ParkingStateReport /> },
    ],
    element: <AdminLayout />,
  },

  {
    path: "/",
    children: [
      { index: true, element: <Gates /> },
      {
        path: 'gates',
        // element: <Gates />,
        children: [
          { path: ':id', element: <Zones /> }
        ],
      },
      {
        path: '/checkpoint',
        element: <Checkpoint />,
      }
    ],
    element: <Layout />,
  },
  { path: '/login', element: <Login /> },
  {
    path: "*",
    element: <NotFound />
  }
];


export default routes