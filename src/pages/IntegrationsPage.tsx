import {
  useIntegrations,
  useConnectAnki,
  useDisconnectAnki,
} from "@/features/integrations/hooks/useIntegrations";
import type { Integration } from "@/types/integration.types";

/**
 * Settings → Integrations.
 *
 * Architecture-only for now: lets a user mark an external provider (Anki today)
 * connected or disconnected. No card/review sync happens — this just records
 * status, ready for future synchronization work.
 */
export function IntegrationsPage() {
  const { data: integrations, isLoading, isError, refetch } = useIntegrations();
  const connect = useConnectAnki();
  const disconnect = useDisconnectAnki();

  const anki = integrations?.find((i: Integration) => i.provider === "anki");
  const connected = anki?.status === "connected";
  const busy = connect.isPending || disconnect.isPending;

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label">Settings</p>
        <h1 className="font-display text-3xl text-ink-900">Integrations</h1>
        <p className="mt-1 text-sm text-ink-500">
          Connect external services to JAP. Syncing isn’t available yet — this
          only manages connections.
        </p>
      </div>

      {isLoading && (
        <div className="paper-card h-24 animate-pulse" />
      )}

      {isError && (
        <div className="paper-card p-6 text-center">
          <p className="mb-3 text-sm text-ink-500">Failed to load integrations.</p>
          <button
            onClick={() => refetch()}
            className="text-sm text-indigo-500 underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="paper-card flex items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
              🇦
            </span>
            <div>
              <p className="font-semibold text-ink-900">Anki</p>
              <span
                className={[
                  "inline-flex items-center gap-1.5 text-xs font-medium",
                  connected ? "text-emerald-600" : "text-ink-400",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    connected ? "bg-emerald-500" : "bg-ink-300",
                  ].join(" ")}
                />
                {connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          {connected ? (
            <button
              onClick={() => disconnect.mutate()}
              disabled={busy}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-paper disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {disconnect.isPending ? "Disconnecting…" : "Disconnect"}
            </button>
          ) : (
            <button
              onClick={() => connect.mutate()}
              disabled={busy}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-paper transition hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {connect.isPending ? "Connecting…" : "Connect"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
