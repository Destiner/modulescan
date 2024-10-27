# ERC7579 Indexer

Envio Hyperindex that indexes ERC7579-compatible accounts.

## Example query

```graphql
query {
  account: Account(
    where: { id: { _eq: "8453-0x0edca0f8c2199f4addee5b32c4ee8134859c5208" } }
  ) {
    id
    modules {
      id
    }
  }
  moduleInstallations: ModuleInstallation(
    where: {
      chainId: { _eq: 1 }
      accountModule: {
        address: { _eq: "0x5c97aa67ba578e3c54ec5942a7563ea9130e4f5f" }
      }
    }
    limit: 2
  ) {
    id
    account {
      address
    }
    accountModule {
      address
    }
    moduleType
    txHash
    logIndex
  }
  recentUninstallations: ModuleUninstallation(
    order_by: { timestamp: desc }
    limit: 2
  ) {
    id
    chainId
    account {
      address
    }
    accountModule {
      address
    }
    moduleType
    timestamp
  }
}
```
