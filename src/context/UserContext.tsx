import React, { createContext, useCallback, useEffect, useState } from "react";
import { MagicUserMetadata } from "magic-sdk";
import { useMagic } from "@/hooks/useMagic";

type UserData = MagicUserMetadata | null;
type UserContextType = {
  user: UserData;
  loading: boolean;
  logout: () => void;
  loginWithEmail: (email: string) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null, // Initially, no user is logged in
  loading: true, // Initially user is being fetched
  logout: () => {}, // Placeholder function, will be overwritten by provider
  loginWithEmail: () => {}, // Placeholder function, will be overwritten by provider
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { magic } = useMagic();
  const [user, setUser] = useState<UserData>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const _hydateUserState = useCallback(async () => {
    try {
      // Set loading to true while we are fetching user state
      setLoading(true);
      // Check if the user is authenticated already
      if (await magic.user.isLoggedIn()) {
        // Pull their data, update the user state
        setUser(await magic.user.getInfo());
      } else {
        // Reset the user state
        setUser(null);
      }
    } finally {
      // Set loading to false once we are finished
      setLoading(false);
    }
  }, [magic, setUser, setLoading]);

  const loginWithEmail = useCallback(
    async (email: string) => {
      // Invoke magic link flow
      await magic.auth.loginWithMagicLink({ email });
      // Hydrate user state after successful login
      await _hydateUserState();
    },
    [magic, _hydateUserState]
  );

  const logout = useCallback(async () => {
    // Call Magic's logout method
    await magic.user.logout();
    // reset the user state
    setUser(null);
  }, [magic, setUser]);

  // Hydrate the user state once component is mounted
  useEffect(() => {
    _hydateUserState();
    // Add an empty dependency array so the useEffect only runs once upon page load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        logout,
        loginWithEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
