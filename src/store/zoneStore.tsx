// generate fake store data to handle add new and delete and update role
import type { ZoneType, ZoneStoreType } from "@/types/zone.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useZoneStore = create<ZoneStoreType>()(
  persist(
    (set, get) => ({
      zones: [],
      updateZones: (newZone: ZoneType) => {
        const zones = get().zones;
        const existing = zones.find((zone: ZoneType) => zone.id === newZone.id);
        let updatedZones: ZoneType[];
        if (existing) {
          updatedZones = zones.map((zone: ZoneType) =>
            zone.id === newZone.id ? { ...zone, ...newZone } : zone
          );
        } else {
          updatedZones = [...zones, newZone];
        }
        set({ zones: updatedZones });
      }
    }),
    {
      name: "ZONES_DATA",
      partialize: (state) => ({ zones: state.zones }),
    }
  )
);
