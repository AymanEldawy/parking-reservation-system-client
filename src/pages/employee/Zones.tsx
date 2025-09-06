import React, { useEffect, useRef, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MasterService, TicketService } from '@/services/api';
import QUERY_KEYS from '@/data/queryKays';
import { ws } from '@/services/ws';
import type { ZoneType } from '@/types/zone.type';
import ZoneCard from '@/components/ZoneCard';
import SubscribersTab from '@/components/SubscribersTab';
import TicketModal from '@/components/TicketModal';
import ErrorModal from '@/components/shared/ErrorModal';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const Zones = () => {
  const gateId = useParams().id;
  const [selectedTab, setSelectedTab] = useState('visitors');
  const [zones, setZones] = useState<ZoneType[]>([]);
  const [selectedZone, setSelectedZone] = useState<ZoneType>();
  const [ticketDetails, setTicketDetails] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  const onCloseTicket = () => setTicketDetails(undefined);
  const onCloseError = () => setTicketDetails(undefined);
  const zonesRef = useRef<ZoneType[]>([])

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ZONES, gateId],
    queryFn: async () => {
      const response = await MasterService.getZonesByGateId(gateId);
      return response.data;
    },
    onSuccess: (data) => {
      setZones(data);
      zonesRef.current = data;
    },
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    ws.connect();
    
    const offOpen = ws.on("open", () => {
      console.log('open');
      ws._send({
        type: 'subscribe',
        payload: { gateId }
      });
    });

    const offZone = ws.on("zone-update", (payload: ZoneType) => {
      const existing = zonesRef.current.find((zone) => zone.id === payload.id);

      let updatedZones;
      if (existing) {
        updatedZones = zonesRef.current.map((zone) =>
          zone.id === payload.id ? { ...zone, ...payload } : zone
        );
      } else {
        updatedZones = [...zonesRef.current, payload];
      }

      zonesRef.current = updatedZones;
      setZones(updatedZones);
    });


    const offClose = ws.on("close", () => {
      console.log('close');
    });

    // cleanup
    return () => {
      offOpen();
      offClose();
      offZone();
      ws.disconnect();
    };
  }, []);


  const checkIn = async () => {
    if (!selectedZone) return;

    const data = await TicketService.checkin({
      gateId,
      zoneId: selectedZone.id,
      type: 'visitor'
    });
    if (data.status === 'error') {
      toast.error(data.message);
    } else {
      setTicketDetails(data);
      setSelectedTab('subscribers')
    }
  }

  return (
    <>
      {ticketDetails ?
        <TicketModal ticketDetails={ticketDetails} onClose={onCloseTicket} />
        : null}
      <main className='container'>
        <div className="flex items-center border-b pb-2 my-4">
          {['visitors', 'subscribers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`!bg-transparent text-gray-600 py-1 text-sm border-b-2 border-transparent min-w-[100px] translate-y-2 capitalize focus:!outline-0 hover:text-[var(--primary-color)]  ${selectedTab === tab ? '!text-[var(--primary-color)] !border-[var(--primary-color)]' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {selectedTab === "visitors" && (
            <>
              {zones?.length > 0 ? (
                <div className=''>

                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {zones.map((zone) => (
                      <ZoneCard key={zone.id} zone={zone} gateId={gateId} selectedZone={selectedZone} setSelectedZone={setSelectedZone} checkIn={checkIn} />
                    ))}
                  </div>
                  <Button onClick={checkIn} disabled={!selectedZone} className='mt-4 btn !text-lg btn-primary'>Go to check in</Button>
                </div>
              ) : null}
            </>
          )}
          {selectedTab === "subscribers" && (
            <SubscribersTab gateId={gateId} zoneId={selectedZone?.id} />
          )}
        </div>
      </main>
    </>
  )
}

export default Zones