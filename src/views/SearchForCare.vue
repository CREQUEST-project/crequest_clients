<template>
  <div
    v-if="!showResult"
    class="min-h-screen flex flex-col items-center justify-start pt-12"
  >
    <div class="bg-white rounded-lg max-w-6xl w-full">
      <h1 class="text-[48px] font-bold text-custom-green mb-4">
        SEARCH FOR CRE
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
          @click="sequence = demoSequence"
          class="bg-green-600 text-white py-3 px-10 rounded-lg text-2xl hover:bg-green-700"
        >
          Demo
        </button>
        <button
          @click="submitSearch"
          class="bg-custom-green text-white py-3 px-10 rounded-lg text-2xl hover:bg-green-800"
        >
          Submit
        </button>
        <button
          @click="sequence = ''"
          class="bg-green-600 text-white py-3 px-10 rounded-lg text-2xl hover:bg-green-700"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <div
      v-if="showMinimap"
      class="fixed top-10 right-10 w-[270px] bg-gray-300 p-2 rounded-lg shadow-md overflow-hidden"
    >
      <div
        class="relative w-full h-full bg-gray-100 overflow-hidden rounded p-1 text-[4px] leading-3 font-mono"
      >
        <span
          v-for="(char, index) in sequenceChars"
          :key="index"
          :style="{ backgroundColor: getBackgroundColor(index) }"
        >
          {{ (index + 1) % 10 !== 0 ? char : char + " " }}
        </span>
      </div>
    </div>
    <div
      v-if="showReverseMinimap"
      class="fixed top-10 right-10 w-[270px] bg-gray-300 p-2 rounded-lg shadow-md overflow-hidden"
    >
      <div
        class="relative w-full h-full bg-gray-100 overflow-hidden rounded p-1 text-[4px] leading-3 font-mono"
      >
        <span
          v-for="(char, index) in reverseSequenceChars"
          :key="index"
          :style="{ backgroundColor: getBackgroundColorReverse(index) }"
        >
          {{ (index + 1) % 10 !== 0 ? char : char + " " }}
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between p-4 border-b">
      <!-- Tabs -->
      <div class="flex items-center mx-auto space-x-4">
        <a
          href="#sequence"
          class="text-gray-500 border-b-2 pb-2 transition duration-300"
          :class="{
            'text-green-900 border-green-900': activeTab === 'sequence',
          }"
          @click.prevent="setActiveTab('sequence')"
        >
          Sequence
        </a>
        <a
          href="#revert-sequence"
          class="text-gray-500 border-b-2 pb-2 transition duration-300"
          :class="{
            'text-green-900 border-green-900': activeTab === 'revert-sequence',
          }"
          @click.prevent="setActiveTab('revert-sequence')"
        >
          Revert Sequence
        </a>
      </div>

      <!-- Back Button -->
      <button @click="goBack" class="text-black hover:text-gray-700 transition">
        <span class="material-symbols-outlined font-bold text-3xl"> undo </span>
      </button>
    </div>
    <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
      <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Sequence Analysis</h1>
        <div
          v-if="activeTab === 'sequence'"
          class="bg-gray-100 p-4 rounded-lg font-mono text-lg leading-6"
          @scroll="updateScrollPosition"
          ref="contentContainer"
        >
          <span
            v-for="(char, index) in sequenceChars"
            :key="index"
            :style="{ backgroundColor: getBackgroundColor(index) }"
          >
            {{ (index + 1) % 10 !== 0 ? char : char + " " }}
          </span>
        </div>
        <div
          v-else
          class="bg-gray-100 p-4 rounded-lg font-mono text-lg leading-6"
          @scroll="updateScrollPosition2"
          ref="contentContainer2"
        >
          <span
            v-for="(char, index) in reverseSequenceChars"
            :key="index"
            :style="{ backgroundColor: getBackgroundColorReverse(index) }"
          >
            {{ (index + 1) % 10 !== 0 ? char : char + " " }}
          </span>
        </div>

        <div v-if="activeTab === 'sequence'">
          <h2
            v-if="count < 2"
            class="text-xl font-bold text-gray-900 mt-8 mb-2"
          >
            {{ count }} motif found
          </h2>
          <h2 v-else class="text-xl font-bold text-gray-900 mt-8 mb-2">
            {{ count }} motifs found
          </h2>
        </div>

        <div v-else>
          <h2
            v-if="reverse_count < 2"
            class="text-xl font-bold text-gray-900 mt-8 mb-2"
          >
            {{ reverse_count }} motif found
          </h2>
          <h2 v-else class="text-xl font-bold text-gray-900 mt-8 mb-2">
            {{ reverse_count }} motifs found
          </h2>
        </div>

        <button
          @click="exportCsv"
          class="bg-green-600 text-white text-xl py-1 px-5 mb-3 mx-2 rounded-lg text-sm hover:bg-green-600"
        >
          Export XLSX
        </button>
        <button
          @click="showModal = true"
          class="bg-green-600 text-white text-xl py-1 px-5 mb-3 mx-2 rounded-lg text-sm hover:bg-green-600"
        >
          Send to mail
        </button>
        <div class="min-w-full">
          <div class="flex bg-gray-200 font-bold border-b">
            <div class="w-1/12 px-4 py-2 border"></div>
            <div class="w-1/12 px-4 py-2 border">Accession Number</div>
            <div class="w-3/12 px-4 py-2 border">Motif</div>
            <div class="w-5/12 px-4 py-2 border">Description</div>
            <div class="w-1/6 px-4 py-2 border">Function</div>
          </div>

          <div
            v-if="activeTab === 'sequence'"
            class="max-h-screen overflow-y-auto"
          >
            <div
              v-for="(motif, index) in motifs"
              :key="motif.factor_id"
              class="flex border-b hover:bg-gray-100"
            >
              <!-- Accession Number -->
              <div class="w-1/12 px-4 py-2 border">
                {{ index + 1 }}
              </div>
              <div
                class="w-1/12 px-4 py-2 border cursor-pointer text-blue-500"
                @click="router.push(`/motif-details/${motif.factor_id}`)"
              >
                {{ motif.factor_id }}
              </div>
              <!-- Motif -->
              <div class="w-3/12 px-4 py-2 border">
                <button
                  :style="{ backgroundColor: motif.color }"
                  class="py-1 px-2 rounded"
                  @click="toggleHighlight(index)"
                >
                  {{ motif.sq }}
                </button>
              </div>
              <div class="w-5/12 px-4 py-2 border">
                {{ motif.de }}
              </div>
              <div class="w-1/6 px-4 py-2 border">
                {{ motif.function_label?.label }}
              </div>
            </div>
          </div>

          <div v-else class="max-h-screen overflow-y-auto">
            <div
              v-for="(motif, index) in reverseMatches"
              :key="motif.factor_id"
              class="flex border-b hover:bg-gray-100"
            >
              <div class="w-1/12 px-4 py-2 border">
                {{ index + 1 }}
              </div>
              <div
                class="w-1/12 px-4 py-2 border cursor-pointer text-blue-500"
                @click="router.push(`/motif-details/${motif.factor_id}`)"
              >
                {{ motif.factor_id }}
              </div>
              <!-- Motif -->
              <div class="w-3/12 px-4 py-2 border">
                <button
                  :style="{ backgroundColor: motif.color }"
                  class="py-1 px-2 rounded"
                  @click="toggleHighlightReverse(index)"
                >
                  {{ motif.sq }}
                </button>
              </div>
              <!-- Description -->
              <div class="w-1/2 px-4 py-2 border">
                {{ motif.de }}
              </div>
              <!-- Function -->
              <div class="w-1/6 px-4 py-2 border">
                {{ motif.function_label?.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Enter emails</h2>
      <div class="mb-4 max-h-[350px] overflow-y-auto">
        <div v-for="(_email, index) in emails" :key="index" class="mb-4">
          <input
            v-model="emails[index]"
            type="email"
            placeholder="example@example.com"
            class="w-full border border-gray-300 p-3 rounded-lg mb-2"
          />
          <button
            v-if="emails.length > 1"
            @click="removeEmail(index)"
            class="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>

        <button @click="addEmail" class="text-blue-500 text-sm mb-4">
          + Add another email
        </button>
      </div>
      <div class="flex justify-end space-x-4">
        <button
          @click="showModal = false"
          class="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="submitEmails"
          class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" :isLoading="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import getSearchResult from "./../api/SearchResultApi";
import {
  SearchResultGuest,
  SearchResultUser,
  Match,
} from "./../models/SearchResult";
import { useRouter } from "vue-router";
import { isLoggedIn } from "./../stores/authStore";
import axios from "./../constants/Axios";
import { useToast } from "vue-toastification";
import Loading from "./../components/layouts/Loading.vue";

const router = useRouter();

const sequence = ref("");
const demoSequence = "CTAATCTTATGCATTTAGCAGTACAAATTCAAAAATTTCCCATTTTTATTCATGAATCATACCATTATATATTAACTAAATCCAAGGTAAAAAAAAGGTATGAAAGCTCTATAGTAAGTAAAATATAAATTCCCCATAAGGAAAGGGCCAAGTCCACCAGGCAAGTAAAATGAGCAAGCACCACTCCACCATCACACAATTTCACTCATAGATAACGATAAGATTCATGGAATTATCTTCCACGTGGCATTATTCCAGCGGTTCAAGCCGATAAGGGTCTCAACACCTCTCCTTAGGCCTTTGTGGCCGTTACCAAGTAAAATTAACCTCACACATATCCACACTCAAAATCCAACGGTGTAGATCCTAGTCCACTTGAATCTCATGTATCCTAGACCCTCCGATCACTCCAAAGCTTGTTCTCATTGTTGTTATCATTATATATAGATGACCAAAGCACTAGACCAAACCTCAGTCACACAAAGAGTAAAGAAGAACAA";

const showResult = ref(false);
const toast = useToast();
const isLoading = ref(false);

const result = ref<SearchResultGuest | SearchResultUser>();

const showMinimap = ref(false);
const showReverseMinimap = ref(false);

const sequenceChars = ref();
const reverseSequenceChars = ref();

const forwardMatches = ref<Match[]>([]);
const reverseMatches = ref<Match[]>([]);
const motifs = ref<Match[]>([]);

const showModal = ref(false);
const emails = ref<string[]>([""]);

const count = ref(0);
const reverse_count = ref(0);

const activeTab = ref("sequence");
const setActiveTab = (tab: string) => {
  if (tab === "sequence") {
    showReverseMinimap.value = false;
  } else {
    showMinimap.value = false;
  }
  activeTab.value = tab;
};

const goBack = () => {
  showResult.value = false;
};

const contentContainer = ref<HTMLElement | null>(null);
const contentContainer2 = ref<HTMLElement | null>(null);

const updateScrollPosition = () => {
  if (contentContainer.value) {
    const rect = contentContainer.value.getBoundingClientRect();
    showMinimap.value = rect.bottom < 30 && activeTab.value === "sequence";
  }
};

const updateScrollPosition2 = () => {
  if (contentContainer2.value) {
    const rect = contentContainer2.value.getBoundingClientRect();
    showReverseMinimap.value =
      rect.bottom < 30 && activeTab.value === "revert-sequence";
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollPosition);
  window.addEventListener("scroll", updateScrollPosition2);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollPosition);
  window.removeEventListener("scroll", updateScrollPosition2);
});

