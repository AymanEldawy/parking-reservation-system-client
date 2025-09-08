import GateCard from "@/components/GateCard";
import GateCardSkeleton from "@/components/GateCardSkeleton";
import QUERY_KEYS from "@/data/queryKays";
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

  return (
    <main className="container mx-auto px-4 my-4">
      <h1 className="md:text-3xl mb-4 font-bold">Gates</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <GateCardSkeleton />
            <GateCardSkeleton />
            <GateCardSkeleton />
            <GateCardSkeleton />
          </>
        ) :
          <>
            {gates.length ? gates.map((gate: GateType) => (
              <GateCard key={gate.id} gate={gate} />
            )) :
              <p className="bg-red-50 text-red-500 font-medium text-center col-span-full p-4">There is no gates</p>
            }
          </>
        }
      </div>
    </main>
  )
}

export default Gates
