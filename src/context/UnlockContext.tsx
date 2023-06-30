import { createContext, useState, useEffect, useCallback } from "react";
import { Paywall } from "@unlock-protocol/paywall";
import { Web3Service } from "@unlock-protocol/unlock-js";
import { mainnet, goerli } from "@unlock-protocol/networks";
import { useMagic } from "@/hooks/useMagic";
import { useUser } from "@/hooks/useUser";
import { web3Service } from "@/lib/web3Service";
import { PaywallConfig, paywall } from "@/lib/paywall";

export const publicLockNetwork = parseInt(process.env.NEXT_PUBLIC_LOCK_NETWORK);
export const publicLockContract = process.env.NEXT_PUBLIC_LOCK_CONTRACT;
export const getUnlockNetworkConfig = (networkId: number) => {
  if (networkId === 1) {
    return mainnet;
  } else if (networkId === 5) {
    return goerli
  } else {
    throw new Error(`Network id is unsupported: ${networkId}`);
  }
}

const initialPaywallConfig: PaywallConfig = {
  network: publicLockNetwork,
  locks: {
    [publicLockContract]: {
      name: "Unlock + Magic",
      network: publicLockNetwork,
    },
  },
  autoconnect: false,
  useDelegatedProvider: true,
};

type UnlockContextType = {
  paywall: Paywall;
  paywallConfig: PaywallConfig;
  web3Service: Web3Service;
  hasValidKey: boolean;
  loading: boolean;
};

export const UnlockContext = createContext<UnlockContextType>({
  paywall: paywall!,
  paywallConfig: initialPaywallConfig,
  web3Service: web3Service!,
  hasValidKey: false,
  loading: true,
});

export const UnlockProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const { magic } = useMagic();
  const [web3Service, setWeb3Service] = useState<Web3Service>();
  const [paywall, setPaywall] = useState<Paywall>();
  const [paywallConfig] =
    useState<PaywallConfig>(initialPaywallConfig);
  const [hasValidKey, setHasValidKey] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hydrate paywall & web3Service instances once on mount
  useEffect(() => {
    const { paywall } = require("@/lib/paywall");
    setPaywall(paywall);
    const { web3Service } = require("@/lib/web3Service");
    setWeb3Service(web3Service);
  }, []);

  // Set the paywall config
  useEffect(() => {
    if (paywall) {
      paywall?.setPaywallConfig(paywallConfig);
    }
  }, [paywall, paywallConfig]);

  // Set the rpc provider for  paywall
  useEffect(() => {
    if (paywall && magic) {
      paywall.connect(magic.rpcProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magic, user]);

  // Create function that hydrates the hasValidKey state variable
  const checkHasValidKey = useCallback(async () => {
    if (user?.publicAddress && web3Service) {
      setLoading(true);
      try {
        const hasValidKey = await web3Service.getHasValidKey(
          publicLockContract,
          user.publicAddress,
          publicLockNetwork
        );
        setHasValidKey(hasValidKey);
      } catch (error) {
        /* no-op */
      }
    }
    setLoading(false);
  }, [user, web3Service]);

  // Check if connected user has key for lock
  useEffect(() => {
    checkHasValidKey();
  }, [checkHasValidKey]);

  if (!paywall || !web3Service) {
    return null;
  }

  return (
    <UnlockContext.Provider
      value={{
        web3Service,
        paywall,
        paywallConfig,
        hasValidKey,
        loading
      }}
    >
      {children}
    </UnlockContext.Provider>
  );
};
