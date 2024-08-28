<template>
  <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
    <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Sequence Analysis</h1>
      <div
        class="bg-gray-100 p-4 rounded-lg font-mono text-lg leading-6"
      >
        <span
          v-for="(char, index) in sequenceChars"
          :key="index"
          :style="{ backgroundColor: getBackgroundColor(index) }"
        >
          {{ (index + 1) % 10 !== 0 ? char : char + " " }}
        </span>
      </div>

      <h2 class="text-xl font-bold text-gray-900 mt-8 mb-4">Motifs found</h2>
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 border text-left">Accession Number</th>
            <th class="px-4 py-2 border text-left">Motif</th>
            <th class="px-4 py-2 border text-left">Description</th>
            <th class="px-4 py-2 border text-left">Function</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(motif, index) in motifs" :key="motif.accessionNumber">
            <td class="px-4 py-2 border">{{ motif.accessionNumber }}</td>
            <td class="px-4 py-2 border">
              <button
                :style="{ backgroundColor: motif.color }"
                class="py-1 px-2 rounded"
                @click="toggleHighlight(index)"
              >
                {{ motif.sequence }}
              </button>
            </td>
            <td class="px-4 py-2 border">{{ motif.description }}</td>
            <td class="px-4 py-2 border">{{ motif.function }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  data: Object,
});

console.log(props);

const sequence = ref(
  "CTAATCTTTATGGATTAGGATCAAAATTTCCATTTCTAAATAGCTAATCTTTATGGATTAGGATCAAAATTTCCATTTCAATTCAAATCTCGAAGTCAAAATTCGTTGCTC"
);

const motifs = ref([
  {
    accessionNumber: "S000037",
    sequence: "AATTCAAA",
    description: "Short description...",
    function: "None",
    color: "#FF00FF",
    active: false,
  },
  {
    accessionNumber: "S000001",
    sequence: "CTAATCT",
    description: "Another description...",
    function: "ABCD",
    color: "#00FF00",
    active: false,
  },
  {
    accessionNumber: "S000000",
    sequence: "CATTTC",
    description: "Some description...",
    function: "ABRE",
    color: "#FFA500",
    active: false,
  },
  {
    accessionNumber: "S000010",
    sequence: "TCTA",
    description: "Some description...",
    function: "ABRE",
    color: "#BBA698",
    active: false,
  },
]);

const sequenceChars = ref(sequence.value.split(""));

function getBackgroundColor(index: number): string {
  let bgColor = "";
  motifs.value.forEach((motif) => {
    if (motif.active && isInMotif(index, motif)) {
      bgColor = motif.color;
    }
  });
  return bgColor;
}

function isInMotif(index: number, motif: any): boolean {
  const motifStart = sequence.value.indexOf(motif.sequence);
  if (motifStart === -1) return false;
  return index >= motifStart && index < motifStart + motif.sequence.length;
}

function toggleHighlight(motifIndex: number) {
  motifs.value[motifIndex].active = !motifs.value[motifIndex].active;
}
</script>
