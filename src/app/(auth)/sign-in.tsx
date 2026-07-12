import { AuthTextField } from "@/components/AuthTextField";
import { Image } from "@/components/Image";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { isValidAuthEmail } from "@/lib/auth";
import { colors } from "@/theme";
import { useSignIn } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sparkles = [
  { className: "left-2 top-0 text-lingua-purple", size: 18 },
  { className: "right-6 top-8 text-lingua-blue", size: 14 },
  { className: "bottom-2 right-0 text-warning", size: 16 },
] as const;

export default function SignIn() {
  const { signIn, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidAuthEmail(normalizedEmail)) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    setLoginError(null);

    const { error } = await signIn.emailCode.sendCode({
      emailAddress: normalizedEmail,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setLoginError("We couldn’t send the verification code. Please try again.");
      return;
    }

    setShowVerification(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="mt-1 h-8 w-8 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text className="mt-3 text-h1 text-text-primary">Welcome back</Text>
          <Text className="mt-2 text-body-md text-text-secondary">
            Continue your language journey ✨
          </Text>

          <View className="mt-2 h-[140px] items-center justify-center">
            {sparkles.map((sparkle, index) => (
              <Text
                key={index}
                className={`absolute font-poppins-semibold ${sparkle.className}`}
                style={{ fontSize: sparkle.size }}
              >
                ✦
              </Text>
            ))}
            <Image
              source={images.mascotAuth}
              className="h-[140px] w-[190px]"
              contentFit="contain"
            />
          </View>

          <View className="gap-3">
            <AuthTextField
              label="Email"
              placeholder="alex@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <PrimaryButton
            label="Log In"
            className="mt-5"
            onPress={handleLogin}
            disabled={fetchStatus === "fetching"}
          />

          {loginError ? (
            <Text className="mt-3 text-body-sm text-danger">{loginError}</Text>
          ) : null}

          <View className="mt-5 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border" />
            <Text className="text-caption text-text-secondary">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-5">
            <SocialAuthButtons />
          </View>

          <View className="mb-4 mt-5 flex-row items-center justify-center gap-1">
            <Text className="text-body-md text-text-secondary">
              Don&apos;t have an account?
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-body-md text-lingua-purple">Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showVerification}
        email={email.trim() || "your email"}
        onClose={() => setShowVerification(false)}
        onVerify={async (code) => {
          const { error } = await signIn.emailCode.verifyCode({ code });
          if (error) {
            console.error(JSON.stringify(error, null, 2));
            return {
              success: false,
              errorMessage: "We couldn’t verify that code. Please try again.",
            };
          }

          if (signIn.status === "needs_second_factor") {
            return {
              success: false,
              errorMessage: "Two-factor authentication is required. Please complete it to continue.",
            };
          }

          if (signIn.status === "needs_client_trust") {
            return {
              success: false,
              errorMessage: "Please trust this device to continue signing in.",
            };
          }

          if (signIn.status !== "complete") {
            console.error("Sign-in attempt not complete:", signIn);
            return {
              success: false,
              errorMessage: "Your sign-in is not complete yet. Please try again.",
            };
          }

          const { error: finalizeError } = await signIn.finalize();
          if (finalizeError) {
            console.error(JSON.stringify(finalizeError, null, 2));
            return {
              success: false,
              errorMessage: "We couldn’t finish signing you in. Please try again.",
            };
          }

          return { success: true };
        }}
      />
    </SafeAreaView>
  );
}
