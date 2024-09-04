<template>
  <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
    <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">History Page</h1>

      <!-- History Table -->
      <table class="w-[100%] table-fixed border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="w-1/2 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Page
            </th>
            <th
              scope="col"
              class="w-1/3 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Viewed On
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(history, index) in paginatedHistory" :key="index">
            <td
              class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal break-words"
            >
              <span>{{ history.sequences }}</span>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
            >
              {{ history.created_at }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
            >
              <button @click="viewHistory(history.id)" class="mx-2">
                <span
                  class="material-symbols-outlined text-blue-600 hover:text-blue-900"
                >
                  visibility
                </span>
              </button>
              <button @click="deleteHistory(index)" class="mx-2">
                <span
                  class="material-symbols-outlined text-red-600 hover:text-red-900"
                >
                  delete
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="mt-4 flex items-center justify-between">
        <div>
          <label for="rowsPerPage" class="text-sm text-gray-700 mr-2"
            >Rows per page</label
          >
          <select
            id="rowsPerPage"
            v-model="rowsPerPage"
            @change="changePage(1)"
            class="border-gray-300 rounded-lg"
          >
            <option
              v-for="option in rowsPerPageOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="text-sm text-gray-700">
          {{ startIndex + 1 }} - {{ endIndex }} of {{ historyData.length }}
        </div>
        <div>
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="text-gray-600 hover:text-gray-900 mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="text-gray-600 hover:text-gray-900 mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "./../constants/Axios";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  const user_id = localStorage.getItem("user_id");
  const response = await axios.get(`user/${user_id}/search-for-cre/histories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  historyData.value = response.data.data;
});

const historyData = ref([]);

// Pagination state
const rowsPerPage = ref(5);
const currentPage = ref(1);

const rowsPerPageOptions = [5, 10, 15];

const totalPages = computed(() =>
  Math.ceil(historyData.value.length / rowsPerPage.value)
);
const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + rowsPerPage.value, historyData.value.length)
);

const paginatedHistory = computed(() => {
  return historyData.value.slice(startIndex.value, endIndex.value);
});

const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const deleteHistory = (index: number) => {
  historyData.value.splice(startIndex.value + index, 1);
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

const viewHistory = (index: number) => {
  router.push(`history/${index}`);
  console.log(historyData.value[startIndex.value + index]);
};
</script>

<style>
/* Optional custom styles for buttons or pagination */
</style>
