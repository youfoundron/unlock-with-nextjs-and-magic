import { AppProps } from "next/app";
import { MagicProvider } from "@/context/MagicContext";
import { UserProvider } from "@/context/UserContext";

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <MagicProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MagicProvider>
  )
}
