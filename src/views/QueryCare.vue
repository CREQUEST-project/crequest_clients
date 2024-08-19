<script setup lang="ts">
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

const uniqueIdentifier = ref("");
const briefDescription = ref("");
const keywords = ref("");
const plantName = ref("");
const authorName = ref("");
const reportTitle = ref("");
const bibliographicInfo = ref("");
const accessionNumber = ref("");
const updateDate = ref(new Date());

function handleSubmit() {
  console.log({
    uniqueIdentifier: uniqueIdentifier.value,
    briefDescription: briefDescription.value,
    keywords: keywords.value,
    plantName: plantName.value,
    authorName: authorName.value,
    reportTitle: reportTitle.value,
    bibliographicInfo: bibliographicInfo.value,
    accessionNumber: accessionNumber.value,
    updateDate: updateDate.value,
  });
}

function handleReset() {
  uniqueIdentifier.value = "";
  briefDescription.value = "";
  keywords.value = "";
  plantName.value = "";
  authorName.value = "";
  reportTitle.value = "";
  bibliographicInfo.value = "";
  accessionNumber.value = "";
  updateDate.value = new Date();
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-50 py-12">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Query Care</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Unique Identifier -->
        <div class="flex space-x-6">
          <div class="flex-1 flex flex-col">
            <label class="text-lg font-semibold text-gray-700"
              >Unique identifier*</label
            >
            <input
              type="text"
              placeholder="Unique identifier"
              v-model="uniqueIdentifier"
              class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <label class="text-lg font-semibold text-gray-700"
              >Date of update:*</label
            >
            <Datepicker
              v-model="updateDate"
              :popup="true"
              :class="`border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green w-full`"
              :calendar-class="'custom-calendar'"
              :header-class="'custom-header'"
              :day-class="'custom-day'"
            />
          </div>
        </div>

        <!-- Brief description of the motif -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700"
            >Brief description of the motif*</label
          >
          <input
            type="text"
            placeholder="Brief description of the motif"
            v-model="briefDescription"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- Keywords -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700">Keywords*</label>
          <input
            type="text"
            placeholder="Keywords"
            v-model="keywords"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- Common name and/or scientific name of plant species -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700"
            >Common name and/or scientific name of plant species*</label
          >
          <input
            type="text"
            placeholder="Common name and/or scientific name of plant species"
            v-model="plantName"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- Author names and Title of the report -->
        <div class="flex space-x-6">
          <div class="flex-1 flex flex-col">
            <label class="text-lg font-semibold text-gray-700"
              >Author name(s) of a relevant report*</label
            >
            <input
              type="text"
              placeholder="Author name(s)"
              v-model="authorName"
              class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <label class="text-lg font-semibold text-gray-700"
              >Title of the report*</label
            >
            <input
              type="text"
              placeholder="Title of the report"
              v-model="reportTitle"
              class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
            />
          </div>
        </div>

        <!-- Bibliographic information of the report -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700"
            >Bibliographic information of the report*</label
          >
          <input
            type="text"
            placeholder="Bibliographic information"
            v-model="bibliographicInfo"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- PubMed ID numbers or GenBank accession number -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700"
            >PubMed ID numbers or GenBank accession number*</label
          >
          <input
            type="text"
            placeholder="PubMed ID or GenBank accession number"
            v-model="accessionNumber"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-center space-x-4">
          <button
            type="submit"
            class="bg-custom-green text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold"
          >
            Submit
          </button>
          <button
            type="reset"
            class="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold"
            @click="handleReset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.custom-calendar {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.custom-header {
  font-weight: bold;
  color: #333;
}

.custom-day {
  padding: 10px;
  margin: 3px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.custom-day:hover {
  background-color: #003300;
  color: white;
}

.custom-day.selected {
  background-color: #003300;
  color: white;
}

.custom-day.today {
  border: 2px solid #003300;
}
</style>