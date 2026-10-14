import type { Edge } from "@/types/edge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useEdges() {
  return useQuery({
    queryKey: ["/edges"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/edges");
      if (!res.ok) throw new Error("Failed to fetch edges");
      const result: Edge[] = await res.json();
      console.log("edges", result);
      return result;
    },
  });
}

export function useEdge(id: number) {
  return useQuery({
    queryKey: ["/edge"],
    queryFn: async () => {
      return {};
    },
  });
}

export function useCreateEdge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const createEdgeRes = await fetch("http://127.0.0.1:8000/edges/register", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data.edge),
      });
      if (!createEdgeRes.ok) throw new Error("Failed to create edge");
      const createEdgeResult = await createEdgeRes.json();
      console.log("create edge", createEdgeResult);
      console.log(JSON.stringify(data.vpn))
      const createVPNProfileRes = await fetch("http://127.0.0.1:8000/vpn/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.vpn),
      });
      if (!createVPNProfileRes.ok) throw new Error("Failed to create vpn profile");
      const createVPNProfileResult = await createVPNProfileRes.json();
      const result = {
        "edge": createEdgeResult,
        "vpn": createVPNProfileResult
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/edges"] });
    },
  });
}
