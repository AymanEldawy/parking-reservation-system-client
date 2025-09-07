import { useForm } from 'react-hook-form';
import ErrorMessage from '../../shared/ErrorMessage';
import type { EmployeeType } from '@/types/user.type';
import { Dialog, DialogContent } from '../../ui/dialog';
import { useUserStore } from '@/store/userStore';
import { toast } from 'react-toastify';

type EmployeeFormModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue?: EmployeeType | null;
  setSelectedUser?: (user: EmployeeType | null) => void;
}

const defaultValues: EmployeeType = {
  name: '',
  role: 'employee',
  status: 'active'
}

const EmployeeFormModal = ({ open, setOpen, defaultValue, setSelectedUser }: EmployeeFormModalProps) => {
  const { addUser, updateUser } = useUserStore()
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<EmployeeType>({
    defaultValues: defaultValue || defaultValues
  });
  
  const onSubmit = async (data: EmployeeType) => {
    if (!data.name || !data.role) {
      toast.error('Please fill all the fields');
      return;
    }
    if (defaultValue && data.id) {
      updateUser(data.id, data);
    } else {
      addUser({ id: Date.now().toString(), name: data.name, role: data.role, status: data.status });
    }
    reset();
    toast.success('User added successfully');
  }

  const handleCloseForm = () => {
    reset(defaultValues);
    setOpen(false);
    if (setSelectedUser) setSelectedUser(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseForm}>
      <DialogContent className='bg-white'>
        <h2 className="mb-6 text-center text-2xl font-semibold text-[var(--text-primary)]">Add New User</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} name="employee-form">
          <div className="space-y-1.5">
            <label className="sr-only" htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              value={watch("name")}
              placeholder="name"
              {...register("name", { required: true })}
              className="border block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            {errors?.name ? <ErrorMessage title={errors.name.message || "name is required"} /> : null}
          </div>
          <div className="space-y-1.5">
            <label className="sr-only" htmlFor="role">Role</label>
            <select
              {...register("role", { required: true })}
              value={watch("role")}
              className="border block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            {errors?.name ? <ErrorMessage title={errors.name.message || "name is required"} /> : null}
          </div>
          <div className="space-y-1.5">
            <label className="sr-only" htmlFor="status">Status</label>
            <select
              value={watch("status")}
              {...register("status", { required: true })}
              className="border block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors?.name ? <ErrorMessage title={errors.name.message || "name is required"} /> : null}
          </div>

          <div>
            <button
              className="w-full rounded-lg bg-[var(--primary-color)] py-3 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
              type="submit">
              {isSubmitting ? 'loading ...' : 'Save'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeFormModal