//네트워크 정보임. 현재는 개발 환경이 goerli로 되어있어 goerli로 해놓을게요

export const networks = {
  // polygon mainnet
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },

  // polygon mumbai testnet
  polygonMumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: 'Polygon Testnet Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },

  // goerli testnet
  goerli: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: 'Ethereum Testnet Goerli',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
};
