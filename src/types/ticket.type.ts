export type TicketType = {
  id: string;
  type: "visitor" | "subscriber";
  zoneId: string;
  gateId: string;
  checkinAt: string; // ISO timestamp
  checkoutAt: string | null;
  subscriptionId?: string;
};

export type ZoneStateType = {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
};

export type CheckinResponseType = {
  ticket: TicketType;
  zoneState: ZoneStateType;
};

export type TicketBreakdownSegmentType = {
  from: string;
  to: string;
  hours: number;
  rateMode: "normal" | "weekend" | "holiday" | "subscriber" | "special";
  rate: number;
  amount: number;
};

export type CheckoutResponseType = TicketType & {
  durationHours: number;
  breakdown: TicketBreakdownSegmentType[];
  zoneState: ZoneStateType;
  amount: number;
};
