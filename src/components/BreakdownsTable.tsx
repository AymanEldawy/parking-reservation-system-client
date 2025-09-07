import type { TicketBreakdownSegmentType } from "@/types/ticket.type"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const BreakdownsTable = ({ breakdown }: { breakdown: TicketBreakdownSegmentType[] }) => {
  return (
    <Table className="w-full text-sm">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">From</TableHead>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">To</TableHead>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">Hours</TableHead>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">Rate Mode</TableHead>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">Rate</TableHead>
          <TableHead className="px-3 py-3 text-left font-medium text-gray-600">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-200">
        {breakdown.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{new Date(row.from).toLocaleString()}</TableCell>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{new Date(row.to).toLocaleString()}</TableCell>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{row.hours.toFixed(2)}</TableCell>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{row.rateMode}</TableCell>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{row.rate}</TableCell>
            <TableCell className="whitespace-nowrap px-3 py-4 text-gray-800">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BreakdownsTable