import { AuthTextField } from "@/components/AuthTextField";
import { Image } from "@/components/Image";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { isValidAuthEmail } from "@/lib/auth";
import { colors } from "@/theme";
import { useSignUp } from "@clerk/expo";
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

type VerificationResult = {
  success: boolean;
  errorMessage?: string;
};

export default function SignUp() {
  const { signUp, fetchStatus } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const handleSignUp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!isValidAuthEmail(normalizedEmail) || !trimmedPassword) {
      setSignUpError("Please enter a valid email and password.");
      return;
    }

    setSignUpError(null);

    const { error: passwordError } = await signUp.password({
      emailAddress: normalizedEmail,
      password,
    });
    if (passwordError) {
      console.error(JSON.stringify(passwordError, null, 2));
      setSignUpError("We couldn’t create your account. Please try again.");
      return;
    }

    const { error: codeError } = await signUp.verifications.sendEmailCode();
    if (codeError) {
      console.error(JSON.stringify(codeError, null, 2));
      setSignUpError("We couldn’t send the verification code. Please try again.");
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

          <Text className="mt-3 text-h1 text-text-primary">
            Create your account
          </Text>
          <Text className="mt-2 text-body-md text-text-secondary">
            Start your language journey today ✨
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
            <AuthTextField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>

          <PrimaryButton
            label="Sign Up"
            className="mt-5"
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
          />

          {signUpError ? (
            <Text className="mt-3 text-body-sm text-danger">{signUpError}</Text>
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
              Already have an account?
            </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-body-md text-lingua-purple">Log in</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View nativeID="clerk-captcha" />
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showVerification}
        email={email.trim() || "your email"}
        onClose={() => setShowVerification(false)}
        onVerify={async (code): Promise<VerificationResult> => {
          const { error } = await signUp.verifications.verifyEmailCode({ code });
          if (error) {
            console.error(JSON.stringify(error, null, 2));
            return {
              success: false,
              errorMessage: "We couldn’t verify that code. Please try again.",
            };
          }

          if (signUp.status === "missing_requirements") {
            const requiredFields = signUp.missingFields ?? [];
            const updatePayload = requiredFields.reduce<Record<string, unknown>>(
              (acc, field) => {
                if (field === "username") {
                  acc.username = email.trim().split("@")[0];
                } else if (field === "first_name") {
                  acc.firstName = "";
                } else if (field === "last_name") {
                  acc.lastName = "";
                } else if (field === "email_address") {
                  acc.emailAddress = email.trim().toLowerCase();
                }
                return acc;
              },
              {}
            );

            if (Object.keys(updatePayload).length > 0) {
              const { error: updateError } = await signUp.update(updatePayload);
              if (updateError) {
                console.error(JSON.stringify(updateError, null, 2));
                return {
                  success: false,
                  errorMessage: "We couldn’t finish setting up your account. Please try again.",
                };
              }
            }
          }

          if (signUp.status !== "complete") {
            console.error("Sign-up attempt not complete:", signUp);
            return {
              success: false,
              errorMessage: "Your sign-up is not complete yet. Please try again.",
            };
          }

          const { error: finalizeError } = await signUp.finalize();
          if (finalizeError) {
            console.error(JSON.stringify(finalizeError, null, 2));
            return {
              success: false,
              errorMessage: "We couldn’t finish setting up your account. Please try again.",
            };
          }

          return { success: true };
        }}
      />
    </SafeAreaView>
  );
}
