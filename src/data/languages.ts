import type { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "🇪🇸",
    description: "Learn the world's second most spoken native language.",
    aiTeacher: {
      name: "Sofia",
      personality: "Warm and encouraging, celebrates small wins.",
      voiceStyle: "Friendly, upbeat, speaks slowly for beginners.",
    },
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "🇫🇷",
    description: "Learn the language of art, food, and conversation.",
    aiTeacher: {
      name: "Luc",
      personality: "Patient and a little playful, loves puns.",
      voiceStyle: "Calm, clear, exaggerates pronunciation for practice.",
    },
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "🇯🇵",
    description: "Learn Japanese through everyday greetings and phrases.",
    aiTeacher: {
      name: "Aoi",
      personality: "Cheerful and precise, gives gentle corrections.",
      voiceStyle: "Soft-spoken, breaks words into syllables when teaching.",
    },
  },
];

export function getLanguageByCode(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
