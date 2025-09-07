import { SubscriptionService, TicketService } from '@/services/api';
import type { SubscriptionFormType, SubscriptionType } from '@/types/subscription.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TicketModal from './TicketModal';
import SubscriptionInfo from './SubscriptionInfo';
import type { ZoneType } from '@/types/zone.type';

const SubscribersTab = ({ gateId, zones }: { gateId: string | undefined, zones: ZoneType[] }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm<SubscriptionFormType>({});
  const [subscription, setSubscription] = useState<SubscriptionType>();
  const [ticketDetails, setTicketDetails] = useState();
  const onCloseTicket = () => setTicketDetails(undefined);

  const onSubmit = async ({ subscriptionId }: SubscriptionFormType) => {
    const data = await SubscriptionService.getById(subscriptionId);
    if (data.status === 'error') {
      toast.error(data.message);
      return;
    }
    setSubscription(data)

    if (!data.active) {
      toast.error('Subscription is not active');
      return
    }

    const selectedZone = zones.find((zone) => zone.categoryId === data.category);

    if (!selectedZone) {
      toast.error('category is not allow selection for these zones');
      return
    }

    const response = await TicketService.checkin({
      type: "subscriber", subscriptionId, gateId, zoneId: selectedZone.id,
    })
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    setTicketDetails(response);
  }

  return (
    <>
      {ticketDetails ?
        <TicketModal showCheckpointLink ticketDetails={ticketDetails} onClose={onCloseTicket} />
        : null}
      <div className="mt-8">
        <div
          className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Subscriber Verification</h2>
          <p className="mt-2 text-base text-[var(--text-secondary)]">Please enter your subscription ID to proceed.</p>
          <form className="mt-6 flex w-full max-w-sm items-center space-x-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <label className="sr-only" htmlFor="subscriptionId">Subscription ID</label>
              <input
                className="block w-full rounded-md border-gray-300 py-3 pl-4 pr-12 text-base shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                id="subscriptionId" placeholder="Enter Subscription ID"
                type="text"
                {...register("subscriptionId", { required: true })}
              />
            </div>
            <button
              className="inline-flex items-center disabled:bg-gray-100 disabled:opacity-70 disabled:text-gray-500 justify-center rounded-md bg-[var(--primary-color)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
              type="submit"
              disabled={isSubmitting || !watch("subscriptionId")}
            >
              Check
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SubscribersTab
