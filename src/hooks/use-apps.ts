import { useQuery } from "@tanstack/react-query";

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      return [];
    },
  });
}
