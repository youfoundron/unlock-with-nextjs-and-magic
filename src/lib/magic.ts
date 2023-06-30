import { EthNetworkConfiguration, Magic } from "magic-sdk";
import {
  SDKBase,
  InstanceWithExtensions,
  MagicSDKExtensionsOption,
} from "@magic-sdk/provider";

const getEthNetworkConfig = (networkId: number): EthNetworkConfiguration => {
  if (networkId === 1) {
    return "mainnet";
  } else if (networkId === 5) {
    return "goerli";
  } else {
    throw new Error(`Network id is unsupported: ${networkId}`);
  }
};

const createMagic = (key: string, networkId: string | number) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  if (typeof window === "undefined") return;
  return new Magic(key, {
    network: getEthNetworkConfig(parseInt(networkId.toString())),
  });
};

// Pass in your publishable key from your .env file
export const magic = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
  process.env.NEXT_PUBLIC_LOCK_NETWORK
);
export type MagicSDK = InstanceWithExtensions<
  SDKBase,
  MagicSDKExtensionsOption<string>
>;
