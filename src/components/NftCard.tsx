import { motion } from "framer-motion";
import { Nft } from "@/mocks/nfts";

export const NftCard: React.FC<{ nft: Nft }> = ({ nft }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
    >
      <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{nft.name}</h3>
        <p className="text-sm text-gray-600">{nft.description}</p>
        {nft.attributes.map((attr, idx) => (
          <p key={idx} className="text-xs text-gray-500">{`${attr.trait_type}: ${attr.value}`}</p>
        ))}
      </div>
    </motion.div>
  );
};
