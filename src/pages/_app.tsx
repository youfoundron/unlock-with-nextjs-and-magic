import { AppProps } from "next/app";
import { MagicProvider } from "@/context/MagicContext";
import { UserProvider } from "@/context/UserContext";
import { UnlockProvider } from "@/context/UnlockContext";

export default function App ({ Component, pageProps }: AppProps) {  
  return (
    <MagicProvider>
      <UserProvider>
        <UnlockProvider>
          <Component {...pageProps} />
        </UnlockProvider>
      </UserProvider>
    </MagicProvider>
  )
}
