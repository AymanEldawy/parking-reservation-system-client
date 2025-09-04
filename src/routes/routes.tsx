import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import type { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import ControlPanel from "@/pages/admin/ControlPanel";
import Subscriptions from "@/pages/admin/Subscriptions";
import ParkingStateReport from "@/pages/admin/ParkingStateReport";
import Gates from "@/pages/employee/Gates";
import SingleGate from "@/pages/employee/SingleGate";
import Checkpoint from "@/pages/employee/Checkpoint";

const routes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      { index: true, element: <ControlPanel /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "parking-state-report", element: <ParkingStateReport /> },
    ],
    element: <AdminLayout />,
  },

  {
    path: "/",
    children: [
      {
        path: 'gates',
        // element: <Gates />,
        children: [
          { index: true, element: <Gates /> },
          { path: ':id', element: <SingleGate /> }
        ],
      },
      {
        path: '/checkpoint',
        element: <Checkpoint />,
      }
    ],
    element: <EmployeeLayout />,
  },
  {
    path: "/",
    children: [
      { path: '/login', element: <Login /> },
    ],
    element: <EmployeeLayout />,
  },
];


export default routes