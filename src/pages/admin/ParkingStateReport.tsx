import ErrorMessage from '@/components/shared/ErrorMessage'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import QUERY_KEYS from '@/data/queryKays'
import { AdminService } from '@/services/api'
import type { ShortZoneType, ZoneType } from '@/types/zone.type'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

const ParkingStateReport = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PARKING_STATE],
    queryFn: async () => {
      const response = await AdminService.getParkingState()
      if (response.status === 'error') {
        toast.error(response.message);
      }
      return response;
    }
  })
  console.log(data, 'data');


  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">Parking state report</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Table className="w-full text-sm">
          <TableHeader className="">
            <TableRow className="bg-gray-100 text-gray-600 uppercase !text-base leading-normal">
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Zone</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Status</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Free</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Occupied</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Reserved</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Available For Visitors</TableHead>
              <TableHead className="px-6 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Available For Subscribers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="animate-pulse">
                  {Array.from({ length: 9 }).map((__, cellIdx) => (
                    <TableCell key={cellIdx} className="py-4 px-6">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-gray-500">
                  <ErrorMessage title='No parking state data available.' />
                </TableCell>
              </TableRow>
            ) : (
              data.map((zone: ShortZoneType) => (
                <TableRow className=" hover:bg-gray-50 transition-colors duration-150" key={zone.zoneId}>
                  <TableCell className="py-4 px-6 text-left whitespace-nowrap font-medium text-[var(--text-primary)]">{zone.zoneId}</TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <span className={zone.open ? 'btn-green' : 'btn-red'}>{zone.open ? 'Open' : 'Closed'}</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">{zone.free}</TableCell>
                  <TableCell className="py-4 px-6 text-center">{zone.occupied}</TableCell>
                  <TableCell className="py-4 px-6 text-center">{zone.reserved}</TableCell>
                  <TableCell className="py-4 px-6 text-center">{zone.availableForVisitors}</TableCell>
                  <TableCell className="py-4 px-6 text-center">{zone.availableForSubscribers}</TableCell>
                </TableRow>
              ))
            )}

          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default ParkingStateReport