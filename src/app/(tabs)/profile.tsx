import { colors } from "@/theme";
import { useAuth } from "@clerk/expo";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setSignOutError(null);
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
      setSignOutError("We couldn’t sign you out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-h3 text-text-primary">Profile</Text>

        <TouchableOpacity onPress={handleSignOut} disabled={isSigningOut}>
          <Text className="text-body-md text-text-secondary">Sign Out</Text>
        </TouchableOpacity>

        {signOutError ? (
          <Text className="mt-3 text-body-sm text-danger">{signOutError}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
