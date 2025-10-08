"use client";

import { NftProvider } from "@/components/NftProvider";
import { NftList } from "@/components/NftList";

export default function MockTestPage() {
  return (
    <NftProvider>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">NFT Mock Test</h1>
        <NftList />
      </div>
    </NftProvider>
  );
}
