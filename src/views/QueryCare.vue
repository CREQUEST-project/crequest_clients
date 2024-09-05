<script setup lang="ts">
import { ref } from "vue";
import Datepicker from "vue3-datepicker";
import axios from "./../constants/Axios";

interface BodyType {
  id?: string;
  de?: string;
  kw?: string;
  os?: string;
  ra?: string;
  rt?: string;
  rl?: string;
  ac?: string;
  dt?: string;
}

interface ResponseQueryCre {
  ac: string;
  dt: string;
  de: string;
  kw: string;
  os: string;
  ra: string;
  rt: string;
  rl: string;
  rc: string;
  rd: string;
  sq: string;
  note: string;
  color: string;
  id: string;
}

const showResult = ref(false);
const result = ref<ResponseQueryCre[]>([]);
const uniqueIdentifier = ref("");
const briefDescription = ref("");
const keywords = ref("");
const plantName = ref("");
const authorName = ref("");
const reportTitle = ref("");
const bibliographicInfo = ref("");
const accessionNumber = ref("");
const updateDate = ref();

const count = ref(0);

const handleSubmit = async () => {
  try {
    const user_id = localStorage.getItem("user_id");
    const body: BodyType = {};
    if (uniqueIdentifier.value) body.id = uniqueIdentifier.value;
    if (briefDescription.value) body.de = briefDescription.value;
    if (keywords.value) body.kw = keywords.value;
    if (plantName.value) body.os = plantName.value;
    if (authorName.value) body.ra = authorName.value;
    if (reportTitle.value) body.rt = reportTitle.value;
    if (bibliographicInfo.value) body.rl = bibliographicInfo.value;
    if (accessionNumber.value) body.ac = accessionNumber.value;
    if (updateDate.value) body.dt = updateDate.value;

    if (!user_id) {
      const response = await axios.post("/guest/query-cre", body);
      console.log(response.data.data);
      showResult.value = true;
      result.value = response.data.data;
      count.value = response.data.count;
    } else {
      const response = await axios.post("/user/query-cre", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showResult.value = true;
      result.value = response.data.data;
      count.value = response.data.count;
    }
  } catch (error) {
    console.error(error);
  }
};

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
            <label
              class="text-lg font-semibold text-gray-700"
              for="uniqueIdentifier"
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
            <label class="text-lg font-semibold text-gray-700" for="updateDate"
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
          <label
            class="text-lg font-semibold text-gray-700"
            for="briefDescription"
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
          <label class="text-lg font-semibold text-gray-700" for="keywords"
            >Keywords*</label
          >
          <input
            type="text"
            placeholder="Keywords"
            v-model="keywords"
            class="border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
          />
        </div>

        <!-- Common name and/or scientific name of plant species -->
        <div class="flex flex-col">
          <label class="text-lg font-semibold text-gray-700" for="plantName"
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
            <label class="text-lg font-semibold text-gray-700" for="authorName"
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
            <label class="text-lg font-semibold text-gray-700" for="reportTitle"
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
          <label
            class="text-lg font-semibold text-gray-700"
            for="bibliographicInfo"
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
          <label
            class="text-lg font-semibold text-gray-700"
            for="accessionNumber"
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

      <div v-if="showResult">
        <h2 class="text-2xl font-bold text-gray-900 mt-8">
          Results ({{ count }})
        </h2>
        <div class="mt-4">
          <div
            v-for="item in result"
            :key="item.id"
            class="bg-gray-100 p-4 rounded-lg mt-4"
          >
            <div class="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
              <h1 class="text-4xl font-bold text-gray-900 mb-8">
                {{ item.ac }}
              </h1>

              <!-- <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">Function label</h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.functionLabel }}
                </p>
              </div>

              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Function details
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.functionDetails }}
                </p>
              </div> -->

              <!-- Date of Update -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">Date of update</h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.dt }}
                </p>
              </div>

              <!-- Brief Description of the Motif -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Brief description of the motif
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.de }}
                </p>
              </div>

              <!-- Keywords -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">Keywords</h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">{{ item.kw }}</p>
              </div>

              <!-- Common Name and/or Scientific Name of Plant Species -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Common name and/or scientific name of plant specie
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.os }}
                </p>
              </div>

              <!-- Author Name(s) of a Relevant Report -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Author name(s) of a relevant report
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.ra }}
                </p>
              </div>

              <!-- Title of the Report -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Title of the report
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.rt }}
                </p>
              </div>

              <!-- Bibliographic Information of the Report -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  Bibliographic information of the report
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.rl }}
                </p>
              </div>

              <!-- PubMed ID Numbers or GenBank Accession Number -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">
                  PubMed ID numbers or GenBank accession number
                </h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.id }}
                </p>
              </div>

              <!-- Motif Sequence -->
              <div class="mb-6">
                <h2 class="text-lg font-bold text-gray-700">Motif sequence</h2>
                <hr class="border-t-2 border-gray-200 my-2" />
                <p class="text-base text-gray-900">
                  {{ item.sq }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
