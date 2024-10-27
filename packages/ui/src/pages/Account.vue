<template>
  <div>
    <div>
      <h2>Account</h2>
      <p>Chain ID: {{ chainId }}</p>
      <p>Address: {{ address }}</p>
    </div>
    <div v-if="installedModulesWithData.length > 0">
      <h2>Active modules</h2>
      <table>
        <thead>
          <tr>
            <th>Module Address</th>
            <th>Module Type</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="module in installedModulesWithData"
            :key="module.id"
          >
            <td>
              <RouterLink
                :to="{
                  name: 'module',
                  params: {
                    chain: chainId,
                    address: module.accountModule.address,
                  },
                }"
              >
                {{ module.accountModule.address }}
              </RouterLink>
            </td>
            <td>{{ module.moduleType }}</td>
            <td>{{ module.data }}</td>
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
            <th>Transaction Hash</th>
            <th>Log Index</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="installation in moduleInstallations"
            :key="installation.id"
          >
            <td>
              <RouterLink
                :to="{
                  name: 'module',
                  params: {
                    chain: chainId,
                    address: installation.accountModule.address,
                  },
                }"
              >
                {{ installation.accountModule.address }}
              </RouterLink>
            </td>
            <td>{{ installation.moduleType }}</td>
            <td>{{ installation.timestamp }}</td>
            <td>{{ installation.txHash }}</td>
            <td>{{ installation.logIndex }}</td>
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
            <th>Transaction Hash</th>
            <th>Log Index</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="uninstallation in moduleUninstallations"
            :key="uninstallation.id"
          >
            <td>
              <RouterLink
                :to="{
                  name: 'module',
                  params: {
                    chain: chainId,
                    address: uninstallation.accountModule.address,
                  },
                }"
              >
                {{ uninstallation.accountModule.address }}
              </RouterLink>
            </td>
            <td>{{ uninstallation.moduleType }}</td>
            <td>{{ uninstallation.timestamp }}</td>
            <td>{{ uninstallation.txHash }}</td>
            <td>{{ uninstallation.logIndex }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeFunctionData, Hex } from 'viem';
import { computed, onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import erc7579AccountAbi from '@/abi/erc7579Account.js';
import { request } from '@/utils/graphQl';
import { fetchTraces } from '@/utils/hyperSync';

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

type InstalledModuleWithData = InstalledModule & { data: string | undefined };

interface ModuleInstallation {
  id: string;
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
  txHash: string;
  logIndex: number;
}

interface ModuleUninstallation {
  id: string;
  accountModule: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
  txHash: string;
  logIndex: number;
}

interface ModuleData {
  module: string;
  data: string;
}

const installedModules = ref<InstalledModule[]>([]);
const moduleInstallations = ref<ModuleInstallation[]>([]);
const moduleUninstallations = ref<ModuleUninstallation[]>([]);
const moduleData = ref<ModuleData[]>([]);

const installedModulesWithData = computed<InstalledModuleWithData[]>(() =>
  installedModules.value.map((module) => {
    const data = moduleData.value.find(
      (data) => data.module === module.accountModule.address,
    );
    return {
      ...module,
      data: data?.data,
    };
  }),
);

onMounted(() => {
  fetch();
});

async function fetch(): Promise<void> {
  await Promise.all([
    fetchInstalledModules(),
    fetchLatestInstallations(),
    fetchLatestUninstallations(),
  ]);
  await fetchModuleData();
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
        txHash
        logIndex
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
        txHash
        logIndex
      }
    }
  `;

  const data = await request<{
    moduleUninstallations: ModuleUninstallation[];
  }>(query);
  moduleUninstallations.value = data.moduleUninstallations;
}

async function fetchModuleData(): Promise<void> {
  const modules = installedModules.value.map(
    (module) => module.accountModule.address,
  );
  const traces = await fetchTraces(chainId.value, address.value, modules);
  const installationTraces = traces.filter((trace) =>
    trace.input.startsWith('0x6d61fe70'),
  );
  moduleData.value = installationTraces.map((trace) => {
    const data = decodeFunctionData({
      abi: erc7579AccountAbi,
      data: trace.input as Hex,
    });
    return {
      module: trace.to,
      data: data.args[0],
    };
  });
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
