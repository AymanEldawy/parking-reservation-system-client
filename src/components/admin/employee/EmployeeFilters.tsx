import type { EmployeeFiltersType } from "@/types/user.type"


type EmployeeFiltersProps = {
  onFiltersChange: (filters: EmployeeFiltersType) => void;
  userFilters: EmployeeFiltersType;
}

const EmployeeFilters = ({ onFiltersChange, userFilters }: EmployeeFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" height="24px" viewBox="0 0 256 256"
            width="24px" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
            </path>
          </svg>
        </div>
        <input
          value={userFilters.search}
          onChange={(e) => onFiltersChange({ ...userFilters, search: e.target.value })}
          type="search"
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-[var(--text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 ease-in-out"
          placeholder="Search employees"
          data-testid="search"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={userFilters.role}
            onChange={(e) => onFiltersChange({ ...userFilters, role: e.target.value })}
            className="appearance-none block w-full bg-white border border-gray-300 text-[var(--text-secondary)] py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 ease-in-out">
            <option value="">All Roles</option>
            <option value="admin">admin</option>
            <option value="employee">employee</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
        <div className="relative">
          <select
            onChange={(e) => onFiltersChange({ ...userFilters, status: e.target.value })}
            className="appearance-none block w-full bg-white border border-gray-300 text-[var(--text-secondary)] py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition duration-300 ease-in-out">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeFilters