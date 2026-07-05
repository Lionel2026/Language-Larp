import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";

// expo-image isn't a core React Native host component, so NativeWind can't
// resolve `className` into `style` on it without this registration.
export const Image = styled(ExpoImage, { className: "style" });
