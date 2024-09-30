<template>
  <div class="min-h-[calc(100vh-80px)] w-1/5 bg-gray-100 p-4 border-r">
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Enter motif"
        class="w-full p-2 border rounded-md"
      />
    </div>

    <div v-if="listMotifs.length === 0" class="text-center">
      <p>No motifs found</p>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-4" @click="addNewMotif">
        Add New Motif: {{ searchTerm }}
      </button>
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
import { ref, watch } from "vue";
import { MotifName } from "../models/Biologist";
import axios from "../constants/Axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps<{
  searchTerm: string;
  listMotifs: MotifName[];
  selectedMotif: MotifName | null;
}>();

const addNewMotif = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `/biologist/computational-motifs/save`,
      [searchTerm.value],
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Motif added successfully");
      searchTerm.value = "";
    }
  } catch (error) {
    console.error("Search failed:", error);
  }
};

const searchTerm = ref(props.searchTerm);

const emit = defineEmits(["selectMotif", "removeMotif", "update:listMotifs", "update:searchTerm"]);

watch(searchTerm, async (newTerm) => {
  emit('update:searchTerm', newTerm);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `/biologist/computational-motifs/search`,
      {
        sequence: newTerm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    emit("update:listMotifs", response.data.data);
  } catch (error) {
    console.error("Search failed:", error);
  }
});

function selectMotif(motif: MotifName) {
  emit("selectMotif", motif);
}

function removeMotif(motif: MotifName) {
  emit("removeMotif", motif);
}
</script>
