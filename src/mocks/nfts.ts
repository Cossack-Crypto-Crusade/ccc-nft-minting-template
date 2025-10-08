export interface NftAttribute {
  trait_type: string;
  value: string;
}

export interface NftFile {
  uri: string;
  type: string;
}

export interface NftCreator {
  address: string;
  share: number;
}

export interface NftProperties {
  files: NftFile[];
  category: string;
  creators: NftCreator[];
}

export interface Nft {
  id: string; // unique identifier
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
  properties: NftProperties;
}

// Mock NFT array
export const nfts: Nft[] = [
  {
    id: "1",
    name: "Mystery NFT",
    symbol: "SLAVA",
    description: "This NFT is part of the Slava Collection. The actual artwork and traits will be revealed soon!",
    image: "https://arweave.net/Rw3Aam6pixLGbcDi48E5DvTU8mzC1bi-fE7715HT9cA",
    attributes: [
      { trait_type: "Reveal Status", value: "Not revealed yet" }
    ],
    properties: {
      files: [
        { uri: "https://arweave.net/Rw3Aam6pixLGbcDi48E5DvTU8mzC1bi-fE7715HT9cA", type: "image/jpeg" }
      ],
      category: "image",
      creators: [
        { address: "2DJHpzAri1BP4rc8QAcPfU5y9QSs82o65FJ41SQfBiVg", share: 100 }
      ]
    }
  }
];
