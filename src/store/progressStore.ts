import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  streak: number;
  dailyGoalXp: number;
  xpToday: number;
  completedLessonIds: string[];
  hasHydrated: boolean;
  completeLesson: (lessonId: string, xpEarned: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      streak: 12,
      dailyGoalXp: 20,
      xpToday: 15,
      completedLessonIds: [],
      hasHydrated: false,
      completeLesson: (lessonId, xpEarned) =>
        set((state) =>
          state.completedLessonIds.includes(lessonId)
            ? state
            : {
                completedLessonIds: [...state.completedLessonIds, lessonId],
                xpToday: state.xpToday + xpEarned,
              },
        ),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        streak: state.streak,
        dailyGoalXp: state.dailyGoalXp,
        xpToday: state.xpToday,
        completedLessonIds: state.completedLessonIds,
      }),
      onRehydrateStorage: () => () => {
        useProgressStore.setState({ hasHydrated: true });
      },
    },
  ),
);
