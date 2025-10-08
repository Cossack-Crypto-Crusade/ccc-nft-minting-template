"use client";

import React, { createContext, useContext } from "react";
import { nfts, Nft } from "@/mocks/nfts";

interface NftContextType {
  nfts: Nft[];
}

const NftContext = createContext<NftContextType | undefined>(undefined);

export const NftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <NftContext.Provider value={{ nfts }}>{children}</NftContext.Provider>;
};

export const useNfts = () => {
  const context = useContext(NftContext);
  if (!context) throw new Error("useNfts must be used within NftProvider");
  return context.nfts;
};
