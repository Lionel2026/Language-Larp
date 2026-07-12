import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const providers = [
  {
    key: "google",
    label: "Continue with Google",
    icon: "logo-google",
    color: "#EA4335",
  },
  {
    key: "facebook",
    label: "Continue with Facebook",
    icon: "logo-facebook",
    color: "#1877F2",
  },
  {
    key: "apple",
    label: "Continue with Apple",
    icon: "logo-apple",
    color: "#000000",
  },
] as const;

export function SocialAuthButtons() {
  return (
    <View className="gap-3">
      {providers.map((provider) => (
        <TouchableOpacity
          key={provider.key}
          activeOpacity={0.7}
          className="flex-row items-center gap-3 rounded-2xl border border-border px-6 py-3.5"
        >
          <Ionicons name={provider.icon} size={20} color={provider.color} />
          <Text className="text-h4 text-text-primary">{provider.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
