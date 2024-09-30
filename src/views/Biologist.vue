<template>
  <div class="flex">
    <SideBarBiologist
      :searchTerm="searchTerm"
      :listMotifs="listMotifs"
      :selectedMotif="selectedMotif"
      @selectMotif="selectMotif"
      @removeMotif="removeMotif"
      @update:list-motifs="updateListMotifs"
      @update:search-term="updateSearchTerm"
    />

    <!-- Main Content - Form for Editing Motif -->
    <div class="w-3/4 p-8">
      <h1 class="text-2xl font-bold mb-4">Biologist</h1>

      <!-- Check if a motif is selected -->
      <div v-if="selectedMotifToValidate">
        <form @submit.prevent="submitForm">
          <!-- Form Fields for Motif Information -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="sq" class="block">Sequence</label>
              <input
                type="text"
                id="sq"
                v-model="selectedMotifToValidate.sq"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label for="ac" class="block">Accession number*</label>
              <input
                type="text"
                id="ac"
                v-model="selectedMotifToValidate.ac"
                class="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <!-- Other fields -->
          <div class="mb-4">
            <label for="dt" class="block">Date of update:*</label>
            <input
              type="text"
              id="dt"
              v-model="selectedMotifToValidate.dt"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="de" class="block"
              >Brief description of the motif*</label
            >
            <textarea
              id="de"
              v-model="selectedMotifToValidate.de"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="kw" class="block">Keywords:*</label>
            <textarea
              id="kw"
              v-model="selectedMotifToValidate.kw"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="os" class="block"
              >Common name and/or scientific name of plant species*</label
            >
            <textarea
              id="os"
              v-model="selectedMotifToValidate.os"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="ra" class="block"
              >Author name(s) of a relevant report*</label
            >
            <textarea
              id="ra"
              v-model="selectedMotifToValidate.ra"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rt" class="block">Title of the report*</label>
            <textarea
              id="rt"
              v-model="selectedMotifToValidate.rt"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rl" class="block"
              >Bibliographic information of the report*</label
            >
            <textarea
              id="rl"
              v-model="selectedMotifToValidate.rl"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rl" class="block">RC</label>
            <textarea
              id="rl"
              v-model="selectedMotifToValidate.rc"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="rl" class="block"
              >PubMed ID numbers or GenBank accession number*</label
            >
            <textarea
              id="rl"
              v-model="selectedMotifToValidate.rd"
              class="w-full p-2 border rounded-md"
            ></textarea>
          </div>

          <!-- Submit and Reset Buttons -->
          <div class="flex space-x-4">
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-md"
            >
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
  <Loading :isLoading="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "../constants/Axios";
import { MotifName } from "../models/Biologist";
import SideBarBiologist from "../components/SideBarBiologist.vue";
import { useToast } from "vue-toastification";
import Loading from "../components/layouts/Loading.vue";

const listMotifs = ref<MotifName[]>([]);
const toast = useToast();
const isLoading = ref(false);

onMounted(async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("/biologist/computational-motifs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  listMotifs.value = response.data.data;
});

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
  rc: string;
  rd: string;
}

const searchTerm = ref("");
const selectedMotifToValidate = ref<Motif | null>(null);

const selectedMotif = ref<MotifName | null>(null);

const selectMotif = (motif: MotifName) => {
  selectedMotif.value = motif; // Sao chép motif để chỉnh sửa
  selectedMotifToValidate.value = {
    sq: motif.sequences,
    ac: "",
    dt: "",
    de: "",
    kw: "",
    os: "",
    ra: "",
    rt: "",
    rl: "",
    rc: "",
    rd: "",
  };
};

const updateListMotifs = (motifs: MotifName[]) => {
  listMotifs.value = motifs;
};

const updateSearchTerm = (term: string) => {
  searchTerm.value = term;
};

const removeMotif = async (motif: MotifName) => {
  isLoading.value = true;
  try {
    const response = await axios.delete(
      `/biologist/computational-motifs/${motif.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/biologist/computational-motifs/search`,
        {
          sequence: searchTerm.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Motif deleted successfully");
      listMotifs.value = response.data.data;
      selectedMotif.value = null;
      selectedMotifToValidate.value = null;
    }
  } catch (error) {
    toast.error("Failed to delete motif");
  } finally {
    isLoading.value = false;
  }
};

const submitForm = async () => {
  if (!selectedMotif.value) return;
  const response = await axios.post(
    `/biologist/computational-motifs/${selectedMotif.value?.id}/validation`,
    selectedMotifToValidate.value,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.status === 200) {
    const token = localStorage.getItem("token");
    const response = await axios.get("/biologist/computational-motifs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    listMotifs.value = response.data.data;
    toast.success("Motif validated successfully");
    selectedMotif.value = null;
    selectedMotifToValidate.value = null;
  }
};

const resetForm = () => {
  selectedMotif.value = null;
  selectedMotifToValidate.value = null;
};
</script>
