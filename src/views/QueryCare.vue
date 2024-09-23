<script setup lang="ts">
import { ref, computed } from "vue";
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
const accessionNumber = ref("");
const updateDate = ref();
const sequence = ref("");
const uniqueAccessionNumber = ref("");

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

const updateAccessionNumber = (value: string) => {
  accessionNumber.value = value;
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

const count = ref(0);

const fields: Field[] = [
  {
    title: "Unique Identifier",
    data: uniqueIdentifier.value,
    update: updateUniqueIdentifier,
  },
  {
    title: "Brief Description",
    data: briefDescription.value,
    update: updateBriefDescription,
  },
  { title: "Keywords", data: keywords.value, update: updateKeywords },
  { title: "Plant Name", data: plantName.value, update: updatePlantName },
  { title: "Author Name", data: authorName.value, update: updateAuthorName },
  { title: "Report Title", data: reportTitle.value, update: updateReportTitle },
  {
    title: "Bibliographic Info",
    data: bibliographicInfo.value,
    update: updateBibliographicInfo,
  },
  {
    title: "Accession Number",
    data: accessionNumber.value,
    update: updateAccessionNumber,
  },
  { title: "Update Date", data: updateDate.value, update: updateUpdateDate },
  { title: "Sequence", data: sequence.value, update: updateSequence },
  {
    title: "Unique Accession Number",
    data: uniqueAccessionNumber.value,
    update: updateUniqueAccessionNumber,
  },
];

const chosenFields = ref<Field[]>([]);
const selectedOption = ref<string | null>(null);

const addField = (title: string) => {
  const field = fields.find((field) => field.title === title);
  if (field) {
    if (!chosenFields.value.some((f) => f.title === title)) {
      chosenFields.value.push({
        ...field,
        data: ref(field.data).value,
      });
    }
  }
};

const removeField = (fieldToRemove: Field) => {
  const index = chosenFields.value.findIndex(
    (field) => field.title === fieldToRemove.title
  );
  if (index !== -1) {
    chosenFields.value.splice(index, 1);
  }
};

const options = [
  { value: "Unique Identifier", label: "Unique Identifier" },
  { value: "Brief Description", label: "Brief Description" },
  { value: "Keywords", label: "Keywords" },
  { value: "Plant Name", label: "Plant Name" },
  { value: "Author Name", label: "Author Name" },
  { value: "Report Title", label: "Report Title" },
  { value: "Bibliographic Info", label: "Bibliographic Info" },
  { value: "Accession Number", label: "Accession Number" },
  { value: "Update Date", label: "Update Date" },
  { value: "Sequence", label: "Sequence" },
  { value: "Unique Accession Number", label: "Unique Accession Number" },
];

const availableOptions = computed(() => {
  return options.filter(
    (option) =>
      !chosenFields.value.some((field) => field.title === option.value)
  );
});

const handleAddField = () => {
  if (selectedOption.value) {
    addField(selectedOption.value);
    selectedOption.value = null;
  }
};

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
    if (accessionNumber.value) body.rd = accessionNumber.value;
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
  selectedOption.value = null;
  chosenFields.value = [];
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-50 py-12">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Query CRE</h1>
      <select v-model="selectedOption" class="border p-2 rounded">
        <option
          v-for="option in availableOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <button
        @click="handleAddField"
        class="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      >
        Add Field
      </button>

      <div class="mt-4">
        <QueryField
          v-for="(field, index) in chosenFields"
          :key="index"
          :title="field.title"
          :data="field.data"
          @update:data="field.update"
          @removeField="removeField"
        />
      </div>
      <div class="flex justify-center space-x-4 mt-5">
        <button
          type="submit"
          class="bg-custom-green text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
          :disabled="chosenFields.length === 0"
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
