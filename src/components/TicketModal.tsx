import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CheckinResponseType } from "@/types/ticket.type";
import { Link } from "react-router-dom";


type TicketModalProps = {
  ticketDetails: CheckinResponseType;
  onClose: () => void;
  showCheckpointLink?: boolean;
}

const TicketModal = ({ ticketDetails, onClose, showCheckpointLink }: TicketModalProps) => {
  console.log(ticketDetails, 'ticketDetails');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Successfully Check in <span className="text-[var(--primary-color)] font-bold">({ticketDetails.zoneState.name})</span></DialogTitle>
          <DialogDescription>
            <div className="mt-4 mb-2 grid grid-cols-2 gap-2 mb-2">
              <p className="text-[var(--text-secondary)]">
                Ticket ID: <span className="font-semibold text-[var(--text-primary)]">{ticketDetails.ticket.id}</span>
              </p>
              <p className="text-[var(--text-secondary)]">
                Type: <span className="font-semibold text-[var(--text-primary)]">{ticketDetails.ticket.type}</span>
              </p>
              <p className="text-[var(--text-secondary)]">
                Gate: <span className="font-semibold text-[var(--text-primary)]">{ticketDetails.ticket.gateId}</span>
              </p>
              <p className="text-[var(--text-secondary)]">
                zone: <span className="font-semibold text-[var(--text-primary)]">{ticketDetails.ticket.zoneId}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[var(--text-secondary)]">
                Check in At: <span className="font-semibold text-[var(--text-primary)]">{new Date(ticketDetails.ticket.checkinAt).toLocaleString()}</span>
              </p>
              <p className="text-[var(--text-secondary)]">
                Total Slots: <span className="font-semibold text-[var(--text-primary)]">{ticketDetails.zoneState.totalSlots}</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        {showCheckpointLink ? (
          <DialogFooter>
            <Link to="/checkpoint" className="bg-[var(--primary-color)] hover:text-white  !text-white rounded-md px-4 py-2 ">
              Go to checkpoint
            </Link>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}


export default TicketModal