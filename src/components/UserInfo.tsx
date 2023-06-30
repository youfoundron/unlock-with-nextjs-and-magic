import { useUnlock } from "@/hooks/useUnlock";
import { useUser } from "@/hooks/useUser";
import { useCallback } from "react";

export const UserInfo = () => {
  const { user, logout } = useUser();
  const { paywall, paywallConfig, wallet } = useUnlock();

  if (!user || !paywall || !wallet) {
    throw Error('Cannot render component without context variables')
  }

  const handleCheckout = useCallback(() => {
    paywall.loadCheckoutModal(paywallConfig)
  }, [paywall, paywallConfig])

  return (
    <div>
      <p>
        Logged in with account <code>{user.publicAddress}</code>
      </p>
      <button onClick={logout}>Logout</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};
