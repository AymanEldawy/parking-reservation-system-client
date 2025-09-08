export type ShortZoneType = {
  zoneId: string;
  name: string;
  totalSlots: number;
  occupied: number;
  reserved: number;
  free: number;
  availableForSubscribers: number;
  availableForVisitors: number;
  subscriberCount: number;
  open: boolean;
};

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
  activeRate: "normal" | "special";
};

export type ZoneStoreType = {
  zones: ZoneType[];
  updateZones: (zone: ZoneType) => void;
};
