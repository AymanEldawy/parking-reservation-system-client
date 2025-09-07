import EmployeeFilters from '@/components/admin/employee/EmployeeFilters';
import UserFormModal from '@/components/admin/employee/EmployeeFormModal';
import EmployeeTable from '@/components/admin/employee/EmployeeTable';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { useUserStore } from '@/store/userStore';
import type { EmployeeFiltersType, EmployeeType } from '@/types/user.type';
import { useMemo, useState } from 'react';

const Employee = () => {
  const { users } = useUserStore();
  const [open, setOpen] = useState(false);
  const [userFilters, setUserFilters] = useState<EmployeeFiltersType>({
    search: '',
    role: '',
  });
  const [selectedUser, setSelectedUser] = useState<EmployeeType | null>(null);

  const onFiltersChange = (filters: EmployeeFiltersType) => {
    setUserFilters(prev => ({ ...prev, ...filters }));
  }

  const filterUsers = useMemo(() => {
    return users
      .filter(user => user.role !== 'superadmin')
      .filter(user =>
        (!userFilters.search || user.name.toLowerCase().includes(userFilters.search.toLowerCase())) &&
        (!userFilters.role || user.role === userFilters.role) &&
        (!userFilters.status || user.status === userFilters.status)
      );
  }, [users, userFilters]);


  const handleUpdateUser = (user: EmployeeType) => {
    setSelectedUser(user);
    setOpen(true);
  }
  
  
  return (
    <>
      <UserFormModal open={open} setOpen={setOpen} defaultValue={selectedUser} setSelectedUser={setSelectedUser}  />
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">Employee Management</h2>
          <button
            onClick={() => setOpen(true)}
            className="btn-primary btn !text-base">
            <span className="truncate">Add New Employee</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <EmployeeFilters onFiltersChange={onFiltersChange} userFilters={userFilters} />
          {filterUsers.length === 0 ? (
            <ErrorMessage title='No users found.' />
          ) :
            <EmployeeTable users={filterUsers} handleUpdateUser={handleUpdateUser} />
          }
        </div>
      </div>
    </>
  )
}

export default Employee