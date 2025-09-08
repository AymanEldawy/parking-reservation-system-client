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
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


type TicketModalProps = {
  ticketDetails: CheckinResponseType;
  onClose: () => void;
}

const TicketModal = ({ ticketDetails, onClose }: TicketModalProps) => {
  console.log(ticketDetails, 'ticketDetails');
const contentRef = useRef<HTMLDivElement>(null);
const reactToPrintFn = useReactToPrint({ contentRef, pageStyle: 'printable-content' });


  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white printable-content" ref={contentRef}>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-green-600 text-lg font-semibold flex items-center gap-2 mb-4">
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
        <DialogFooter className="no-print">
          <Link to={`/checkpoint?ticketId=${ticketDetails.ticket.id}`} className="w-full text-center bg-[var(--primary-color)] hover:text-white  !text-white rounded-md px-4 py-2 ">
            Go to checkpoint
          </Link>
          <Button onClick={reactToPrintFn} className="!rounded-md btn-blue !text-base" variant="outline">Print</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default TicketModal