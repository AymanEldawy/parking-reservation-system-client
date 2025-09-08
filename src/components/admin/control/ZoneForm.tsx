import { Button } from '@/components/ui/button'
import QUERY_KEYS from '@/data/queryKays';
import { AdminService, MasterService } from '@/services/api';
import type { ZoneType } from '@/types/zone.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type ZoneFormProps = {
  zoneId: string;
  isOpen: boolean;
}


const ZoneForm = () => {
  const { register, setValue, watch, handleSubmit, formState: { isDirty } } = useForm<ZoneFormProps>();
  const queryClient = useQueryClient();


  const { data: zones } = useQuery({
    queryKey: [QUERY_KEYS.ZONES],
    queryFn: async () => {
      const response = await MasterService.getZones();
      if (response.status === 'error') {
        toast.error(response.message);
        throw new Error(response.message);
      }
      return response;
    },
  })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "zoneId") {
        const zone = zones.find((zone: ZoneType) => zone.id === watch('zoneId'));
        if (zone) {
          setValue('isOpen', zone.open);
        }
      }
    });
    return () => subscription.unsubscribe();

  }, [watch, zones]);

  const onSubmit = async (data: ZoneFormProps) => {
    if (!data.zoneId) {
      toast.error('Please select a zone.');
      return;
    }

    const response = await AdminService.setZoneOpen(data.zoneId, data.isOpen);
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    
    queryClient.setQueryData([QUERY_KEYS.ZONES], (oldData: ZoneType[]) => {
      if (!oldData) return [response];
      const index = oldData.findIndex((zone: ZoneType) => zone.id === data.zoneId);
      oldData[index].open = response.open;
      return oldData;
    }
    );
    toast.success('Zone status updated successfully.');
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 ">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Zone Management</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1" htmlFor="zone-select">Select
            Zone</label>
          <select
            {...register("zoneId", { required: true })}
            className="block w-full px-4 py-2 border border-gray-200  rounded-md bg-white text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition ease-in-out duration-150"
            id="zone-select">
            <option value="">Select Zone</option>
            {zones && zones.length > 0 ? zones.map((zone: ZoneType) => (
              <option key={zone.id} value={zone.id} >{zone.name}</option>
            )) : null}
          </select>
          <label className="mt-4 text-sm text-[var(--text-secondary)] flex items-center">
            <input disabled={!watch('zoneId')} type="checkbox" {...register("isOpen")} className="mr-2 leading-tight h-5 w-5" />
            <span className="text-sm">Open Zone</span>
          </label>
        </div>
        <div className="flex gap-4">
          <Button
            disabled={!isDirty}
            className=' btn-blue !rounded-md !text-base'>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ZoneForm