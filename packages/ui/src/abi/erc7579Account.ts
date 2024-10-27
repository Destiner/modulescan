const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'moduleTypeId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'module',
        type: 'address',
      },
    ],
    name: 'ModuleInstalled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'moduleTypeId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'module',
        type: 'address',
      },
    ],
    name: 'ModuleUninstalled',
    type: 'event',
  },
  {
    inputs: [
      {
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onInstall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export default abi;
