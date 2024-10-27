<template>
  <div>
    <div>
      <h2>Account</h2>
      <p>Chain ID: {{ chainId }}</p>
      <p>Address: {{ address }}</p>
    </div>
    <div v-if="installedModules.length > 0">
      <h2>Active modules</h2>
      <table>
        <thead>
          <tr>
            <th>Module Address</th>
            <th>Module Type</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="module in installedModules"
            :key="module.id"
          >
            <td>{{ module.accountModule.address }}</td>
            <td>{{ module.moduleType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="moduleInstallations.length > 0">
      <h2>Installations</h2>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Module Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="installation in moduleInstallations"
            :key="installation.id"
          >
            <td>{{ installation.accountModule.address }}</td>
            <td>{{ installation.moduleType }}</td>
            <td>{{ installation.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="moduleUninstallations.length > 0">
      <h2>Uninstallations</h2>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Module Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="uninstallation in moduleUninstallations"
            :key="uninstallation.id"
          >
            <td>{{ uninstallation.accountModule.address }}</td>
            <td>{{ uninstallation.moduleType }}</td>
            <td>{{ uninstallation.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { request } from '@/utils/graphQl';

const route = useRoute();

const chainId = computed(() => Number(route.params.chain));
const address = computed(() => String(route.params.address));

interface InstalledModule {
  id: string;
  accountModule: {
    address: string;
  };
  moduleType: string;
}

interface ModuleInstallation {
  id: string;
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

interface ModuleUninstallation {
  id: string;
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

const installedModules = ref<InstalledModule[]>([]);
const moduleInstallations = ref<ModuleInstallation[]>([]);
const moduleUninstallations = ref<ModuleUninstallation[]>([]);

onMounted(() => {
  fetch();
});

async function fetch(): Promise<void> {
  fetchInstalledModules();
  fetchLatestInstallations();
  fetchLatestUninstallations();
}

async function fetchInstalledModules(): Promise<void> {
  const query = `
    query {
      installedModules: InstalledModule(
        where: {
          account: {
            address: {
              _eq: "${address.value}"
            }
          }
          chainId: {
            _eq: ${chainId.value}
          }
        }
        limit: 100
      ) {
        id
        accountModule {
          address
        }
        moduleType
      }
    }
  `;

  const data = await request<{ installedModules: InstalledModule[] }>(query);
  installedModules.value = data.installedModules;
}

async function fetchLatestInstallations(): Promise<void> {
  const query = `
    query {
      moduleInstallations: ModuleInstallation(
        where: {
          account: {
            address: {
              _eq: "${address.value}"
            }
          }
          chainId: {
            _eq: ${chainId.value}
          }
        }
        order_by: {
          timestamp: desc
        }
        limit: 10
      ) {
        id
        accountModule {
          address
        }
        moduleType
        timestamp
      }
    }
  `;

  const data = await request<{
    moduleInstallations: ModuleInstallation[];
  }>(query);
  moduleInstallations.value = data.moduleInstallations;
}

async function fetchLatestUninstallations(): Promise<void> {
  const query = `
    query {
      moduleUninstallations: ModuleUninstallation(
        where: {
          account: {
            address: {
              _eq: "${address.value}"
            }
          }
          chainId: {
            _eq: ${chainId.value}
          }
        }
        order_by: {
          timestamp: desc
        }
        limit: 10
      ) {
        id
        accountModule {
          address
        }
        moduleType
        timestamp
      }
    }
  `;

  const data = await request<{
    moduleUninstallations: ModuleUninstallation[];
  }>(query);
  moduleUninstallations.value = data.moduleUninstallations;
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
