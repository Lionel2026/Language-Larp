import { Image } from "@/components/Image";
import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelect() {
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(
    languages[0].code,
  );

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return languages;
    }
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(normalizedQuery) ||
        language.nativeName.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center px-6 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          className="h-9 w-9 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="flex-1 pr-9 text-center text-h3 text-text-primary">
          Choose a language
        </Text>
      </View>

      <View className="px-6 pt-4">
        <View className="flex-row items-center gap-2 rounded-full border border-border bg-surface px-4 py-3">
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor={colors.textSecondary}
            className="flex-1 text-body-md text-text-primary"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-3 text-h4 text-text-primary">Popular</Text>

        <View className="gap-3">
          {filteredLanguages.map((language) => {
            const isSelected = language.code === selectedCode;

            return (
              <TouchableOpacity
                key={language.code}
                activeOpacity={0.85}
                onPress={() => setSelectedCode(language.code)}
                className={`flex-row items-center rounded-2xl border px-4 py-3 ${
                  isSelected
                    ? "border-2 border-lingua-purple bg-[#ECE9FC]"
                    : "border-border bg-background"
                }`}
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-surface">
                  <Text className="text-[20px]">{language.flagEmoji}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-h4 text-text-primary">
                    {language.name}
                  </Text>
                  <Text className="text-body-sm text-text-secondary">
                    {language.nativeName}
                  </Text>
                </View>
                {isSelected ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.linguaPurple}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="px-6 pb-4">
        <PrimaryButton label="Confirm" onPress={() => router.back()} />
      </View>

      <Image
        source={images.earth}
        contentFit="cover"
        className="h-[120px] w-full"
        pointerEvents="none"
      />
    </SafeAreaView>
  );
}
