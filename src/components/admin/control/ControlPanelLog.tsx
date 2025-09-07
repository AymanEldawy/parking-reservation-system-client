import { ws } from '@/services/ws';
import type { AdminLogType } from '@/types/user.type';
import { getLogColor } from '@/utils/functions';
import React, { useEffect, useState } from 'react'

const ControlPanelLog = () => {
  const [logs, setLogs] = useState<AdminLogType[]>([
    {
      adminId: "admin_2",
      action: "category-rates-changed",
      targetType: "category",
      targetId: "cat_regular",
      details: {
        rateNormal: "3",
        rateSpecial: 5
      },
      timestamp: "2025-09-06T19:48:35.515Z"
    }
  ])

  useEffect(() => {
    ws.connect();
    const offOpen = ws.on("open", () => {
      console.log('open control');
      ws._send({
        type: 'subscribe',
        payload: { gateId: 'gate_1' }
      });
    });

    const offClose = ws.on("close", () => {
      console.log('close control');
    });

    const offControl = ws.on("admin-update", (payload) => {
      console.log('admin-update control', payload);
      setLogs((prev) => [...(prev ?? []), payload] as AdminLogType[]);
    });


    return () => {
      offOpen();
      offClose();
      offControl();
      ws.disconnect();
    };
  }, []);

  return (
    <div className="mt-8 bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-4">Live Log</h2>
      <div className='flex flex-col gap-2'>
        {
          logs?.slice(-5).map((log) => (
            <div key={log.timestamp + log.adminId} className="font-mono text-sm text-gray-300 space-y-2">
              <p>
                <span className={`${getLogColor(log.action)} px-1 py-0.5 rounded-md mr-1 capitalize`}>{log.action}</span>
                at {log.timestamp} by {log.adminId}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ControlPanelLog