import withAdminGuard from '@/HOC/withAdminGuard';
import { Outlet } from 'react-router-dom';

const AdminLayout = withAdminGuard(() => {
  return (
    <div>
      AdminLayout
      <Outlet />
    </div>
  )
})

export default AdminLayout