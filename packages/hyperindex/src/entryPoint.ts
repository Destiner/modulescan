import {
  contractRegistrations,
  EntryPointV0_7_0_AccountDeployed_eventArgs,
  EntryPointV0_7_0,
  eventLog,
  handlerContext,
} from "generated";

// EntryPointV0_7_0.AccountDeployed.contractRegister(({ event, context }) => {
//   handleAccountDeployedContractRegister(event, context);
// });

// function handleAccountDeployedContractRegister(
//   event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
//   context: contractRegistrations
// ) {
//   const address = event.params.sender.toLowerCase();
//   const factory = event.params.factory.toLowerCase();
// }

// EntryPointV0_7_0.AccountDeployed.handler(async ({ event, context }) => {
//   handleAccountDeployedEvent(event, context);
// });

// async function handleAccountDeployedEvent(
//   event: eventLog<EntryPointV0_7_0_AccountDeployed_eventArgs>,
//   context: handlerContext
// ) {
//   const factory = event.params.factory;
//   const address = event.params.sender.toLowerCase();

//   context.Account.set({
//     id: `${event.chainId}-${address}`,
//     chainId: event.chainId,
//     address,
//     factory,
//   });
// }
