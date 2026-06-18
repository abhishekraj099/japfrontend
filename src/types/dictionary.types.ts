export interface DictionaryResult {
  id: string;
  word: string;
  reading: string | null;
  meanings: string[];
  jlptLevel: string | null;
  partOfSpeech: string | null;
  frequency: number | null;
}
