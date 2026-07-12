import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type PrimaryButtonProps = TouchableOpacityProps & {
  label: string;
};

export function PrimaryButton({
  label,
  className,
  ...touchableProps
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className={`items-center justify-center rounded-full bg-lingua-purple py-4 ${className ?? ""}`}
      {...touchableProps}
    >
      <Text className="text-h4 text-white">{label}</Text>
    </TouchableOpacity>
  );
}
