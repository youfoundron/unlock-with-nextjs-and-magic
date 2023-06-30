import { createContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Paywall } from "@unlock-protocol/paywall";
import { Web3Service } from "@unlock-protocol/unlock-js";
import { PaywallConfig, paywall } from "@/lib/paywall";
import { useMagic } from "@/hooks/useMagic";
import { web3Service } from "@/lib/web3Service";
import { useUser } from "@/hooks/useUser";

const PUBLIC_LOCK_NETWORK = 5;
const PUBLIC_LOCK_CONTRACT = '0x4aac1f8cdb47520f27e193a568e441ba2f4d8658';

const initialPaywallConfig: PaywallConfig = {
  network: PUBLIC_LOCK_NETWORK, // (network 1 is for mainnet, 5 is for goerli, etc)
  locks: {
    [PUBLIC_LOCK_CONTRACT]: {
      name: "Unlock + Magic",
    },
  },
  autoconnect: false,
  useDelegatedProvider: true,
};

type UnlockContextType = {
  paywall: Paywall;
  paywallConfig: PaywallConfig;
  web3Service: Web3Service;
  userHasKey: boolean;
};

export const UnlockContext = createContext<UnlockContextType>({
  paywall: paywall!,
  paywallConfig: initialPaywallConfig,
  web3Service: web3Service!,
  userHasKey: false,
});

export const UnlockProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const { magic } = useMagic();
  const [web3Service, setWeb3Service] = useState<Web3Service>();
  const [paywall, setPaywall] = useState<Paywall>();
  const [paywallConfig, setPaywallConfig] =
    useState<PaywallConfig>(initialPaywallConfig);
  const [userHasKey, setUserHasKey] = useState(false);

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

  // Create function that hydrates the userHasKey state variable
  const checkUserHasKey = useCallback(async () => {
    if (user?.publicAddress && web3Service) {
      const lock = await web3Service.getLockContract(
        PUBLIC_LOCK_CONTRACT,
        new ethers.providers.Web3Provider(magic.rpcProvider as any)
      );
      // TODO: query lock contract against user.address
      // ie, const hasKey = await lock.callStatic.???()
      const hasKey = false;
      setUserHasKey(hasKey);
    }
  }, [user, web3Service, magic]);

  // Check if connected user has key for lock
  useEffect(() => {
    checkUserHasKey();
  }, [checkUserHasKey])

  if (!paywall || !web3Service) {
    return null;
  }

  return (
    <UnlockContext.Provider
      value={{
        web3Service,
        paywall,
        paywallConfig,
        userHasKey,
      }}
    >
      {children}
    </UnlockContext.Provider>
  );
};
