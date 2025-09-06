export type ZoneType = {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  open: boolean;

  totalSlots: number;
  occupied: number;
  reserved: number;
  free: number;

  availableForSubscribers: number;
  availableForVisitors: number;

  rateNormal: number;
  rateSpecial: number;
};
