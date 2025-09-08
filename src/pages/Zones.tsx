import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ws } from '@/services/ws';
import type { ZoneType } from '@/types/zone.type';
import ZoneCard from '@/components/ZoneCard';
import SubscribersTab from '@/components/SubscribersTab';
import TicketModal from '@/components/TicketModal';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useZoneStore } from '@/store/zoneStore';
import { TicketService } from '@/services/api';
import GateHeader from '@/components/GateHeader';
import type { CheckinResponseType } from '@/types/ticket.type';

const Zones = () => {
  const gateId = useParams().id;
  const { updateZones, zones } = useZoneStore()
  const [selectedTab, setSelectedTab] = useState('visitors');
  const [selectedZone, setSelectedZone] = useState<ZoneType>();
  const [ticketDetails, setTicketDetails] = useState<CheckinResponseType>();
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    ws.connect();

    const offOpen = ws.on("open", () => {
      ws._send({
        type: 'subscribe',
        payload: { gateId }
      });
      setConnected(true)
    });

    const offZone = ws.on("zone-update", (payload: unknown) => {
      updateZones(payload as ZoneType)
    });

    const offClose = ws.on("close", () => {
      setConnected(false)
    });

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
    }
  }

  const onCloseTicket = () => setTicketDetails(undefined);

  return (
    <>
      {ticketDetails ?
        <TicketModal ticketDetails={ticketDetails} onClose={onCloseTicket} />
        : null}
      <main className='container'>
        <GateHeader connected={connected} />
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

        <div className="pt-4 pb-8">
          {selectedTab === "visitors" && (
            <>
              {zones?.length > 0 ? (
                <div className=''>

                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {zones.map((zone) => (
                      <ZoneCard key={zone.id} zone={zone} gateId={gateId} selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
                    ))}
                  </div>
                  <Button onClick={checkIn} disabled={!selectedZone} className='mt-4 btn !text-lg btn-primary'>Go to check in</Button>
                </div>
              ) : null}
            </>
          )}
          {selectedTab === "subscribers" && (
            <SubscribersTab gateId={gateId} zones={zones} />
          )}
        </div>
      </main>
    </>
  )
}

export default Zones