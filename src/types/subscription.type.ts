export type CarType = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};

export type SubscriptionType = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: CarType[];
  startsAt: string; 
  expiresAt: string; 
  currentCheckins: unknown[];
};


export type SubscriptionFormType = {
  subscriptionId: string;
}