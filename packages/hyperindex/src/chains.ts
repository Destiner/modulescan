import { type Chain } from "viem";
import {
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
  arbitrumNova,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  baseSepolia,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  celo,
  mainnet,
  sepolia,
  goerli,
  holesky,
  fantom,
  gnosis,
  immutableZkEvm,
  immutableZkEvmTestnet,
  optimism,
  optimismGoerli,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scroll,
  scrollSepolia,
  zksync,
  zksyncSepoliaTestnet,
} from "viem/chains";

const ARBITRUM = arbitrum.id;
const ARBITRUM_GOERLI = arbitrumGoerli.id;
const ARBITRUM_SEPOLIA = arbitrumSepolia.id;
const ARBITRUM_NOVA = arbitrumNova.id;
const AVALANCHE_C = avalanche.id;
const AVALANCHE_FUJI = avalancheFuji.id;
const BASE = base.id;
const BASE_GOERLI = baseGoerli.id;
const BASE_SEPOLIA = baseSepolia.id;
const BLAST = blast.id;
const BLAST_SEPOLIA = blastSepolia.id;
const BSC = bsc.id;
const BSC_TESTNET = bscTestnet.id;
const CELO = celo.id;
const ETHEREUM = mainnet.id;
const SEPOLIA = sepolia.id;
const GOERLI = goerli.id;
const HOLESKY = holesky.id;
const FANTOM = fantom.id;
const GNOSIS = gnosis.id;
const IMMUTABLE_ZKEVM = immutableZkEvm.id;
const IMMUTABLE_ZKEVM_TESTNET = immutableZkEvmTestnet.id;
const OPTIMISM = optimism.id;
const OPTIMISM_GOERLI = optimismGoerli.id;
const OPTIMISM_SEPOLIA = optimismSepolia.id;
const POLYGON = polygon.id;
const POLYGON_AMOY = polygonAmoy.id;
const POLYGON_MUMBAI = polygonMumbai.id;
const POLYGON_ZKEVM = polygonZkEvm.id;
const POLYGON_ZKEVM_TESTNET = polygonZkEvmTestnet.id;
const SCROLL = scroll.id;
const SCROLL_SEPOLIA = scrollSepolia.id;
const ZKSYNC_ERA = zksync.id;
const ZKSYNC_ERA_SEPOLIA = zksyncSepoliaTestnet.id;

function toChain(id: number): Chain | null {
  switch (id) {
    case ARBITRUM: {
      return arbitrum;
    }
    case ARBITRUM_GOERLI: {
      return arbitrumGoerli;
    }
    case ARBITRUM_SEPOLIA: {
      return arbitrumSepolia;
    }
    case ARBITRUM_NOVA: {
      return arbitrumNova;
    }
    case AVALANCHE_C: {
      return avalanche;
    }
    case AVALANCHE_FUJI: {
      return avalancheFuji;
    }
    case BASE: {
      return base;
    }
    case BASE_GOERLI: {
      return baseGoerli;
    }
    case BASE_SEPOLIA: {
      return baseSepolia;
    }
    case BLAST: {
      return blast;
    }
    case BLAST_SEPOLIA: {
      return blastSepolia;
    }
    case BSC: {
      return bsc;
    }
    case BSC_TESTNET: {
      return bscTestnet;
    }
    case CELO: {
      return celo;
    }
    case ETHEREUM: {
      return mainnet;
    }
    case SEPOLIA: {
      return sepolia;
    }
    case GOERLI: {
      return goerli;
    }
    case HOLESKY: {
      return holesky;
    }
    case FANTOM: {
      return fantom;
    }
    case GNOSIS: {
      return gnosis;
    }
    case IMMUTABLE_ZKEVM: {
      return immutableZkEvm;
    }
    case IMMUTABLE_ZKEVM_TESTNET: {
      return immutableZkEvmTestnet;
    }
    case OPTIMISM: {
      return optimism;
    }
    case OPTIMISM_GOERLI: {
      return optimismGoerli;
    }
    case OPTIMISM_SEPOLIA: {
      return optimismSepolia;
    }
    case POLYGON: {
      return polygon;
    }
    case POLYGON_AMOY: {
      return polygonAmoy;
    }
    case POLYGON_MUMBAI: {
      return polygonMumbai;
    }
    case POLYGON_ZKEVM: {
      return polygonZkEvm;
    }
    case POLYGON_ZKEVM_TESTNET: {
      return polygonZkEvmTestnet;
    }
    case SCROLL: {
      return scroll;
    }
    case SCROLL_SEPOLIA: {
      return scrollSepolia;
    }
    case ZKSYNC_ERA: {
      return zksync;
    }
    case ZKSYNC_ERA_SEPOLIA: {
      return zksyncSepoliaTestnet;
    }
    default: {
      return null;
    }
  }
}

export { toChain };
