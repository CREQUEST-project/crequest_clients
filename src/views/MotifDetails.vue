<template>
  <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
    <div class="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        {{ motifData.ac }}
      </h1>

      <!-- Function Label -->
      <div v-if="motifData.function_label" class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Function label</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.function_label?.label }}</p>
      </div>

      <!-- Function Details -->
      <div v-if="motifData.function_label" class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Function details</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.function_label?.detail_label }}</p>
      </div>

      <!-- Unique Accession Number -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Unique accession number</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">
          {{ motifData.ac }}
        </p>
      </div>

      <!-- Date of Update -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Date of update</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.dt }}</p>
      </div>

      <!-- Brief Description of the Motif -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">
          Brief description of the motif
        </h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.de }}</p>
      </div>

      <!-- Keywords -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Keywords</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.kw }}</p>
      </div>

      <!-- Common Name and/or Scientific Name of Plant Species -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">
          Common name and/or scientific name of plant specie
        </h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.os }}</p>
      </div>

      <!-- Author Name(s) of a Relevant Report -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">
          Author name(s) of a relevant report
        </h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.ra }}</p>
      </div>

      <!-- Title of the Report -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Title of the report</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.rt }}</p>
      </div>

      <!-- Bibliographic Information of the Report -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">
          Bibliographic information of the report
        </h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.rl }}</p>
      </div>

      <!-- PubMed ID Numbers or GenBank Accession Number -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">
          PubMed ID numbers or GenBank accession number
        </h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.id }}</p>
      </div>

      <!-- Motif Sequence -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Motif sequence</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.sq }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import axios from "./../constants/Axios";
import { useRouter } from "vue-router";

interface FunctionLabel {
  label: string;
  detail_label: string;
}

interface MotifData {
  ac: string;
  dt: string;
  de: string;
  kw: string;
  os: string;
  ra: string;
  rl: string;
  rt: string;
  id: string;
  sq: string;
  function_label?: FunctionLabel;
}
const accessionNumber = useRouter().currentRoute.value.params.id;

const motifData = ref<MotifData>({
  ac: "",
  dt: "",
  de: "",
  kw: "",
  os: "",
  ra: "",
  rl: "",
  rt: "",
  id: "",
  sq: "",
});

onBeforeMount(async () => {
  const response = await axios.post("/guest/query-cre", {
    ac: accessionNumber,
  });
  motifData.value = response.data.data[0];
});
</script>
