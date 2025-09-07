import { Button } from '@/components/ui/button'
import { AdminService } from '@/services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type RushWindowFormProps = {
  weekDay: number;
  from: string;
  to: string;
}
const RushWindowForm = () => {
  const { register, reset, handleSubmit, formState: { isDirty } } = useForm<RushWindowFormProps>();
  const onSubmit = async (data: RushWindowFormProps) => {
    console.log(data, "data");

    if (!data.weekDay || !data.from || !data.to) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await AdminService.createRushHours(data);
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    toast.success("Rush hour created successfully");
    console.log(data);
    reset();

  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 ">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Rush Hour Configuration</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <select
          {...register("weekDay", { valueAsNumber: true })}
          className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
          defaultValue=""
        >
          <option value="">Select Day...</option>
          {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
            <option key={day} value={idx}>{day}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="start-time">Start
              Time</label>
            <input
              {...register("from")}
              className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
              id="start-time"
              type="time"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="end-time">End
              Time</label>
            <input
              {...register("to")}
              className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
              id="end-time"
              type="time"
            />
          </div>
        </div>
        <Button
          disabled={!isDirty }
          className='btn-blue !rounded-md !text-base'>
          Rush Hour
        </Button>
      </form>
    </div>
  )
}

export default RushWindowForm