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
}

const TicketModal = ({ ticketDetails, onClose }: TicketModalProps) => {
  console.log(ticketDetails, 'ticketDetails');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-green-600 text-lg font-semibold flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
              </svg>
              Successfully Checked In ({ticketDetails.zoneState.name})
            </h2>
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Ticket ID:</span>
                <span className="text-gray-800">{ticketDetails.ticket.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Type:</span>
                <span className="text-gray-800 capitalize">{ticketDetails.ticket.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Gate:</span>
                <span className="text-gray-800">{ticketDetails.ticket.gateId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Zone:</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">{ticketDetails.ticket.zoneId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Check-in At:</span>
                <span className="text-gray-800">{new Date(ticketDetails.ticket.checkinAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Total Slots:</span>
                <span className="text-gray-800">{ticketDetails.zoneState.totalSlots}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to={`/checkpoint?ticketId=${ticketDetails.ticket.id}`}className="w-full text-center bg-[var(--primary-color)] hover:text-white  !text-white rounded-md px-4 py-2 ">
            Go to checkpoint
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default TicketModal