import { Magic } from "magic-sdk";
import {
  SDKBase,
  InstanceWithExtensions,
  MagicSDKExtensionsOption,
} from "@magic-sdk/provider";

const createMagic = (key: string) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  if (typeof window === "undefined") return
  return new Magic(key);
};

// Pass in your publishable key from your .env file
export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
export type MagicSDK = InstanceWithExtensions<
  SDKBase,
  MagicSDKExtensionsOption<string>
>;