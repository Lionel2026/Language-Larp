// Core content types for the hardcoded lesson data in `data/`.

export type LanguageCode = "es" | "fr" | "ja";

export interface AITeacherPersona {
  name: string;
  personality: string;
  voiceStyle: string;
}

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  description: string;
  aiTeacher: AITeacherPersona;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonIds: string[];
}

export type LessonType = "video" | "audio" | "chat" | "vocabulary" | "review";

export interface VocabularyItem {
  id: string;
  term: string;
  translation: string;
  transliteration?: string;
  exampleSentence?: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  transliteration?: string;
  context: string;
}

export type Activity =
  | {
      id: string;
      type: "multiple_choice";
      question: string;
      options: string[];
      correctOptionIndex: number;
    }
  | {
      id: string;
      type: "translate";
      prompt: string;
      correctAnswer: string;
      acceptableAnswers?: string[];
    }
  | {
      id: string;
      type: "listen";
      audioText: string;
      correctAnswer: string;
      options?: string[];
    }
  | {
      id: string;
      type: "match";
      pairs: { term: string; translation: string }[];
    };

// Drives future audio-based Vision Agent lessons (AI teacher chat/video sessions).
export interface AITeacherPrompt {
  systemPrompt: string;
  openingLine: string;
  vocabularyFocus: string[];
  phraseFocus: string[];
  conversationGoals: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  type: LessonType;
  xpReward: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}
