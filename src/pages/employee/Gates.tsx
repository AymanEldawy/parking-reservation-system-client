import GateCard from "@/components/GateCard";
import QUERY_KEYS from "@/data/queryKayes";
import { MasterService } from "@/services/api";
import type { GateType } from "@/types/gate.type";
import { useQuery } from "@tanstack/react-query"


const Gates = () => {
  const { isLoading, data: gates } = useQuery({
    queryKey: [QUERY_KEYS.GATE],
    queryFn: async () => {
      const data = await MasterService.getGates();
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;


  return (
    <main className="container mx-auto px-4 my-4">
      <h1 className="md:text-3xl mb-4 font-bold">Gates</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          gates.map((gate: GateType) => (
            <GateCard key={gate.id} gate={gate} />
          ))
        }
      </div>
    </main>
  )
}

export default Gates
