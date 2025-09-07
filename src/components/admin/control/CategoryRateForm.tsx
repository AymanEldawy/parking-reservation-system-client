import { Button } from '@/components/ui/button'
import QUERY_KEYS from '@/data/queryKays';
import { AdminService, MasterService } from '@/services/api';
import type { CategoryType } from '@/types/category.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type CategoryRateFormProps = {
  categoryId: string;
  rateNormal: number;
  rateSpecial: number;
}

const CategoryRateForm = () => {
  const { register, setValue, watch, handleSubmit, formState: { isDirty } } = useForm<CategoryRateFormProps>();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const response = await MasterService.getCategories();
      if (response.status === 'error') {
        toast.error(response.message);
        throw new Error(response.message);
      }
      return response;
    },
  })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "categoryId") {
        const category = categories.find((category: CategoryType) => category.id === watch('categoryId'));
        console.log(category, 'category');
        if (category) {

          setValue('rateNormal', category.rateNormal);
          setValue('rateSpecial', category.rateSpecial);
        }
      }
    });
    return () => subscription.unsubscribe();

  }, [watch, categories]);

  const onSubmit = async (data: CategoryRateFormProps) => {
    if (!data.categoryId) {
      toast.error('Please select a category and enter a valid rate.');
      return;
    }

    const response = await AdminService.updateCategoryRate(data.categoryId, data.rateNormal, data.rateSpecial);
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }

    queryClient.setQueryData([QUERY_KEYS.CATEGORIES], (oldData: CategoryType[]) => {
      if (!oldData) return [response];
      const index = oldData.findIndex((cat: CategoryType) => cat.id === data.categoryId);
      oldData[index] = response;
      return oldData;
    });
    toast.success('Category rate updated successfully.');
  }


  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Update Category Fees</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="category-select">Select
            Category</label>
          <select
            className="block w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
            id="category-select"
            {...register("categoryId", { required: true })}
          >
            <option value="">Select Category</option>
            {categories && categories.length > 0 ? categories.map((category: CategoryType) => (
              <option key={category.id} value={category.id} >{category.name}</option>
            )) : null}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="new-fee">Normal rate
          </label>
          <input
            value={watch('rateNormal')}
            className="block w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
            placeholder="Enter Normal rate"
            type="number"
            {...register("rateNormal", { required: true, min: 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="new-fee">Special rate
          </label>
          <input
            value={watch('rateSpecial')}
            className="block w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
            placeholder="Enter Special rate"
            type="number"
            {...register("rateSpecial", { required: true, min: 0 })}
          />
        </div>
        <Button
          disabled={!isDirty}
          className='btn-blue !rounded-md !text-base'>
          Update Rate
        </Button>
      </form>
    </div>
  )
}

export default CategoryRateForm