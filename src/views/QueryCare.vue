<script setup lang="ts">
import { ref } from "vue";
import axios from "./../constants/Axios";
import QueryField from "./../components/QueryField.vue";
import QueryResultModal from "../components/QueryResultModal.vue";
import { BodyType, ResponseQueryCre, Field } from "./../models/QueryCare";

const showResult = ref(false);
const result = ref<ResponseQueryCre[]>([]);
const uniqueIdentifier = ref("");
const briefDescription = ref("");
const keywords = ref("");
const plantName = ref("");
const authorName = ref("");
const reportTitle = ref("");
const bibliographicInfo = ref("");
const updateDate = ref();
const sequence = ref("");
const uniqueAccessionNumber = ref("");
const pubMedId = ref("");

const showModal = ref(false);
const detailedItem = ref<ResponseQueryCre | null>(null);

const openModal = (item: ResponseQueryCre) => {
  detailedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  detailedItem.value = null;
};

const updateUniqueIdentifier = (value: string) => {
  uniqueIdentifier.value = value;
};

const updateBriefDescription = (value: string) => {
  briefDescription.value = value;
};

const updateKeywords = (value: string) => {
  keywords.value = value;
};

const updatePlantName = (value: string) => {
  plantName.value = value;
};

const updateAuthorName = (value: string) => {
  authorName.value = value;
};

const updateReportTitle = (value: string) => {
  reportTitle.value = value;
};

const updateBibliographicInfo = (value: string) => {
  bibliographicInfo.value = value;
};

const updateUpdateDate = (value: string) => {
  updateDate.value = value;
};

const updateSequence = (value: string) => {
  sequence.value = value;
};

const updateUniqueAccessionNumber = (value: string) => {
  uniqueAccessionNumber.value = value;
};

const updatePubMedId = (value: string) => {
  pubMedId.value = value;
};

const count = ref(0);

const fields: Field[] = [
  {
    title: "Unique Accession Number",
    data: uniqueAccessionNumber,
    update: updateUniqueAccessionNumber,
    status: true,
  },
  {
    title: "Unique Identifier",
    data: uniqueIdentifier,
    update: updateUniqueIdentifier,
    status: false,
  },
  {
    title: "Brief Description",
    data: briefDescription,
    update: updateBriefDescription,
    status: false,
  },
  { title: "Keywords", data: keywords, update: updateKeywords, status: false },
  {
    title: "Plant Name",
    data: plantName,
    update: updatePlantName,
    status: false,
  },
  {
    title: "Author Name",
    data: authorName,
    update: updateAuthorName,
    status: false,
  },
  {
    title: "Report Title",
    data: reportTitle,
    update: updateReportTitle,
    status: false,
  },
  {
    title: "Bibliographic Info",
    data: bibliographicInfo,
    update: updateBibliographicInfo,
    status: false,
  },
  {
    title: "Update Date",
    data: updateDate,
    update: updateUpdateDate,
    status: false,
  },
  { title: "Sequence", data: sequence, update: updateSequence, status: false },
  { title: "PubMed ID", data: pubMedId, update: updatePubMedId, status: false },
];

const handleSubmit = async () => {
  try {
    const user_id = localStorage.getItem("user_id");
    const body: BodyType = {};
    if (uniqueIdentifier.value) body.id = uniqueIdentifier.value;
    if (briefDescription.value) body.de = briefDescription.value;
    if (uniqueAccessionNumber.value) body.ac = uniqueAccessionNumber.value;
    if (sequence.value) body.sq = sequence.value;
    if (keywords.value) body.kw = keywords.value;
    if (plantName.value) body.os = plantName.value;
    if (authorName.value) body.ra = authorName.value;
    if (reportTitle.value) body.rt = reportTitle.value;
    if (bibliographicInfo.value) body.rl = bibliographicInfo.value;
    if (pubMedId.value) body.rd = pubMedId.value;
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

const handleReset = () => {
  fields.forEach((field) => {
    field.update("");
  });
};

const toggleSelect = ref(false);
const onToggleSelectFields = () => {
  toggleSelect.value = !toggleSelect.value;
};

const selectPerField = (title: string) => {
  const field = fields.find((field) => field.title === title);
  if (field) {
    if (field.status) {
      field.data.value = "";
    }
    field.status = !field.status;
    onToggleSelectFields();
  }
};
</script>

<template>
  <div
    class="min-h-[calc(100vh-80px)] flex flex-col items-center bg-gray-50 py-12"
  >
    <div class="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Query CRE</h1>
      <div class="mt-4">
        <div v-for="(field, index) in fields">
          <QueryField
            v-if="field.status"
            :key="index"
            :title="field.title"
            v-model="field.data.value"
          />
        </div>
      </div>
      <div class="flex justify-between space-x-4 mt-5">
        <div class="relative flex flex-col items-center space-x-2">
          <div
            class="flex items-center justify-between w-80 border border-gray-300 rounded-lg p-3"
            @click="onToggleSelectFields"
          >
            Select Fields
            <span class="material-symbols-outlined"> keyboard_arrow_down </span>
          </div>
          <div
            v-if="toggleSelect"
            class="absolute top-full left-0 w-80 max-h-44 overflow-y-auto border border-gray-300 rounded-lg bg-white mt-2"
          >
            <div
              v-for="(field, index) in fields"
              :key="index"
              class="flex items-center justify-between p-2 border border-gray-300"
              @click="selectPerField(field.title)"
            >
              {{ field.title
              }}<span class="material-symbols-outlined" v-if="field.status">
                check
              </span>
            </div>
          </div>
        </div>
        <div class="space-x-2">
          <button
            type="submit"
            class="bg-custom-green text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
            @click="handleSubmit"
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
      </div>
    </div>
    <div class="max-w-4xl w-full" v-if="showResult">
      <h2 class="text-2xl font-bold text-gray-900 mt-8">
        Results ({{ count }})
      </h2>
      <div class="mt-4">
        <div v-for="item in result" :key="item.id" class="p-4 rounded-lg mt-4">
          <div class="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <div class="flex justify-between items-center">
              <h1 class="text-4xl font-bold text-gray-900 mb-8">
                {{ item.ac }}
              </h1>
              <button>
                <span
                  @click="openModal(item)"
                  class="material-symbols-outlined"
                >
                  visibility
                </span>
              </button>
            </div>

            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-700">
                PubMed ID numbers or GenBank accession number
              </h2>
              <hr class="border-t-2 border-gray-200 my-2" />
              <p class="text-base text-gray-900">
                {{ item.id }}
              </p>
            </div>

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
  <QueryResultModal
    v-if="showModal"
    :detailedItem="detailedItem"
    @closeModal="closeModal"
  />
</template>
