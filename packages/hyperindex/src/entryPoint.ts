import { Address, createPublicClient, Hex, http, padHex, zeroHash } from "viem";

import {
  contractRegistrations,
  EntryPointV0_7_0_AccountDeployed_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

import { toChain } from "./chains";

// Compatible account implementations
// Currently, Kernel V3 and Biconomy Nexus are supported
const IMPLEMENTATIONS = [
  "0x94f097e1ebeb4eca3aae54cabb08905b239a7d27",
  "0xbac849bb641841b44e965fb01a4bf5f074f84b4d",
  "0x000000039dfcad030719b07296710f045f0558f7",
];

EntryPointV0_7_0.AccountDeployed.contractRegister(({ event, context }) => {
  handleAccountDeployedContractRegister(event, context);
});

async function handleAccountDeployedContractRegister(
  event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
  context: contractRegistrations
) {
  const chainId = event.chainId;
  const address = event.params.sender.toLowerCase() as Address;

  const implementation = await getImplementation(chainId, address);
  if (!implementation) {
    return;
  }
  if (!IMPLEMENTATIONS.includes(implementation)) {
    return;
  }

  context.addERC7579Account(address);
}

EntryPointV0_7_0.AccountDeployed.handler(async ({ event, context }) => {
  handleAccountDeployedEvent(event, context);
});

async function handleAccountDeployedEvent(
  event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
  context: handlerContext
) {
  const factory = event.params.factory.toLowerCase();
  const chainId = event.chainId;
  const address = event.params.sender.toLowerCase() as Address;
  const createdAt = event.block.timestamp;

  const implementation = await getImplementation(chainId, address);
  if (!implementation) {
    return;
  }
  if (!IMPLEMENTATIONS.includes(implementation)) {
    return;
  }

  context.Account.set({
    id: `${event.chainId}-${address}`,
    chainId: event.chainId,
    address,
    factory,
    implementation,
    createdAt,
  });
}

async function getImplementation(
  chainId: number,
  address: Address
): Promise<Address | null> {
  function toAddress(slotValue: Hex | undefined): Address | null {
    if (!slotValue) {
      return null;
    }
    if (slotValue === zeroHash) {
      return null;
    }
    const address = `0x${slotValue.slice(-40)}` as Address;
    // First 12 bytes should be zero
    if (padHex(address) !== slotValue) {
      return null;
    }
    return address;
  }

  const EIP1967_IMPL_SLOT =
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

  const chain = toChain(chainId);
  if (!chain) {
    throw new Error("Unable to get chain data");
  }
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const slotValue = await client.getStorageAt({
    address,
    slot: EIP1967_IMPL_SLOT,
  });
  const slotAddress = toAddress(slotValue);
  if (slotAddress) {
    return slotAddress;
  }
  return null;
}
