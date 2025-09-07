import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { pathname } = useLocation();
   const links = [
    {
      to: '/admin',
      label: 'Control panel',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      to: '/admin/parking-state-report',
      label: 'Parking State Report',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      to: '/admin/employees',
      label: 'Employees',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 01-3 5.197M15 21a6 6 0 00-9-5.197M9 15a4 4 0 110-8 4 4 0 010 8z"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed md:!sticky top-0 left-0 !h-screen w-64 bg-white shadow-md flex flex-col z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0 ' : '-translate-x-full'} md:static md:translate-x-0 md:h-[calc(100vh-64px)]`}
      >
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                pathname === link.to
                  ? 'bg-[var(--secondary-color)] !text-[var(--primary-color)] font-semibold'
                  : '!text-gray-700 hover:bg-[var(--secondary-color)] hover:!text-[var(--primary-color)] '
              }`}
              onClick={onClose}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar