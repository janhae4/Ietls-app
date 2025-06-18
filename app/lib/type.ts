export interface ReadingQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false-not-given' | 'matching-headings' | 'fill-in-blanks' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  keywords?: string[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'academic' | 'general';
  topic: string;
  readingTime: number; // in minutes
  wordCount: number;
  content: string;
  questions: ReadingQuestion[];
}

export interface ReadingTest {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passages: ReadingPassage[];
  totalQuestions: number;
}


export interface MenuPosition {
  x: number;
  y: number;
}

export interface HighlightRange {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export interface Highlight {
  id: number;
  text: string;
  color: HighlightColor;
  range: HighlightRange;
}

export type HighlightColor = 'yellow' | 'blue' | 'green' | 'pink';

export interface PassageData {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  wordCount: number;
  readingTime: number;
  content: string;
}

export interface HighlightColorConfig {
  bg: string;
  border: string;
}