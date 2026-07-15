import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarProps } from "expo-router/js-tabs";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ROW_HEIGHT = 64;
const CIRCLE_SIZE = 48;

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_ICONS: Record<string, { icon: IconName; activeIcon: IconName }> = {
  index: { icon: "home-outline", activeIcon: "home" },
  learn: { icon: "book-outline", activeIcon: "book" },
  "ai-teacher": {
    icon: "sparkles-outline",
    activeIcon: "sparkles",
  },
  chat: {
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
  },
  profile: { icon: "person-outline", activeIcon: "person" },
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const [tabLayouts, setTabLayouts] = useState<
    Record<number, { x: number; width: number }>
  >({});
  const indicatorX = useSharedValue(0);
  const isFirstMeasure = useRef(true);

  const activeLayout = tabLayouts[state.index];

  useEffect(() => {
    if (!activeLayout) return;

    const target = activeLayout.x + activeLayout.width / 2 - CIRCLE_SIZE / 2;

    if (isFirstMeasure.current) {
      indicatorX.value = target;
      isFirstMeasure.current = false;
    } else {
      indicatorX.value = withTiming(target, {
        duration: 250,
        easing: Easing.linear,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index, activeLayout?.x, activeLayout?.width]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="border-t border-border bg-background"
    >
      <View style={{ height: ROW_HEIGHT }} className="flex-row px-2">
        {activeLayout ? (
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: "absolute",
                top: (ROW_HEIGHT - CIRCLE_SIZE) / 2,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
              },
              indicatorStyle,
            ]}
            className="bg-lingua-purple"
          />
        ) : null}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.title ?? route.name;
          const { icon, activeIcon } = TAB_ICONS[route.name] ?? {
            icon: "ellipse-outline",
            activeIcon: "ellipse",
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              onPress={onPress}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                setTabLayouts((prev) => ({ ...prev, [index]: { x, width } }));
              }}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center gap-1"
            >
              <Ionicons
                name={isFocused ? activeIcon : icon}
                size={22}
                color={isFocused ? "#FFFFFF" : colors.textSecondary}
              />
              {!isFocused ? (
                <Text className="text-caption text-text-secondary">
                  {label}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
