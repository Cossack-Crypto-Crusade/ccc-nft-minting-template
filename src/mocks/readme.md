# 🧩 NFT Mock Data

This directory contains mock NFT data used for frontend development and testing in the **CCC NFT Minting Template**.

It allows you to simulate NFT collections, attributes, and metadata without connecting to a live Solana Candy Machine or backend API.

---

## 📦 Structure

Each mock NFT is defined in [`nfts.ts`](./nfts.ts) using a typed interface compatible with the global React context (`NftProvider`).

### Example Structure

```ts
export interface Nft {
  id: string;               // unique identifier
  name: string;             // NFT display name
  symbol: string;           // collection symbol
  description: string;      // NFT description
  image: string;            // image URL (Arweave/IPFS/placeholder)
  attributes: {             // NFT trait data
    trait_type: string;
    value: string;
  }[];
  properties: {
    files: { uri: string; type: string }[];
    category: string;
    creators: { address: string; share: number }[];
  };
}
```

---

## 🧠 Adding New Mock NFTs

To add new mock NFTs, simply append an entry to the `nfts` array:

```ts
export const nfts: Nft[] = [
  {
    id: "1",
    name: "Mystery NFT",
    symbol: "SLAVA",
    description: "This NFT is part of the Slava Collection. The actual artwork and traits will be revealed soon!",
    image: "https://arweave.net/Rw3Aam6pixLGbcDi48E5DvTU8mzC1bi-fE7715HT9cA",
    attributes: [{ trait_type: "Reveal Status", value: "Not revealed yet" }],
    properties: {
      files: [
        {
          uri: "https://arweave.net/Rw3Aam6pixLGbcDi48E5DvTU8mzC1bi-fE7715HT9cA",
          type: "image/jpeg"
        }
      ],
      category: "image",
      creators: [
        { address: "2DJHpzAri1BP4rc8QAcPfU5y9QSs82o65FJ41SQfBiVg", share: 100 }
      ]
    }
  },
  // Add more NFTs here
];
```

---

## ⚙️ Usage

1. The mock data is provided globally through `NftProvider`.
2. Access the mock NFTs anywhere in your app using the `useNfts()` hook.

```tsx
import { useNfts } from "@/context/NftProvider";

const MyComponent = () => {
  const nfts = useNfts();

  return (
    <div>
      {nfts.map((nft) => (
        <div key={nft.id}>{nft.name}</div>
      ))}
    </div>
  );
};
```

---

## 🧪 Testing

You can preview the mock NFTs by visiting:

```
http://localhost:3000/mock-test
```

*(Available once `app/mock-test/page.tsx` is added.)*

---

## 💡 Notes

- This mock data is purely for **frontend simulation**.  
- The real Candy Machine / Umi / Solana integration will replace this layer once the backend is wired.  
- Keep the mock NFTs lightweight (no massive image files).  
- Use Arweave/IPFS or placeholder URLs to mirror production structure.

---

### 🔗 Quick Access Badge

You can add this badge to your main `README.md` to jump directly to the mock NFT test page:

```markdown
[![🧩 View Mock NFTs](https://img.shields.io/badge/View%20Mock%20NFTs-ccc?style=for-the-badge&logo=react)](http://localhost:3000/mock-test)
```

---

**Maintainer**: [Cossack Crypto Crusade](https://github.com/Cossack-Crypto-Crusade)  
**Component**: `src/mocks/nfts.ts`  
**Purpose**: Local NFT simulation layer for UI development.
