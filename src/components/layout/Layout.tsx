import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import { withUserGuard } from '@/HOC/withUserGuard';

const Layout = withUserGuard(() => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
})

export default Layout