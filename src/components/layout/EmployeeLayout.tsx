import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import { withUserGuard } from '@/HOC/withUserGuard';

const EmployeeLayout = withUserGuard(() => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
})

export default EmployeeLayout