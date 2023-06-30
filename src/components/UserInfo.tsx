import { useUnlock } from "@/hooks/useUnlock";
import { useUser } from "@/hooks/useUser";
import { useCallback } from "react";

export const UserInfo = () => {
  const { user, logout } = useUser();
  const { paywall, userHasKey } = useUnlock();

  if (!user || !paywall) {
    throw Error('Cannot render component without context variables')
  }

  const handleCheckout = useCallback(() => {
    paywall.loadCheckoutModal()
  }, [paywall])

  return (
    <div>
      <p>
        Logged in with account <code>{user.publicAddress}</code>
      </p>
      {!userHasKey && <button onClick={handleCheckout}>Get Key</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};
