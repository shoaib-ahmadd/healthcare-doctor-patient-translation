import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type api as ApiType } from "@shared/routes";
import { z } from "zod";

// Helper types derived from the schema since Zod types are inferrable
type MessageListResponse = z.infer<typeof api.messages.list.responses[200]>;
type CreateMessageInput = z.infer<typeof api.messages.create.input>;
type CreateMessageResponse = z.infer<typeof api.messages.create.responses[201]>;
type GenerateSummaryResponse = z.infer<typeof api.summary.generate.responses[200]>;

export function useMessages() {
  return useQuery({
    queryKey: [api.messages.list.path],
    queryFn: async () => {
      const res = await fetch(api.messages.list.path);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return api.messages.list.responses[200].parse(await res.json());
    },
    // Poll every 3 seconds to get updates from the other person
    refetchInterval: 3000, 
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMessageInput) => {
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send message");
      }
      
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate the list to show the new message
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path] });
    },
  });
}

export function useClearMessages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.messages.clear.path, {
        method: api.messages.clear.method,
      });
      if (!res.ok) throw new Error("Failed to clear messages");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path] });
    },
  });
}

export function useGenerateSummary() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.summary.generate.path, {
        method: api.summary.generate.method,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate summary");
      }
      
      return api.summary.generate.responses[200].parse(await res.json());
    },
  });
}
