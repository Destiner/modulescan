import {
  ERC7579Account_ModuleInstalled_eventArgs,
  // ERC7579Account_ModuleUninstalled_eventArgs,
  ERC7579Account,
  eventLog,
  handlerContext,
} from "generated";

ERC7579Account.ModuleInstalled.handler(async ({ event, context }) => {
  handleModuleInstalledEvent(event, context);
});

// ERC7579Account.ModuleUninstalled.handler(async ({ event, context }) => {
//   handleModuleUninstalledEvent(event, context);
// });

async function handleModuleInstalledEvent(
  event: eventLog<ERC7579Account_ModuleInstalled_eventArgs>,
  context: handlerContext
) {
  const address = event.srcAddress.toLowerCase();
  const moduleAddress = event.params.module.toLowerCase();
  const moduleTypeId = event.params.moduleTypeId;
  const accountId = `${event.chainId}-${address}`;
  const accountModuleId = `${event.chainId}-${moduleAddress}`;

  const accountModule = await context.AccountModule.get(accountModuleId);
  if (!accountModule) {
    context.AccountModule.set({
      id: accountModuleId,
      chainId: event.chainId,
      address: moduleAddress,
    });
  }

  const installedModuleId = `${event.chainId}-${address}-${moduleAddress}-${moduleTypeId}`;
  const installedModule = await context.InstalledModule.get(installedModuleId);
  if (!installedModule) {
    context.InstalledModule.set({
      id: installedModuleId,
      chainId: event.chainId,
      account_id: accountId,
      accountModule_id: accountModuleId,
      moduleType: moduleTypeId,
    });
  }

  const txHash = event.transaction.hash;
  const logIndex = event.logIndex;
  context.ModuleInstallation.set({
    id: `${event.chainId}-${txHash}-${logIndex}`,
    chainId: event.chainId,
    account_id: accountId,
    accountModule_id: accountModuleId,
    moduleType: moduleTypeId,
    blockNumber: event.block.number,
    txHash: txHash,
    logIndex: logIndex,
  });
}

// async function handleModuleUninstalledEvent(
//   event: eventLog<ERC7579Account_ModuleUninstalled_eventArgs>,
//   context: handlerContext
// ) {
//   const address = event.srcAddress.toLowerCase();
//   const moduleAddress = event.params.module.toLowerCase();
//   const moduleTypeId = event.params.moduleTypeId;
//   const accountId = `${event.chainId}-${address}`;

//   const installedModuleId = `${event.chainId}-${address}-${moduleAddress}-${moduleTypeId}`;
//   const installedModule = await context.InstalledModule.get(installedModuleId);
//   if (installedModule) {
//     context.InstalledModule.deleteUnsafe(installedModuleId);
//   }

//   const txHash = event.transaction.hash;
//   const logIndex = event.logIndex;
//   context.ModuleUninstallation.set({
//     id: `${event.chainId}-${txHash}-${logIndex}`,
//     chainId: event.chainId,
//     account_id: accountId,
//     accountModule_id: `${event.chainId}-${moduleAddress}`,
//     moduleType: moduleTypeId,
//     blockNumber: event.block.number,
//     txHash: txHash,
//     logIndex: logIndex,
//   });
// }
