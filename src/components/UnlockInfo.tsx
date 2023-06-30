import { useCallback } from "react";
import { useUnlock } from "@/hooks/useUnlock";
import {
  publicLockNetwork,
  publicLockContract,
  getUnlockNetworkConfig,
} from "@/context/UnlockContext";
import { Spinner } from "./Spinner";

const networkConfig = getUnlockNetworkConfig(publicLockNetwork);

export const UnlockInfo = () => {
  const { loading, paywall, hasValidKey } = useUnlock();

  if (!paywall) {
    throw Error("Cannot render component without unlock context");
  }

  const handleCheckout = useCallback(() => {
    paywall.loadCheckoutModal();
  }, [paywall]);

  const isAuthorized = !loading && hasValidKey;
  const isNotAuthorized = !loading && !hasValidKey;

  return (
    <div>
      <p>
        Token gated on {networkConfig.name} by contract:{" "}
        <a href={networkConfig?.explorer?.urls?.address(publicLockContract)}>
          <code>{publicLockContract}</code>
        </a>
      </p>
      {loading && <Spinner />}
      {isAuthorized && <p>Congrats! You have a valid key.</p>}
      {isNotAuthorized && (
        <button onClick={handleCheckout}>Get Key</button>
      )}
    </div>
  );
};

