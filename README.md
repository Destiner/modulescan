# modulescan

[ERC-7579](https://erc7579.com) smart account module activity

Uses HyperIndex to index module installations and uninstallations, as well as tracking the currently installed modules for each account.

Use HyperSync to fetch traces to get the installation data (Ethereum only).

## Indexer

[Package](./packages/hyperindex/)

Link: https://envio.dev/app/destiner/modulescan/3e770dc

Indexing a two-step process:

1. Index `AccountDeployed` event from the EntryPoint contract to track accounts

- Uses `factory` field to filter out non ERC7579-compatible accounts
- Adds each compatible account to the indexer

2. Indexes `ModuleInstalled` and `ModuleUninstalled` events for each tracked account to track module activity

- Creates `ModuleInstallation` and `ModuleUninstallation` entities for each new indexed event
- Maintains the list of `InstalledModule` entites for each account
- `modules` list of the `Account` entity is updated automatically using the `@derivedFrom` property

## UI

[Package](./packages/ui/)

Link: https://modulescan-ui.vercel.app/

Example account with module data: https://modulescan-ui.vercel.app/account/1/0xfeb4037cd7c43f59666066a19b385b7fbaaf8d37

### Screenshots

#### Home page: latest activity

<img width="1709" alt="Screenshot 2024-10-27 at 08 25 48" src="https://github.com/user-attachments/assets/14e2b118-2d9a-40f1-999d-b5491fb91be5">


#### Account page

<img width="1710" alt="Screenshot 2024-10-27 at 08 26 02" src="https://github.com/user-attachments/assets/bee59b78-a1a8-465d-ab98-22cb7ffb280c">


#### Module page

<img width="1709" alt="Screenshot 2024-10-27 at 08 26 11" src="https://github.com/user-attachments/assets/83711a74-777f-4f04-be73-42e5256ae98c">

