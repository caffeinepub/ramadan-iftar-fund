import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Donation } from "../backend";

export function useCampaignStats() {
  const { actor, isFetching } = useActor();
  
  return useQuery({
    queryKey: ["campaignStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCampaignStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useAllDonations() {
  const { actor, isFetching } = useActor();
  
  return useQuery<Donation[]>({
    queryKey: ["donations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDonations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMakeDonation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.makeDonation(amount);
    },
    onSuccess: () => {
      // Invalidate and refetch campaign stats and donations
      queryClient.invalidateQueries({ queryKey: ["campaignStats"] });
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
