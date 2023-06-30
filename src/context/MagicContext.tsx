import React, { createContext, useEffect, useState } from "react";
import { MagicSDK, magic } from "@/lib/magic";

type MagicContextType = {
  magic: MagicSDK;
};

export const MagicContext = createContext<MagicContextType>({
  magic: magic!,
});

export const MagicProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [magic, setMagic] = useState<MagicSDK>();

  useEffect(() => {
    const { magic } = require("@/lib/magic");
    setMagic(magic);
  }, []);

  if (!magic) {
    return null;
  }

  return (
    <MagicContext.Provider value={{ magic }}>{children}</MagicContext.Provider>
  );
};
