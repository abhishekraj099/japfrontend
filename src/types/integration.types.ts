/** Connection status returned by the backend. */
export type IntegrationStatus = "connected" | "disconnected";

/** Known providers. Kept open-ended (string) so future providers — e.g.
 *  google_drive, dropbox — need no type change, matching the schema. */
export type IntegrationProvider = "anki" | (string & {});

export interface Integration {
  id: string;
  userId: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  createdAt: string;
  updatedAt: string;
}
