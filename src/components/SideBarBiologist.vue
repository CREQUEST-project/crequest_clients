<template>
  <div class="w-1/5 bg-gray-100 p-4 border-r">
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        :value="searchTerm"
        placeholder="Enter motif"
        class="w-full p-2 border rounded-md"
      />
    </div>

    <!-- Motif List -->
    <ul class="max-h-screen overflow-y-auto">
      <li
        v-for="(motif, index) in listMotifs"
        :key="index"
        @click="selectMotif(motif)"
        class="cursor-pointer p-2 mb-2 border rounded-lg flex justify-between items-center"
        :class="{
          'bg-green-100': selectedMotif === motif,
          'hover:bg-gray-200': selectedMotif !== motif,
        }"
      >
        <span>{{ motif.sequences }}</span>
        <button @click.stop="removeMotif(motif)">
          <span class="text-red-500 material-symbols-outlined"> delete </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MotifName } from "../models/Biologist";

defineProps<{
  searchTerm: String,
  listMotifs: MotifName[],
  selectedMotif: MotifName | null,
}>();

const emit = defineEmits(["selectMotif", "removeMotif"]);

function selectMotif(motif: MotifName) {
  // Phát sự kiện để thông báo cho component cha cập nhật selectedMotif
  emit('selectMotif', motif);
}

function removeMotif(motif: MotifName) {
  // Phát sự kiện để thông báo cho component cha xóa motif
  emit('removeMotif', motif);
}
</script>
