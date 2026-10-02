"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { services } from "@/config/site";

type Service = (typeof services)[number];
type ServiceSelection = { selectedService: Service | null; selectService: (serviceId: string) => void };
const ServiceSelectionContext = createContext<ServiceSelection | null>(null);

export function useServiceSelection() {
  const context = useContext(ServiceSelectionContext);
  if (!context) throw new Error("ServiceSelectionProvider não encontrado");
  return context;
}

export function ServiceSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const selectService = useCallback((serviceId: string) => {
    const service = services.find((item) => item.id === serviceId);
    if (service) setSelectedService(service);
  }, []);

  return <ServiceSelectionContext.Provider value={{ selectedService, selectService }}>{children}</ServiceSelectionContext.Provider>;
}
