import { useNfts } from "@/components/NftProvider";
import { NftCard } from "./NftCard";

export const NftList: React.FC = () => {
  const nfts = useNfts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NftCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};
