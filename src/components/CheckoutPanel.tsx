import type { CheckoutResponseType } from '@/types/ticket.type'
import BreakdownsTable from './BreakdownsTable'
import { Button } from './ui/button'
import { SubscriptionService, TicketService } from '@/services/api'
import { toast } from 'react-toastify'
import QUERY_KEYS from '@/data/queryKays'
import { useQuery } from '@tanstack/react-query'
import CarCard from './CarCard'
import type { CarType } from '@/types/subscription.type'

type CheckoutPanelProps = {
  ticket: CheckoutResponseType | undefined;
  setTab: (tab: 'ticket-form' | 'checkout' | 'confirm') => void;
}

const CheckoutPanel = ({ ticket, setTab }: CheckoutPanelProps) => {
  const { data: subscription } = useQuery({
    queryKey: [QUERY_KEYS.CHECKOUT, ticket?.subscriptionId],
    queryFn: async () => {
      const response = await SubscriptionService.getById(ticket?.subscriptionId as string)
      if (response.status === 'error') {
        toast.error(response.message);
      }
      return response;
    },
    enabled: !!ticket?.subscriptionId,
  });

  const handleMismatch = async () => {
    if (!ticket) return;
    const response = await TicketService.checkout({ ticketId: ticket.ticketId, forceConvertToVisitor: true })
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    setTab('confirm')
  }

  return (
    <div className='w-full'>
      <div className=' bg-white p-4 border border-gray-200 rounded-xl my-4'>
        <h2 className='text-xl font-bold'>Ticket ({ticket?.ticketId}) checkout</h2>
        <div className='flex flex-wrap items-center gap-4 mt-4 text-sm'>
          <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Check in At: </span>{ticket?.checkinAt ? new Date(ticket.checkinAt).toLocaleString() : 'N/A'}</p>
          <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Checkout At: </span>{ticket?.checkoutAt ? new Date(ticket.checkoutAt).toLocaleString() : 'N/A'}</p>
          <Button onClick={handleMismatch} className="!p-0 ml-auto text-sm text-red-500 hover:text-[var(--primary-color)] underline transition-colors">
            Mismatch? Convert to visitor parking.
          </Button>
        </div>
        {subscription && subscription.cars ? (
          <div className='mt-8'>
            <h2 className='text-xl font-bold mb-2'>Subscription Cars Details</h2>
            {subscription.cars.map((car: CarType, index: number) => (
              <CarCard key={index} car={car} index={index + 1} />
            ))}
          </div>
        ) : null}

      </div>
      {ticket ? (
        <div className=' bg-white p-4 border border-gray-200 rounded-xl my-4'>
          <h2 className='text-xl font-bold'>Breakdowns</h2>
          <BreakdownsTable breakdown={ticket.breakdown} />
          <div className="border-t border-gray-200 p-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Total Duration</p>
                <p className="font-medium text-gray-800">{ticket.durationHours} hours</p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="font-semibold text-gray-900">Total Amount</p>
                <p className="font-bold text-gray-900">${ticket.amount}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CheckoutPanel