const exportCsv = async () => {
  try {
    let response;
    if (isLoggedIn.value) {
      const token = localStorage.getItem("token");
      response = await axios.post(
        "/user/cre/export-excel",
        [
          {
            sequence:
              activeTab.value === "sequence"
                ? sequence.value
                : reverseSequenceChars.value.join(""),
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
    } else {
      response = await axios.post(
        "/guest/cre/export-excel",
        [
          {
            sequence:
              activeTab.value === "sequence"
                ? sequence.value
                : reverseSequenceChars.value.join(""),
          },
        ],
        {
          responseType: "blob",
        }
      );
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "cre.xlsx";
    link.click();
  } catch (error) {
    console.error("Export failed:", error);
  }
};

const addEmail = () => {
  emails.value.push("");
};

const removeEmail = (index: number) => {
  if (emails.value.length > 1) {
    emails.value.splice(index, 1);
  }
};

const submitEmails = async () => {
  if (emails.value.some((email) => !email)) {
    toast.error("Please enter all emails");
    return;
  }

  isLoading.value = true;

  try {
    let response;
    if (isLoggedIn.value) {
      const token = localStorage.getItem("token");
      response = await axios.post(
        "/user/cre/export-excel/send-email",
        {
          receiver_email: emails.value,
          sequence:
            activeTab.value === "sequence"
              ? sequence.value
              : reverseSequenceChars.value.join(""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await axios.post("/guest/cre/export-excel/send-email", {
        receiver_email: emails.value,
        sequence:
          activeTab.value === "sequence"
            ? sequence.value
            : reverseSequenceChars.value.join(""),
      });
    }

    if (response.status === 200)
      toast.success(
        "Emails sent successfully. Please wait for a few minutes to check your inbox."
      );
    showModal.value = false;
  } catch (error) {
    console.error("Failed to send emails:", error);
  } finally {
    isLoading.value = false;
  }
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
  count.value = result.value.forward_strand_matches.length;
  reverse_count.value = result.value.reverse_strand_matches.length;
};

const getBackgroundColor = (index: number) => {
  let bgColor = "";
  motifs.value.forEach((motif) => {
    if (motif.active) {
      motif.positions.forEach((position) => {
        if (index >= position.start && index < position.end) {
          bgColor = motif.color;
        }
      });
    }
  });
  return bgColor;
};

const getBackgroundColorReverse = (index: number) => {
  let bgColor = "";
  reverseMatches.value.forEach((motif) => {
    if (motif.active) {
      motif.positions.forEach((position) => {
        if (index >= position.start && index < position.end) {
          bgColor = motif.color;
        }
      });
    }
  });
  return bgColor;
};

function toggleHighlight(motifIndex: number) {
  motifs.value[motifIndex].active = !motifs.value[motifIndex].active;
}

function toggleHighlightReverse(motifIndex: number) {
  reverseMatches.value[motifIndex].active =
    !reverseMatches.value[motifIndex].active;
}
</script>
