import { useContext } from "react";
import { MagicContext } from "@/context/MagicContext";

// A custom hook to use context
export const useMagic = () => useContext(MagicContext);
