import {
  ERC7579Account_ModuleInstalled_eventArgs,
  ERC7579Account,
  eventLog,
  handlerContext,
} from "generated";

ERC7579Account.ModuleInstalled.handler(async ({ event, context }) => {
  handleModuleInstalledEvent(event, context);
});

async function handleModuleInstalledEvent(
  event: eventLog<ERC7579Account_ModuleInstalled_eventArgs>,
  context: handlerContext
) {
  const address = event.srcAddress.toLowerCase();
  const moduleAddress = event.params.module.toLowerCase();
  const account = await context.Account.get(`${event.chainId}-${address}`);
  if (account) {
    account.modules.push(moduleAddress);
    context.Account.set(account);
  }
}
