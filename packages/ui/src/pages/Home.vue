<template>
  <div>
    <h1>Home page</h1>
    <h2>Recent accounts</h2>
    <table>
      <thead>
        <tr>
          <th>Chain ID</th>
          <th>Address</th>
          <th>Factory</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account in recentAccounts"
          :key="account.id"
        >
          <td>{{ account.chainId }}</td>
          <td>{{ account.address }}</td>
          <td>{{ account.factory }}</td>
          <td>{{ account.createdAt }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Recent installations</h2>
    <table>
      <thead>
        <tr>
          <th>Chain ID</th>
          <th>Account</th>
          <th>Module</th>
          <th>Module Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="installation in recentInstallations"
          :key="installation.id"
        >
          <td>{{ installation.chainId }}</td>
          <td>{{ installation.account.address }}</td>
          <td>{{ installation.accountModule.address }}</td>
          <td>{{ installation.moduleType }}</td>
          <td>{{ installation.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Recent uninstallations</h2>
    <table>
      <thead>
        <tr>
          <th>Chain ID</th>
          <th>Account</th>
          <th>Module</th>
          <th>Module Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="uninstallation in recentUninstallations"
          :key="uninstallation.id"
        >
          <td>{{ uninstallation.chainId }}</td>
          <td>{{ uninstallation.account.address }}</td>
          <td>{{ uninstallation.accountModule.address }}</td>
          <td>{{ uninstallation.moduleType }}</td>
          <td>{{ uninstallation.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { request } from '@/utils/graphQl';

interface Account {
  id: string;
  chainId: number;
  address: string;
  factory: string;
  createdAt: number;
}

interface ModuleInstallation {
  id: string;
  chainId: number;
  account: {
    address: string;
  };
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

interface ModuleUninstallation {
  id: string;
  chainId: number;
  account: {
    address: string;
  };
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

const recentAccounts = ref<Account[]>([]);
const recentInstallations = ref<ModuleInstallation[]>([]);
const recentUninstallations = ref<ModuleUninstallation[]>([]);

onMounted(() => {
  fetch();
});

async function fetch(): Promise<void> {
  fetchLatestAccounts();
  fetchLatestInstallations();
  fetchLatestUninstallations();
}

async function fetchLatestAccounts(): Promise<void> {
  const query = `
    query {
      recentAccounts: Account(
        order_by: {
          createdAt: desc
        }
        limit: 10
      ) {
        id
        chainId
        address
        factory
        createdAt
      }
    }
  `;

  const data = await request<{ recentAccounts: Account[] }>(query);
  recentAccounts.value = data.recentAccounts;
}

async function fetchLatestInstallations(): Promise<void> {
  const query = `
    query {
      recentInstallations: ModuleInstallation(
        order_by: {
          timestamp: desc
        }
        limit: 10
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
  `;

  const data = await request<{
    recentInstallations: ModuleInstallation[];
  }>(query);
  recentInstallations.value = data.recentInstallations;
}

async function fetchLatestUninstallations(): Promise<void> {
  const query = `
    query {
      recentUninstallations: ModuleUninstallation(
        order_by: {
          timestamp: desc
        }
        limit: 10
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
  `;

  const data = await request<{
    recentUninstallations: ModuleUninstallation[];
  }>(query);
  recentUninstallations.value = data.recentUninstallations;
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid black;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e8e8e8;
  cursor: pointer;
}
</style>
