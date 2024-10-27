# modulescan

[ERC-7579](https://erc7579.com) smart account module activity

Uses [Envio](https://envio.dev) as the data layer.

- Uses HyperIndex to index module installations and uninstallations, as well as tracking the currently installed modules for each account.
- Uses HyperSync to fetch traces to get the installation data (Ethereum only).

## Problem

ERC-7579 presents an interoperable plugin system for smart accounts. Smart accounts can install the compatible plugins with out vendor lock, enjoying interopera

Yet, there is a lack of data tooling around the standard. It's quite challenging to get the module installations, especially as the number of chains increases.

## Solution

Envio offers exactly what we need to solve this. First, we create multi-chain indexer using HyperIndex, tracking not only the accounts themselves, but all the current and historical module installations for each of them. Then, we enrich that data further using HyperSync, fetching historical traces to get the module installation data.

## Architecture

### Indexer

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

### UI

[Package](./packages/ui/)

Link: https://modulescan-ui.vercel.app/

Example account with module data: https://modulescan-ui.vercel.app/account/1/0xfeb4037cd7c43f59666066a19b385b7fbaaf8d37

#### Screenshots

Home page: latest activity

<img width="1709" alt="Screenshot 2024-10-27 at 08 25 48" src="https://github.com/user-attachments/assets/14e2b118-2d9a-40f1-999d-b5491fb91be5">

Account page

<img width="1710" alt="Screenshot 2024-10-27 at 08 26 02" src="https://github.com/user-attachments/assets/bee59b78-a1a8-465d-ab98-22cb7ffb280c">

Module page

<img width="1709" alt="Screenshot 2024-10-27 at 08 26 11" src="https://github.com/user-attachments/assets/83711a74-777f-4f04-be73-42e5256ae98c">

