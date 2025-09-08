import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { ZoneType } from '@/types/zone.type';
import { cn } from '@/lib/utils';

type ZoneCardProps = {
  zone: ZoneType,
  selectedZone: ZoneType | undefined,
  setSelectedZone: (zone: ZoneType) => void,
  gateId: string | undefined
}

const ZoneCard = ({ zone, setSelectedZone, selectedZone }: ZoneCardProps) => {
  const isZoneDisabled = !zone.open || zone.availableForVisitors <= 0;
  const isSpecialRateActive = zone.activeRate === 'special';

  const handleSelectZone = () => {
    if (isZoneDisabled) return;
    setSelectedZone(zone);
  }

  return (
    <Card onClick={handleSelectZone} className={cn('gap-2 group cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg', { 'border-2 border-[var(--primary-color)]': selectedZone?.id === zone.id, 'opacity-60 cursor-not-allowed': isZoneDisabled })}>
      <CardHeader className="px-4 w-full overflow-hidden">
        <div className='flex-container'>
          <CardTitle className="text-lg font-bold text-[var(--text-primary)]">
            {zone.name}
          </CardTitle>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${zone.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
          >
            {isZoneDisabled ? 'Closed' : 'Open'}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Category: {zone.categoryId}
        </p>
      </CardHeader>
      <CardContent className="py-0 px-4 pb-4">
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{zone.occupied}</span> Occupied
          </p>
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{zone.free}</span> Available
          </p>
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{zone.reserved}</span> Reserved
          </p>

        </div>
        <div className="text-sm mt-4">
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{zone.availableForVisitors}</span> available For Visitors
          </p>
          <p className="text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{zone.availableForSubscribers}</span> available For Subscribers
          </p>
        </div>
        <div className="mt-4 text-sm space-y-1">
          <p className={cn("p-1 rounded-md flex justify-between items-center", !isSpecialRateActive ? 'bg-green-100' : 'bg-gray-50')}>
            <span className="text-[var(--text-secondary)]">Rate Normal:</span>
            <span className='font-bold text-[var(--text-primary)]'> ${zone.rateNormal}/hr</span>
            {!isSpecialRateActive && <span className="ml-2 text-xs font-semibold text-green-800">(Active)</span>}
          </p>
          <p className={cn("p-1 rounded-md flex justify-between items-center", isSpecialRateActive ? 'bg-green-100' : 'bg-gray-50')}>
            <span className="text-[var(--text-secondary)]">Rate Special:</span>
            <span className='font-bold text-[var(--text-primary)]'> ${zone.rateSpecial}/hr</span>
            {isSpecialRateActive && <span className="ml-2 text-xs font-semibold text-green-800">(Active)</span>}
          </p>
        </div>

      </CardContent>
    </Card>
  );
};


export default ZoneCard