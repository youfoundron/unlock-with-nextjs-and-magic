import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { useUnlock } from "@/hooks/useUnlock";
import { useRouter } from "next/router";

export default function PaywallPage() {
  const router = useRouter();
  const { loading, hasValidKey } = useUnlock();

  // Redirect user to index page if they do not have a valid key
  useEffect(() => {
    if (!loading && !hasValidKey) {
      setTimeout(() => router.push('/'), 3000)
    }
  }, [router, loading, hasValidKey])
  
  if (loading) return (
    <div>
      <h1>Checking if you can pass the paywall</h1>
      <Spinner />
    </div>
  );

  if (!loading && !hasValidKey) {
    return (
      <div>
        <h1>You do not have access to this page!</h1>
        <p>You will be redirected shortly...</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Congrats!</h1>
      <p>You have access to this page.</p>
    </div>
  );
}
