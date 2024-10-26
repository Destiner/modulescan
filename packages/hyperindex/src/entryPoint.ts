import {
  contractRegistrations,
  EntryPointV0_7_0_AccountDeployed_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

const KERNEL_V3_META_FACTORY_ADDRESS =
  "0xd703aae79538628d27099b8c4f621be4ccd142d5";

EntryPointV0_7_0.AccountDeployed.contractRegister(({ event, context }) => {
  handleAccountDeployedContractRegister(event, context);
});

function handleAccountDeployedContractRegister(
  event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
  context: contractRegistrations
) {
  const address = event.params.sender.toLowerCase();
  const factory = event.params.factory.toLowerCase();

  if (factory !== KERNEL_V3_META_FACTORY_ADDRESS) {
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
  const address = event.params.sender.toLowerCase();
  const createdAt = event.block.timestamp;

  if (factory !== KERNEL_V3_META_FACTORY_ADDRESS) {
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
