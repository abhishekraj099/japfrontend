export interface RoadmapRecommendation {
  text: string;
  route: string;
}

export interface Roadmap {
  currentLevel: string;
  nextLevel: string | null;
  progressToNext: number;
  knownWords: number;
  savedWords: number;
  grammarSaved: number;
  strengths: string[];
  weaknesses: string[];
  nextGoals: string[];
  recommendations: RoadmapRecommendation[];
}
