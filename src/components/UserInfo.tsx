import { useUser } from "@/hooks/useUser";

export const UserInfo = () => {
  const { user, logout } = useUser();

  if (!user?.publicAddress) {
    throw Error('Cannot render component without user')
  }

  return (
    <div>
      <p>
        Logged in with account <code>{user.publicAddress}</code>
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
