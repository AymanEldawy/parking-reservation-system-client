import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { TicketService } from '@/services/api'
import { toast } from 'react-toastify'
import type { TicketType } from '@/types/ticket.type'

type TicketFormProps = {
  setTicket: (ticket: TicketType) => void;
  setTab: (tab: 'ticket-form' | 'checkout' | 'confirm') => void;
}

const TicketForm = ({ setTicket, setTab }: TicketFormProps) => {
  const { watch, register, handleSubmit } = useForm<{ ticketId: string }>()

  const onSubmit = async (values: { ticketId: string }) => {
    const data = await TicketService.getById(values.ticketId);
    if (data.status === 'error') {
      toast.error(data.message);
      return;
    }
    setTicket(data);
    setTab('checkout')
  }

  return (
    <main className="flex-1 flex items-center justify-center sticky top-0 shrink-0">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 min-w-56">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Ticket Checkout</h2>
          <p className="text-gray-500">Scan or enter your ticket ID below to proceed.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
          <div className="relative">
            <label className='sr-only' htmlFor="ticketId">Ticket ID</label>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 scale-110">
              ⛶ </span>
            <input
              className="border w-full rounded-md border-gray-300 h-14 pl-10 pr-4 text-base placeholder:text-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-shadow"
              placeholder="Scan or paste ticket ID"
              {...register("ticketId")}
            />
          </div>
          <Button
            disabled={!watch("ticketId")}
            className='btn btn-primary !w-full block !text-base'>
            Lookup Ticket
          </Button>
        </form>
      </div>
    </main>
  )
}

export default TicketForm