import { colors } from "@/theme";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  label: string;
};

export default function PlaceholderScreen({ label }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-h3 text-text-primary">{label}</Text>
      </View>
    </SafeAreaView>
  );
}
