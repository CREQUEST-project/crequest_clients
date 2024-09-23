<template>
  <div
    class="relative min-h-screen bg-white flex items-center justify-between overflow-hidden"
  >
    <div class="max-w-3xl pl-10 lg:pl-20">
      <h1 class="text-4xl text-gray-900 leading-tight mb-6">
        {{ title }}
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        {{ description }}
      </p>
      <button
        class="bg-custom-green text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300"
        @click="router.push(url)"
      >
        {{ urlDescription }}
      </button>
      <div class="flex space-x-2 mt-8">
        <span
          v-for="(_info, index) in infos"
          :key="index"
          :class="{
            'w-3 h-3 rounded-full cursor-pointer transition duration-300': true,
            'bg-custom-green': index === selectedPages,
            'bg-gray-400': index !== selectedPages,
          }"
          @click="setSelectedPage(index)"
        ></span>
      </div>
    </div>

    <div
      class="flex-1 h-full flex justify-end items-center pr-10 lg:pr-20 z-20"
    >
      <img
        src="@/assets/home.png"
        alt="Home"
        class="object-contain h-96 lg:h-auto"
      />
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-r from-green-300 via-green-400 to-green-500 transform -skew-y-6 z-10"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedPages = ref(0);
const setSelectedPage = (index: number) => {
  selectedPages.value = index;
};

watch(selectedPages, (newValue: number) => {
  title.value = infos[newValue].title;
  description.value = infos[newValue].description;
  url.value = infos[newValue].url;
  urlDescription.value = infos[newValue].urlDescription;
});

const infos = [
  {
    title: "MOTIF INFORMATION RETRIEVAL",
    description:
      "The QueryCRE function is accessible to any user. QueryCRE allows users to search information about motifs in the database.",
    urlDescription: "Query CRE",
    url: "/query-cre",
  },
  {
    title: "PROMOTER REGION SEARCH",
    description:
      "This function allows all users to access the system and perform searches for Cis-regulatory elements (CREs) present in the promoter regions of DNA sequence.",
    urlDescription: "Start Searching",
    url: "/search-for-cre",
  },
  {
    title: "SEARCH HISTORY TRACKING",
    description:
      "This function allows user to view and delete search history after logging in. The search history is only displayed for the “Search For CRE” function.",
    urlDescription: "View History",
    url: "/history",
  },
  {
    title: "COMPUTATIONL MOTIF DISCOVERY",
    description:
      "The Motif Sampler allows detecting patterns or sequences in biological data by computation",
    urlDescription: "Start Sampling",
    url: "/motif-sampler",
  },
  {
    title: "MOTIF VALIDATION",
    description:
      "The biologist can access and view a list of computational motifs that need validation. ",
    urlDescription: "Go to Biolologist",
    url: "/biologist",
  },
];

const title = ref(infos[0].title);
const description = ref(infos[0].description);
const url = ref(infos[0].url);
const urlDescription = ref(infos[0].urlDescription);
</script>
