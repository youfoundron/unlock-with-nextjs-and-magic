import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

// A custom hook to use context
export const useUser = () => useContext(UserContext);
