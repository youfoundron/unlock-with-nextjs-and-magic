import { useUser } from "@/hooks/useUser";
import { Spinner } from "@/components/Spinner";
import { UserInfo } from "@/components/UserInfo";
import { LoginForm } from "@/components/LoginForm";

export default function IndexPage() {
  const { user, loading: userIsLoading } = useUser();

  const userIsLoggedIn = user;
  const userIsLoggedOut = !userIsLoading && !user;

  return (
    <div>
      <h1>Unlock with Next.js & Magic</h1>
      {userIsLoading && <Spinner />}
      {userIsLoggedIn && <UserInfo />}
      {userIsLoggedOut && <LoginForm />}
    </div>
  );
}
