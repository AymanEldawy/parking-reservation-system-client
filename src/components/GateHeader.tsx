import { useSearchParams } from "react-router-dom";

const GateHeader = ({ connected }: { connected: boolean }) => {
  const [searchParams] = useSearchParams();
  const gate = searchParams.get('gate') || '';
  return (
    <section className="bg-white flex items-center justify-between border-b-2 border-gray-200 mt-8 px-4 py-2 rounded-md">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">{gate}</h2>
      </div>
      <div className="text-sm">
        <p className="flex gap-2 items-center justify-start">
          <span className={` relative flex h-2 w-2 rounded-full animate-ping ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>WS {connected ? 'Connected' : 'Disconnected'} </span>
        </p>
        <time className="text-gray-400">{new Date().toLocaleString()}</time>
      </div>
    </section>
  )
}

export default GateHeader