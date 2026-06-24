export type MissionCategory = "Review" | "Grammar" | "Coverage" | "JLPT" | "Weakness";

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  category: MissionCategory;
  route: string;
}

export interface MissionsResponse {
  missions: Mission[];
  generatedAt: string;
}
