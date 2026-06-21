import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationService } from "@/services/integration.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useIntegrations() {
  return useQuery({
    queryKey: QUERY_KEYS.INTEGRATIONS,
    queryFn: integrationService.getAll,
  });
}

export function useConnectAnki() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: integrationService.connectAnki,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.INTEGRATIONS }),
  });
}

export function useDisconnectAnki() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: integrationService.disconnectAnki,
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.INTEGRATIONS }),
  });
}
