import { ws } from "@/services/ws";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.connect();
    const offOpen = ws.on("open", () => {
      console.log('open');
      setConnected(true)
    });

    const offClose = ws.on("close", () => {
      console.log('close');
      setConnected(false)
    });

    return () => {
      offOpen();
      offClose();
      ws.disconnect();
    };
  }, []);

  return (
    <header className="bg-white flex items-center justify-between border-b-2 border-gray-200 px-6 py-4 sm:px-10">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <svg className="h-8 w-8 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10H23V12C23 13.1046 22.1046 14 21 14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14H3C1.89543 14 1 13.1046 1 12V10H3V6ZM5 6H19V18H5V6ZM7 16C7.55228 16 8 15.5523 8 15C8 14.4477 7.55228 14 7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44772 16 7 16ZM18 15C18 15.5523 17.5523 16 17 16C16.4477 16 16 15.5523 16 15C16 14.4477 16.4477 14 17 14C17.5523 14 18 14.4477 18 15Z"
                fill-rule="evenodd"></path>
            </svg>
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">ParkSmart</h1>
          </Link>
          <div className="text-sm">
            <p className="flex gap-2 items-center justify-start">
              <span className={` relative flex h-2 w-2 rounded-full animate-ping ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>WS {connected ? 'Connected' : 'Disconnected'} </span>
            </p>
            <time className="text-gray-400">{new Date().toLocaleString()}</time>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Menu