<template>
  <div class="min-h-screen flex flex-col items-center justify-start pt-12">
    <div class="bg-white rounded-lg max-w-6xl w-full">
      <!-- Tiêu đề chính -->
      <h1 class="text-[48px] font-bold text-custom-green mb-4">
        SEARCH FOR CARE
      </h1>
      <!-- Phần mô tả -->
      <p class="text-[28px] text-gray-600 mb-8">
        Search motifs within the database
      </p>
      <!-- Ô nhập liệu -->
      <textarea
        v-model="sequence"
        rows="5"
        placeholder="Enter sequence"
        class="w-full border border-gray-300 rounded-lg p-6 text-2xl outline-none focus:border-custom-green resize-none mb-8"
      ></textarea>
      <!-- Các nút submit và reset -->
      <div class="flex justify-center space-x-6">
        <button
          @click="submitSearch"
          class="bg-custom-green text-white py-3 px-10 rounded-lg text-2xl hover:bg-green-800"
        >
          Submit
        </button>
        <button
          class="bg-green-600 text-white py-3 px-10 rounded-lg text-2xl hover:bg-green-700"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "./../constants/Axios";
import { useRouter } from "vue-router";

const router = useRouter();

const sequence = ref("");

const submitSearch = async () => {
  if (!sequence.value) {
    alert("Please enter a sequence");
    return;
  }
  
  const user_id = localStorage.getItem("user_id");
  const response = await axios.post(`/user/${user_id}/search-for-care`, {
    sequence: sequence.value,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  router.push({ name: "SearchForCareResults", params: { data : response.data } });
};
</script>
