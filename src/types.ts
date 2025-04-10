
export interface Analysis {
  tone: string;
  themes: string[];
  motivationalTips: string[];
}

export interface Entry {
  id: string;
  date: string;
  content: string;
  analysis: Analysis;
}
