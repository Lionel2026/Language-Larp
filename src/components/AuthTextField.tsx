import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type AuthTextFieldProps = TextInputProps & {
  label: string;
  secureEntry?: boolean;
};

export function AuthTextField({
  label,
  secureEntry,
  ...inputProps
}: AuthTextFieldProps) {
  const [hidden, setHidden] = useState(secureEntry ?? false);

  return (
    <View className="rounded-2xl border border-border px-4 py-2">
      <Text className="text-caption text-text-secondary">{label}</Text>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 py-1 text-body-lg text-text-primary"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={hidden}
          {...inputProps}
        />
        {secureEntry && (
          <TouchableOpacity onPress={() => setHidden((prev) => !prev)}>
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
