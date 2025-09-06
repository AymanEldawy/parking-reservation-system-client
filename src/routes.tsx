import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import type { RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import ControlPanel from "@/pages/admin/ControlPanel";
import Subscriptions from "@/pages/admin/Subscriptions";
import ParkingStateReport from "@/pages/admin/ParkingStateReport";
import Gates from "@/pages/employee/Gates";
import Checkpoint from "@/pages/employee/Checkpoint";
import Zones from "@/pages/employee/Zones";

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
    element: <EmployeeLayout />,
  },
  {
    path: "/",
    children: [
      { path: '/login', element: <Login /> },
    ],
    // element: <EmployeeLayout />,
  },
];


export default routes