import { Button } from '@/components/ui/button'
import { AdminService } from '@/services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type VacationFormProps = {
  name: string;
  from: string;
  to: string;
}
const VacationForm = () => {
  const { register, reset, handleSubmit, formState: { isDirty } } = useForm<VacationFormProps>();

  const onSubmit = async (data: VacationFormProps) => {
    console.log(data, "data");

    if (!data.name || !data.from || !data.to) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await AdminService.createVacation(data);
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    toast.success("Vacation created successfully");
    console.log(data);
    reset();

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 ">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Holiday Configuration</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="holiday-name">Holiday
            Name
          </label>
          <input
            {...register("name")}
            className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
            id="holiday-name" placeholder="e.g., Christmas Day" type="text" />
        </div>
        <div className='grid sm:grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="holiday-from">
              From
            </label>
            <input
              {...register("from")}
              className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
              id="holiday-from" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="holiday-to">
              To
            </label>
            <input
              {...register("to")}
              className="block w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
              id="holiday-to" type="date" />
          </div>
        </div>
        <Button
          disabled={!isDirty}
          className='btn-blue !rounded-md !text-base'>
          Add Holiday
        </Button>
      </div>
    </form>
  )
}

export default VacationForm