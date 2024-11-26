import { Address } from "viem";

import {
  contractRegistrations,
  EntryPointV0_7_0_AccountDeployed_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

const KERNEL_V3_META_FACTORY = "0xd703aae79538628d27099b8c4f621be4ccd142d5";
const BICONOMY_NEXUS_K1_FACTORY = "0x00000bb19a3579f4d779215def97afbd0e30db55";

// Compatible account factories
// Currently, Kernel V3 and Biconomy Nexus are supported
const FACTORIES = [KERNEL_V3_META_FACTORY, BICONOMY_NEXUS_K1_FACTORY];

EntryPointV0_7_0.AccountDeployed.contractRegister(({ event, context }) => {
  handleAccountDeployedContractRegister(event, context);
});

async function handleAccountDeployedContractRegister(
  event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
  context: contractRegistrations
) {
  const factory = event.params.factory.toLowerCase();
  const address = event.params.sender.toLowerCase() as Address;

  if (!FACTORIES.includes(factory)) {
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
  const address = event.params.sender.toLowerCase() as Address;
  const createdAt = event.block.timestamp;

  if (!FACTORIES.includes(factory)) {
    return;
  }

  context.Account.set({
    id: `${event.chainId}-${address}`,
    chainId: event.chainId,
    address,
    factory,
    createdAt,
  });
}
