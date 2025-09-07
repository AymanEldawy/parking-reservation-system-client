import type { EmployeeType } from '@/types/user.type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUserStore } from '@/store/userStore'

const EmployeeTable = ({ users, handleUpdateUser }: { users: EmployeeType[], handleUpdateUser: (user: EmployeeType) => void }) => {
  const { deleteUser } = useUserStore()

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-sm">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Name</TableHead>
            <TableHead
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Role</TableHead>
            <TableHead
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Status</TableHead>
            <TableHead
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <TableRow>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">
                {user.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap capitalize">
                <span className={user.role === 'admin' ? 'btn-blue' : 'btn-yellow'}>{user.role}</span>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                <span className={user.status === 'active' ? 'btn-green' : 'btn-red'}>{user.status}</span>
              </TableCell>
              <TableCell className="flex gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="btn btn-blue" onClick={() => handleUpdateUser(user)}>Edit</button>
                <button className="btn btn-primary" onClick={() => user.id && deleteUser(user.id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  )
}

export default EmployeeTable