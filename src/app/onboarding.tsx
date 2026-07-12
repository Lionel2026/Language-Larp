import { Image } from "@/components/Image";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { useAuth } from "@clerk/expo";
import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bubbles = [
  {
    text: "Hello!",
    wrapperClassName: "top-[55px] left-[-8px] bg-[#E7EEFC]",
    textClassName: "text-text-primary",
  },
  {
    text: "¡Hola!",
    wrapperClassName: "top-[4px] right-[-12px] bg-[#ECE9FC]",
    textClassName: "text-lingua-purple",
  },
  {
    text: "你好!",
    wrapperClassName: "top-[118px] right-[-30px] bg-[#FCEAE7]",
    textClassName: "text-[#E1574B]",
  },
] as const;

export default function Onboarding() {
  const { isSignedIn, signOut } = useAuth();

  if (isSignedIn) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-h3 text-text-primary text-center">
            You&apos;re already signed in.
          </Text>
          <Text className="text-body-md text-text-secondary text-center">
            Sign out to go through onboarding and sign in again.
          </Text>
          <TouchableOpacity
            onPress={() => signOut()}
            className="mt-4 items-center justify-center rounded-full bg-lingua-purple px-8 py-4"
          >
            <Text className="text-h4 text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 px-6">
        <View className="mt-2 flex-row items-center justify-center gap-2">
          <Image
            source={images.mascotLogo}
            className="h-[34px] w-[34px]"
            contentFit="contain"
          />
          <Text className="text-h2 text-text-primary">Language LARP</Text>
        </View>

        <View className="mt-10">
          <Text className="text-h1 text-text-primary">
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="mt-3 text-body-md text-text-secondary">
            Real conversations, personalized{"\n"}lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-start pt-6">
          <View className="h-[320px] w-[300px]">
            {bubbles.map((bubble) => (
              <View
                key={bubble.text}
                className={`absolute rounded-2xl px-4 py-2 ${bubble.wrapperClassName}`}
              >
                <Text className={`text-h4 ${bubble.textClassName}`}>
                  {bubble.text}
                </Text>
              </View>
            ))}
            <Image
              source={images.mascotWelcome}
              className="mt-5 h-[300px] w-[300px]"
              contentFit="contain"
            />
          </View>
        </View>
      </View>

      <View className="px-6 pb-6">
        <Link href="/sign-up" asChild>
          <TouchableOpacity className="relative items-center justify-center rounded-full bg-lingua-purple py-4">
            <Text className="text-h4 text-white">Get Started</Text>
            <Text className="absolute right-6 text-[20px] font-poppins-semibold text-white">
              ›
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
