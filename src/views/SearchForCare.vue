<template>
  <div
    v-if="!showResult"
    class="min-h-screen flex flex-col items-center justify-start pt-12"
  >
    <div class="bg-white rounded-lg max-w-6xl w-full">
      <h1 class="text-[48px] font-bold text-custom-green mb-4">
        SEARCH FOR CARE
      </h1>
      <p class="text-[28px] text-gray-600 mb-8">
        Search motifs within the database
      </p>
      <textarea
        v-model="sequence"
        rows="5"
        placeholder="Enter sequence"
        class="w-full border border-gray-300 rounded-lg p-6 text-2xl outline-none focus:border-custom-green resize-none mb-8"
      ></textarea>
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
  <div v-else>
    <div class="flex items-center justify-between p-4 border-b">
    <!-- Tabs -->
    <div class="flex space-x-4">
      <a href="#sequence" class="text-gray-500 border-b-2 pb-2 transition duration-300"
         :class="{ 'text-green-900 border-green-900': activeTab === 'sequence' }"
         @click.prevent="setActiveTab('sequence')">
        Sequence
      </a>
      <a href="#revert-sequence" class="text-gray-500 border-b-2 pb-2 transition duration-300"
         :class="{ 'text-green-900 border-green-900': activeTab === 'revert-sequence' }"
         @click.prevent="setActiveTab('revert-sequence')">
        Revert Sequence
      </a>
    </div>

    <!-- Back Button -->
    <button @click="goBack" class="text-black hover:text-gray-700 transition">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
  </div>
    <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
      <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Sequence Analysis</h1>
        <div v-if="activeTab === 'sequence'" class="bg-gray-100 p-4 rounded-lg font-mono text-lg leading-6">
          <span
            v-for="(char, index) in sequenceChars"
            :key="index"
            :style="{ backgroundColor: getBackgroundColor(index) }"
          >
            {{ (index + 1) % 10 !== 0 ? char : char + " " }}
          </span>
        </div>
        <div v-else class="bg-gray-100 p-4 rounded-lg font-mono text-lg leading-6">
          <span
            v-for="(char, index) in reverseSequenceChars"
            :key="index"
            :style="{ backgroundColor: getBackgroundColorReverse(index) }"
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
          <tbody v-if="activeTab === 'sequence'">
            <tr v-for="(motif, index) in motifs" :key="motif.factor_id">
              <td class="px-4 py-2 border" @click="router.push(`/motif-details/${motif.factor_id}`)">{{ motif.factor_id }}</td>
              <td class="px-4 py-2 border">
                <button
                  :style="{ backgroundColor: motif.color }"
                  class="py-1 px-2 rounded"
                  @click="toggleHighlight(index)"
                >
                  {{ motif.sq }}
                </button>
              </td>
              <td class="px-4 py-2 border">{{ motif.de }}</td>
              <td class="px-4 py-2 border">{{ motif.function_label?.label }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(motif, index) in reverseMatches" :key="motif.factor_id">
              <td class="px-4 py-2 border">{{ motif.factor_id }}</td>
              <td class="px-4 py-2 border">
                <button
                  :style="{ backgroundColor: motif.color }"
                  class="py-1 px-2 rounded"
                  @click="toggleHighlightReverse(index)"
                >
                  {{ motif.sq }}
                </button>
              </td>
              <td class="px-4 py-2 border">{{ motif.de }}</td>
              <td class="px-4 py-2 border">{{ motif.function_label }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import getSearchResult from "./../api/SearchResultApi";
import {
  SearchResultGuest,
  SearchResultUser,
  Match
} from "./../models/SearchResult";
import { useRouter } from "vue-router";

const router = useRouter();

const sequence = ref("");

const showResult = ref(false);

const result = ref<SearchResultGuest | SearchResultUser>();

const sequenceChars = ref();
const reverseSequenceChars = ref();

const forwardMatches = ref<Match[]>([]);
const reverseMatches = ref<Match[]>([]);
const motifs = ref<Match[]>([]);

const activeTab = ref("sequence");
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const goBack = () => {
  showResult.value = false;
};

const submitSearch = async () => {
  if (!sequence.value) {
    alert("Please enter a sequence");
    return;
  }
  const user_id = localStorage.getItem("user_id");
  const response = await getSearchResult(
    sequence.value,
    user_id ? parseInt(user_id) : undefined
  );
  result.value = response;
  showResult.value = true;
  sequenceChars.value = result.value.original_sequence.split("");
  reverseSequenceChars.value =
    result.value.reverse_complement_sequence.split("");
  forwardMatches.value = result.value.forward_strand_matches;
  motifs.value = result.value.forward_strand_matches;
  reverseMatches.value = result.value.reverse_strand_matches;
};

const getBackgroundColor = (index: number) => {
  let bgColor = "";
  motifs.value.forEach((motif) => {
    if (motif.active && index >= motif.start && index < motif.end) {
      bgColor = motif.color;
    }
  });
  return bgColor;
};

const getBackgroundColorReverse = (index: number) => {
  let bgColor = "";
  reverseMatches.value.forEach((motif) => {
    if (motif.active && index >= motif.start && index < motif.end) {
      bgColor = motif.color;
    }
  });
  return bgColor;
};

function toggleHighlight(motifIndex: number) {
  motifs.value[motifIndex].active = !motifs.value[motifIndex].active;
}

function toggleHighlightReverse(motifIndex: number) {
  reverseMatches.value[motifIndex].active = !reverseMatches.value[motifIndex].active;
}
</script>
