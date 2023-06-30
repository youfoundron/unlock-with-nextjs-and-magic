import Paywall from "@unlock-protocol/paywall";
import { networks } from "@unlock-protocol/networks";

const createPaywall = () => {
  // We make sure that the window object is available
  // Then we create a new instance of Unlock's paywall library
  if (typeof window === "undefined") return;
  return new Paywall(networks);
};

export const paywall = createPaywall();

// This interface describes an individual paywall's config
// I am declaring it here because the bundle from '@unlock-protocol/types' is not working
// https://github.com/unlock-protocol/unlock/blob/056d0e568dadaff2ca4b8c611306843d6218c2f8/packages/types/src/types/unlockTypes.ts#L218C1-L231C1
export interface PaywallConfig {
  network: number;
  locks: PaywallConfigLocks;
  icon?: string;
  pessimistic?: boolean;
  unlockUserAccounts?: true | "true" | false;
  persistentCheckout?: boolean;
  useDelegatedProvider?: boolean;
  autoconnect?: boolean;
  // callToAction: PaywallCallToAction // TODO: to remove, deprecated
  // metadataInputs?: MetadataInput[]
}

export interface PaywallConfigLocks {
  [address: string]: PaywallConfigLock;
}

export interface PaywallConfigLock {
  name?: string;
  network?: number;
}