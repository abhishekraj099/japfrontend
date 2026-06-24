export interface DeckIntelligence {
  totalCards: number;
  health: number;
  difficulty: { score: number; band: string; avgDifficulty: number; againRate: number };
  retention: number;
  overdue: number;
  maturity: { new: number; learning: number; known: number; mature: number; mastered: number };
  leeches: Array<{ id: string; word: string; reviewCount: number; failCount: number; retention: number }>;
  forecast: { tomorrow: number; sevenDays: number; thirtyDays: number };
  recommendations: string[];
}
