<template>
  <div class="flex h-screen">
    <!-- Sidebar Left - Motif List -->
    <div class="w-1/4 bg-gray-100 p-4 border-r">
      <!-- Search Bar -->
      <div class="mb-4">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Enter motif"
          class="w-full p-2 border rounded-md"
        />
      </div>

      <!-- Motif List -->
      <ul>
        <li
          v-for="(motif, index) in filteredMotifs"
          :key="index"
          @click="selectMotif(motif)"
          class="cursor-pointer p-2 mb-2 border rounded-lg flex justify-between items-center"
          :class="{
            'bg-green-100': selectedMotif === motif,
            'hover:bg-gray-200': selectedMotif !== motif
          }"
        >
          <span>{{ motif.sq }}</span>
          <button @click.stop="removeMotif(motif)">
            <i class="text-red-600 fa fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content - Form for Editing Motif -->
    <div class="w-3/4 p-8">
      <h1 class="text-2xl font-bold mb-4">Biologist</h1>

      <!-- Check if a motif is selected -->
      <div v-if="selectedMotif">
        <form @submit.prevent="submitForm">
          <!-- Form Fields for Motif Information -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="sq" class="block">SQ</label>
              <input
                type="text"
                id="sq"
                v-model="selectedMotif.sq"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label for="ac" class="block">AC</label>
              <input
                type="text"
                id="ac"
                v-model="selectedMotif.ac"
                class="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <!-- Other fields -->
          <div class="mb-4">
            <label for="dt" class="block">DT</label>
            <input
              type="text"
              id="dt"
              v-model="selectedMotif.dt"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="de" class="block">DE</label>
            <textarea
              id="de"
              v-model="selectedMotif.de"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="kw" class="block">KW</label>
            <textarea
              id="kw"
              v-model="selectedMotif.kw"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="os" class="block">OS</label>
            <textarea
              id="os"
              v-model="selectedMotif.os"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="ra" class="block">RA</label>
            <textarea
              id="ra"
              v-model="selectedMotif.ra"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rt" class="block">RT</label>
            <textarea
              id="rt"
              v-model="selectedMotif.rt"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rl" class="block">RL</label>
            <textarea
              id="rl"
              v-model="selectedMotif.rl"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>

          <!-- Submit and Reset Buttons -->
          <div class="flex space-x-4">
            <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md">
              Submit
            </button>
            <button
              type="button"
              @click="resetForm"
              class="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- If no motif selected -->
      <div v-else class="flex justify-center items-center h-full">
        <div class="text-center">
          <img
            src="@/assets/empty-box.png"
            alt="Empty Box"
            class="w-24 mx-auto mb-4"
          />
          <p class="text-gray-500">Let’s validate a motif</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Motif {
  sq: string;
  ac: string;
  dt: string;
  de: string;
  kw: string;
  os: string;
  ra: string;
  rt: string;
  rl: string;
}

const searchTerm = ref('');
const motifs = ref<Motif[]>([
  { sq: 'GTAnGAww', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  { sq: 'GTAnGAAn', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  { sq: 'CAkGGAkw', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  { sq: 'nnTynGTA', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  { sq: 'AAnTATnA', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  { sq: 'ACTATAmr', ac: '', dt: '', de: '', kw: '', os: '', ra: '', rt: '', rl: '' },
  // Thêm các motif khác ở đây...
]);

const selectedMotif = ref<Motif | null>(null);

const filteredMotifs = computed(() =>
  motifs.value.filter((motif) =>
    motif.sq.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

function selectMotif(motif: Motif) {
  selectedMotif.value = { ...motif }; // Sao chép motif để chỉnh sửa
}

function removeMotif(motif: Motif) {
  motifs.value = motifs.value.filter((m) => m !== motif);
  if (selectedMotif.value === motif) {
    selectedMotif.value = null;
  }
}

function submitForm() {
  alert('Motif submitted: ' + JSON.stringify(selectedMotif.value));
}

function resetForm() {
  selectedMotif.value = null;
}
</script>
