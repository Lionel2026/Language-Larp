import { useAuth } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const swatches = [
  { label: "Lingua Purple", className: "bg-lingua-purple" },
  { label: "Lingua Deep Purple", className: "bg-lingua-deep-purple" },
  { label: "Lingua Blue", className: "bg-lingua-blue" },
  { label: "Lingua Green", className: "bg-lingua-green" },
  { label: "Success", className: "bg-success" },
  { label: "Warning", className: "bg-warning" },
  { label: "Streak", className: "bg-streak" },
  { label: "Error", className: "bg-error" },
];

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="gap-6 px-6 pb-12 pt-16">
        <Text className="text-h1 text-text-primary">Design System</Text>

        <Link href="/onboarding" asChild>
          <TouchableOpacity className="items-center rounded-2xl bg-lingua-purple px-4 py-3">
            <Text className="text-h4 text-white">Open Onboarding</Text>
          </TouchableOpacity>
        </Link>

        <View className="gap-2">
          <Text className="text-h2 text-text-primary">Typography</Text>
          <Text className="text-h3 text-text-primary">Card / Module Title</Text>
          <Text className="text-h4 text-text-primary">Subheading</Text>
          <Text className="text-body-lg text-text-primary">
            Body large — important content
          </Text>
          <Text className="text-body-md text-text-secondary">
            Body medium — body text
          </Text>
          <Text className="text-body-sm text-text-secondary">
            Body small — supporting text
          </Text>
          <Text className="text-caption text-text-secondary">
            Caption — labels, meta text
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-h2 text-text-primary">Colors</Text>
          <View className="flex-row flex-wrap gap-3">
            {swatches.map((swatch) => (
              <View key={swatch.label} className="w-[100px] gap-1">
                <View
                  className={`h-16 w-full rounded-2xl border border-border ${swatch.className}`}
                />
                <Text className="text-caption text-text-secondary">
                  {swatch.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
