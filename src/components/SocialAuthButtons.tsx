import { useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const providers = [
  {
    key: "google",
    strategy: "oauth_google",
    label: "Continue with Google",
    icon: "logo-google",
    color: "#EA4335",
  },
  {
    key: "facebook",
    strategy: "oauth_facebook",
    label: "Continue with Facebook",
    icon: "logo-facebook",
    color: "#1877F2",
  },
  {
    key: "apple",
    strategy: "oauth_apple",
    label: "Continue with Apple",
    icon: "logo-apple",
    color: "#000000",
  },
] as const;

export function SocialAuthButtons() {
  const { startSSOFlow } = useSSO();

  const handlePress = async (strategy: (typeof providers)[number]["strategy"]) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="gap-3">
      {providers.map((provider) => (
        <TouchableOpacity
          key={provider.key}
          activeOpacity={0.7}
          onPress={() => handlePress(provider.strategy)}
          className="flex-row items-center gap-3 rounded-2xl border border-border px-6 py-3.5"
        >
          <Ionicons name={provider.icon} size={20} color={provider.color} />
          <Text className="text-h4 text-text-primary">{provider.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
