import type { TicketType } from '@/types/ticket.type';

type TicketInfoProps = {
  ticket: TicketType;
}

const TicketInfo = ({ ticket }: TicketInfoProps) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md grid sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-100 my-4">
      {/* <h3 className="text-lg font-medium mb-2">Ticket Details</h3> */}
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Ticket ID:</span> {ticket.id}</p>
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Type:</span> {ticket.type}</p>
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Zone ID:</span> {ticket.zoneId}</p>
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Gate ID:</span> {ticket.gateId}</p>
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Check-in Time:</span> {new Date(ticket.checkinAt).toLocaleString()}</p>
      <p className='flex gap-2'><span className="font-semibold whitespace-nowrap">Check-out Time:</span> {ticket.checkoutAt ? new Date(ticket.checkoutAt).toLocaleString() : 'N/A'} </p>
    </div>
  )
}

export default TicketInfo