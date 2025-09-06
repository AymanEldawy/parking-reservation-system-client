import type { CheckoutResponseType, TicketType } from '@/types/ticket.type'
import BreakdownsTable from './BreakdownsTable'
import TicketInfo from './TicketInfo'
import { Button } from './ui/button'
import { SubscriptionService, TicketService } from '@/services/api'
import { toast } from 'react-toastify'
import QUERY_KEYS from '@/data/queryKayes'
import { useMutation, useQuery } from '@tanstack/react-query'
import SubscriptionInfo from './SubscriptionInfo'
import CarCard from './CarCard'
import type { CarType } from '@/types/subscription.type'

const CHECKOUT_DUMMY: CheckoutResponseType = {
  "ticketId": "t_010",
  "checkinAt": "2025-08-24T08:00:00Z",
  "checkoutAt": "2025-09-06T02:35:19.962Z",
  "durationHours": 306.5889,
  "breakdown": [
    {
      "from": "2025-08-24T08:00:00.000Z",
      "to": "2025-08-25T07:00:00.000Z",
      "hours": 23,
      "rateMode": "normal",
      "rate": 3,
      "amount": 4140
    },
    {
      "from": "2025-08-25T07:00:00.000Z",
      "to": "2025-08-25T09:00:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-08-25T09:00:00.000Z",
      "to": "2025-08-25T17:00:00.000Z",
      "hours": 8,
      "rateMode": "normal",
      "rate": 3,
      "amount": 1440
    },
    {
      "from": "2025-08-25T17:00:00.000Z",
      "to": "2025-08-25T19:00:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-08-25T19:00:00.000Z",
      "to": "2025-08-29T07:30:00.000Z",
      "hours": 84.5,
      "rateMode": "normal",
      "rate": 3,
      "amount": 15210
    },
    {
      "from": "2025-08-29T07:30:00.000Z",
      "to": "2025-08-29T09:30:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-08-29T09:30:00.000Z",
      "to": "2025-08-29T16:30:00.000Z",
      "hours": 7,
      "rateMode": "normal",
      "rate": 3,
      "amount": 1260
    },
    {
      "from": "2025-08-29T16:30:00.000Z",
      "to": "2025-08-29T18:30:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-08-29T18:30:00.000Z",
      "to": "2025-08-30T10:00:00.000Z",
      "hours": 15.5,
      "rateMode": "normal",
      "rate": 3,
      "amount": 2790
    },
    {
      "from": "2025-08-30T10:00:00.000Z",
      "to": "2025-08-30T14:00:00.000Z",
      "hours": 4,
      "rateMode": "special",
      "rate": 5,
      "amount": 1200
    },
    {
      "from": "2025-08-30T14:00:00.000Z",
      "to": "2025-09-01T07:00:00.000Z",
      "hours": 41,
      "rateMode": "normal",
      "rate": 3,
      "amount": 7380
    },
    {
      "from": "2025-09-01T07:00:00.000Z",
      "to": "2025-09-01T09:00:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-09-01T09:00:00.000Z",
      "to": "2025-09-01T17:00:00.000Z",
      "hours": 8,
      "rateMode": "normal",
      "rate": 3,
      "amount": 1440
    },
    {
      "from": "2025-09-01T17:00:00.000Z",
      "to": "2025-09-01T19:00:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-09-01T19:00:00.000Z",
      "to": "2025-09-05T07:30:00.000Z",
      "hours": 84.5,
      "rateMode": "normal",
      "rate": 3,
      "amount": 15210
    },
    {
      "from": "2025-09-05T07:30:00.000Z",
      "to": "2025-09-05T09:30:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-09-05T09:30:00.000Z",
      "to": "2025-09-05T16:30:00.000Z",
      "hours": 7,
      "rateMode": "normal",
      "rate": 3,
      "amount": 1260
    },
    {
      "from": "2025-09-05T16:30:00.000Z",
      "to": "2025-09-05T18:30:00.000Z",
      "hours": 2,
      "rateMode": "special",
      "rate": 5,
      "amount": 600
    },
    {
      "from": "2025-09-05T18:30:00.000Z",
      "to": "2025-09-06T02:35:19.962Z",
      "hours": 8.0889,
      "rateMode": "normal",
      "rate": 3,
      "amount": 1456
    }
  ],
  "amount": 57586,
  "zoneState": {
    "id": "zone_c",
    "name": "Zone C",
    "categoryId": "cat_regular",
    "gateIds": [
      "gate_2"
    ],
    "totalSlots": 80,
    "occupied": 39,
    "free": 41,
    "reserved": 1,
    "availableForVisitors": 40,
    "availableForSubscribers": 41,
    "rateNormal": 3,
    "rateSpecial": 5,
    "open": true
  }
}


type CheckoutPanelProps = {
  ticket: TicketType | undefined;
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

  const { mutate: checkoutMutation, data: checkout, isPending } = useMutation({
    mutationKey: ['checkout', ticket?.id],
    mutationFn: async (payload: { ticketId: string; forceConvertToVisitor?: boolean }) => {
      const response = await TicketService.checkout(payload);

      if (response.status === 'error') {
        toast.error(response.message);
        throw new Error(response.message);
      }

      toast.success('تم تنفيذ Check-out بنجاح');
      return response;
    },
  });

  const handleMismatch = async () => {
    if (!ticket) return;
    const response = await TicketService.checkout({ ticketId: ticket.id, forceConvertToVisitor: true })
    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    setTab('confirm')
  }

  const processToCheckout = () => checkoutMutation({ ticketId: ticket?.id as string})

  return (
    <div className='w-full'>
      <div className=' bg-white p-4 border border-gray-200 rounded-xl my-4'>
        <h2 className='text-xl font-bold'>Ticket checkout</h2>
        {ticket && (
          <TicketInfo ticket={ticket} isAlreadyCheckout={checkout && checkout?.status === 'error'} />
        )}
        {subscription && subscription.cars ? (
          <div className='mt-8'>
            <h2 className='text-xl font-bold mb-2'>Subscription Cars Details</h2>
            {subscription.cars.map((car: CarType, index: number) => (
              <CarCard key={index} car={car} index={index + 1} />
            ))}
          </div>
        ) : null}
        {/* {ticket && ticket.subscriptionId ? (
        ) : null} */}
        <div className="flex justify-between flex-wrap gap-2 items-center mt-8">
          <Button onClick={handleMismatch} className="text-sm text-gray-500 hover:text-[var(--primary-color)] underline transition-colors">
            Mismatch? Convert to visitor parking.
          </Button>
          <Button
            className='btn btn-primary !text-base'
            disabled={isPending}
            onClick={processToCheckout}

          >
            Process Checkout
          </Button>
        </div>
      </div>
      {checkout && checkout?.status !== 'error' ? (
        <div className=' bg-white p-4 border border-gray-200 rounded-xl my-4'>
          <h2 className='text-xl font-bold'>Breakdowns</h2>
          <BreakdownsTable breakdown={checkout.breakdown} />
          <div className="border-t border-gray-200 p-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Total Duration</p>
                <p className="font-medium text-gray-800">4 hours</p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="font-semibold text-gray-900">Total Amount</p>
                <p className="font-bold text-gray-900">$13.00</p>
              </div>
            </div>
          </div>
        </div>
      ): null}
    </div>
  )
}

export default CheckoutPanel