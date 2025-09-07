import CheckoutConfirm from '@/components/CheckoutConfirm';
import CheckoutPanel from '@/components/CheckoutPanel';
import TicketForm from '@/components/TicketForm'
import { withUserGuard } from '@/HOC/withUserGuard';
import type { CheckoutResponseType } from '@/types/ticket.type';
import { useState } from 'react'

const Checkpoint = withUserGuard(() => {
  const [ticket, setTicket] = useState<CheckoutResponseType | undefined>();
  const [tab, setTab] = useState<'ticket-form' | 'checkout' | 'confirm'>('ticket-form');

  return (
    <section className="container py-12 overflow-hidden">
      {tab === 'ticket-form' ? (
        <TicketForm setTicket={setTicket} setTab={setTab} />
      ) : null}
      {tab === 'checkout' ? (
        <CheckoutPanel setTab={setTab} ticket={ticket}/>
      ) : null}
      {tab === 'confirm' ? (
        <CheckoutConfirm />
      ) : null}
    </section>
  )
})

export default Checkpoint