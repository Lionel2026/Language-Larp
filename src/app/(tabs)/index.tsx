import { Image } from "@/components/Image";
import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonsForUnit } from "@/data/lessons";
import { getUnitsForLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useBottomTabBarHeight } from "expo-router/js-tabs";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GREETINGS: Record<LanguageCode, string> = {
  es: "¡Hola",
  fr: "Salut",
  ja: "こんにちは",
};

export default function Home() {
  const { user } = useUser();
  const tabBarHeight = useBottomTabBarHeight();

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const streak = useProgressStore((state) => state.streak);
  const dailyGoalXp = useProgressStore((state) => state.dailyGoalXp);
  const xpToday = useProgressStore((state) => state.xpToday);
  const completedLessonIds = useProgressStore(
    (state) => state.completedLessonIds,
  );
  const hasHydrated = useProgressStore((state) => state.hasHydrated);

  if (!selectedLanguage || !hasHydrated) {
    return null;
  }

  const language = getLanguageByCode(selectedLanguage);
  if (!language) {
    return null;
  }

  const units = getUnitsForLanguage(selectedLanguage);
  const currentUnit =
    units.find((unit) =>
      unit.lessonIds.some((id) => !completedLessonIds.includes(id)),
    ) ?? units[0];
  const unitLessons = getLessonsForUnit(currentUnit.id);
  const currentLesson =
    unitLessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    unitLessons[0];
  const isLessonComplete = completedLessonIds.includes(currentLesson.id);

  const goalProgress = Math.min(100, Math.round((xpToday / dailyGoalXp) * 100));
  const firstName = user?.firstName ?? "there";

  const planItems = [
    {
      key: "lesson",
      icon: "book" as const,
      iconBg: "bg-lingua-purple",
      title: currentLesson.title,
      subtitle: currentLesson.description,
      completed: isLessonComplete,
    },
    {
      key: "ai-conversation",
      icon: "headset" as const,
      iconBg: "bg-lingua-blue",
      title: "AI Conversation",
      subtitle: currentLesson.aiTeacherPrompt.conversationGoals[0],
      completed: false,
    },
    {
      key: "new-words",
      icon: "chatbubble-ellipses" as const,
      iconBg: "bg-error",
      title: "New words",
      subtitle: `${currentLesson.vocabulary.length} words`,
      completed: false,
    },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: tabBarHeight + 24,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-surface">
              <Text className="text-[20px]">{language.flagEmoji}</Text>
            </View>
            <Text className="text-h4 text-text-primary">
              {GREETINGS[selectedLanguage]}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Ionicons name="flame" size={22} color={colors.streak} />
              <Text className="text-h4 text-text-primary">{streak}</Text>
            </View>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.textPrimary}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-3xl bg-[#FBEEE0] p-5">
          <View className="gap-2">
            <Text className="text-body-sm text-text-secondary">
              Daily goal
            </Text>
            <Text className="text-h1 text-text-primary">
              {xpToday}
              <Text className="text-h4 text-text-secondary"> / {dailyGoalXp} XP</Text>
            </Text>
            <View className="h-2 w-[160px] overflow-hidden rounded-full bg-[#F2D9BC]">
              <View
                className="h-2 rounded-full bg-streak"
                style={{ width: `${goalProgress}%` }}
              />
            </View>
          </View>

          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#F6D9A0]">
            <Ionicons name="gift" size={28} color="#B8860B" />
          </View>
        </View>

        <View className="flex-row items-center justify-between overflow-hidden rounded-3xl bg-lingua-purple p-5">
          <View className="flex-1 gap-2">
            <Text className="text-body-sm text-white/80">
              Continue learning
            </Text>
            <Text className="text-h1 text-white">{language.name}</Text>
            <Text className="text-body-md text-white/80">
              A1 • Unit {currentUnit.order}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/learn")}
              className="mt-2 self-start items-center justify-center rounded-full bg-white px-6 py-3"
            >
              <Text className="text-h4 text-lingua-purple">Continue</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={images.earth}
            contentFit="cover"
            style={{ width: 110, height: 110, borderRadius: 20 }}
          />
        </View>

        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-h4 text-text-primary">Today&apos;s plan</Text>
            <Link href="/learn" asChild>
              <TouchableOpacity>
                <Text className="text-body-sm text-lingua-purple">
                  View all
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="gap-3">
            {planItems.map((item) => (
              <View
                key={item.key}
                className="flex-row items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3"
              >
                <View
                  className={`h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Ionicons name={item.icon} size={20} color="#FFFFFF" />
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-h4 text-text-primary">
                    {item.title}
                  </Text>
                  <Text
                    className="text-body-sm text-text-secondary"
                    numberOfLines={1}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                {item.completed ? (
                  <View className="h-6 w-6 items-center justify-center rounded-full bg-lingua-purple">
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View className="h-6 w-6 rounded-full border-2 border-border" />
                )}
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/ai-teacher")}
          className="flex-row items-center justify-between rounded-3xl bg-[#EAF3E1] p-4"
        >
          <View className="gap-1">
            <Text className="text-body-sm text-text-secondary">Next up</Text>
            <Text className="text-h4 text-text-primary">AI Video Call</Text>
            <Text className="text-body-sm text-text-secondary">
              Practice speaking
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-lingua-purple">
              <Text className="text-h4 text-white">
                {language.aiTeacher.name[0]}
              </Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-full bg-lingua-green">
              <Ionicons name="videocam" size={20} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
