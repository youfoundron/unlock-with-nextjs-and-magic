import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

// A custom hook to use context
export const useUser = () => useContext(UserContext);
