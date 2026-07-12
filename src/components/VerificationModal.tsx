import { colors } from "@/theme";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationResult = {
  success: boolean;
  errorMessage?: string;
};

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify?: (code: string) => Promise<VerificationResult> | VerificationResult;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;
    const focusTimeout = setTimeout(() => {
      setCode("");
      setVerificationError(null);
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(focusTimeout);
  }, [visible]);

  const handleChangeCode = async (value: string) => {
    const digits = value.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length !== CODE_LENGTH) {
      return;
    }

    Keyboard.dismiss();

    const verificationResult = await Promise.resolve(
      onVerify?.(digits) ?? { success: false, errorMessage: "Unable to verify your code. Please try again." }
    );

    if (verificationResult.success) {
      setVerificationError(null);
      onClose();
      router.replace("/");
      return;
    }

    setVerificationError(
      verificationResult.errorMessage ?? "Unable to verify your code. Please try again."
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 bg-black/40" />
        </TouchableWithoutFeedback>

        <View className="rounded-t-3xl bg-white px-6 pb-10 pt-6">
          <View className="mb-5 h-1 w-10 self-center rounded-full bg-border" />

          <Text className="text-h2 text-text-primary">Check your email</Text>
          <Text className="mt-2 text-body-md text-text-secondary">
            We sent a 6-digit code to{" "}
            <Text className="text-text-primary">{email}</Text>. Enter it
            below to verify your account.
          </Text>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            className="mt-6 flex-row justify-between"
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <View
                key={index}
                className={`h-14 w-12 items-center justify-center rounded-2xl border ${
                  index < code.length ? "border-lingua-purple" : "border-border"
                }`}
              >
                <Text className="text-h3 text-text-primary">
                  {code[index] ?? ""}
                </Text>
              </View>
            ))}
          </TouchableOpacity>

          {verificationError ? (
            <Text className="mt-4 text-body-sm text-danger">
              {verificationError}
            </Text>
          ) : null}

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChangeCode}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            placeholderTextColor={colors.textSecondary}
            style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
