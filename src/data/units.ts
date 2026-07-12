import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "unit-es-1",
    languageCode: "es",
    order: 1,
    title: "Basics 1",
    description: "Greetings and introducing yourself.",
    lessonIds: ["lesson-es-1-1", "lesson-es-1-2"],
  },
  {
    id: "unit-fr-1",
    languageCode: "fr",
    order: 1,
    title: "Basics 1",
    description: "Greetings and introducing yourself.",
    lessonIds: ["lesson-fr-1-1", "lesson-fr-1-2"],
  },
  {
    id: "unit-ja-1",
    languageCode: "ja",
    order: 1,
    title: "Basics 1",
    description: "Greetings and introducing yourself.",
    lessonIds: ["lesson-ja-1-1", "lesson-ja-1-2"],
  },
];

export function getUnitsForLanguage(languageCode: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((unit) => unit.id === unitId);
}
