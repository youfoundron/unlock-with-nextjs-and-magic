import { useContext } from "react";
import { UnlockContext } from "@/context/UnlockContext";

// A custom hook to use context
export const useUnlock = () => useContext(UnlockContext);
