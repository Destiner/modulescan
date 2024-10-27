<template>
  <div>
    <div>
      <h2>Module</h2>
      <p>Chain ID: {{ chainId }}</p>
      <p>Address: {{ address }}</p>
    </div>
    <div v-if="moduleInstallations.length > 0">
      <h2>Installations</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Module Type</th>
            <th>Timestamp</th>
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
                  name: 'account',
                  params: {
                    chain: chainId,
                    address: installation.account.address,
                  },
                }"
              >
                {{ installation.account.address }}
              </RouterLink>
            </td>
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
            <th>Account</th>
            <th>Module Type</th>
            <th>Timestamp</th>
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
                  name: 'account',
                  params: {
                    chain: chainId,
                    address: uninstallation.account.address,
                  },
                }"
              >
                {{ uninstallation.account.address }}
              </RouterLink>
            </td>
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
import { useRoute, RouterLink } from 'vue-router';

import { request } from '@/utils/graphQl';

const route = useRoute();

const chainId = computed(() => Number(route.params.chain));
const address = computed(() => String(route.params.address));

interface ModuleInstallation {
  id: string;
  account: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

interface ModuleUninstallation {
  id: string;
  account: {
    address: string;
  };
  moduleType: string;
  timestamp: number;
}

const moduleInstallations = ref<ModuleInstallation[]>([]);
const moduleUninstallations = ref<ModuleUninstallation[]>([]);

onMounted(() => {
  fetch();
});

async function fetch(): Promise<void> {
  fetchLatestInstallations();
  fetchLatestUninstallations();
}

async function fetchLatestInstallations(): Promise<void> {
  const query = `
    query {
      moduleInstallations: ModuleInstallation(
        where: {
          accountModule: {
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
        account {
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
          accountModule: {
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
        account {
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
