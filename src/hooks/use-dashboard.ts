import { useQuery } from "@tanstack/react-query";

// Mock response type based on what the UI needs, since schema was "any"
export interface DashboardStats {
  edges: { total: number; up: number; down: number; provisioned: number };
  controllers: { total: number; healthy: number; unhealthy: number };
  services: { total: number; active: number };
  nodes: { total: number; ready: number };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['/stats'],
    queryFn: async () => {
      // Fallback mock data matching the UI requirements
      return {
        edges: { total: 124, up: 98, down: 26, provisioned: 110 },
        controllers: { total: 12, healthy: 10, unhealthy: 2 },
        services: { total: 45, active: 42 },
        nodes: { total: 8, ready: 8 }
      };
    }
  });
}
