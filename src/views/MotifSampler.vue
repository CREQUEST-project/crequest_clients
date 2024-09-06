<template>
  <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
    <div class="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Motif Sample</h1>

      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2
            class="text-lg font-bold bg-custom-green-1 text-white px-4 py-2 rounded-lg inline-block mb-4"
          >
            INPUT
          </h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -f &lt;file name&gt;
              </label>
              <input
                type="file"
                @change="handleFileChange('f', $event)"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              file with DNA sequences in Fasta format
            </p>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -b &lt;file name&gt;
              </label>
              <input
                type="file"
                @change="handleFileChange('b', $event)"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              file with genome-specific backgroundmodel (format), please choose
              your way
            </p>
          </div>
        </div>

        <div>
          <h2
            class="text-lg font-bold bg-custom-green-1 text-white px-4 py-2 rounded-lg inline-block mb-4"
          >
            OUTPUT
          </h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -o &lt;file name&gt;
              </label>
              <input
                type="text"
                v-model="outputFile"
                placeholder="filename.txt"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              file with solutions in annotated instances format
            </p>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -m &lt;file name&gt;
              </label>
              <input
                type="text"
                v-model="matrixFile"
                placeholder="filename.mtrx"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              file with solutions in PWM format
            </p>
          </div>
        </div>
      </div>

      <h2
        class="text-lg font-bold bg-custom-green-1 text-white px-4 py-2 rounded-lg inline-block mb-4"
      >
        PARAMETERS
      </h2>
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -r &lt;value&gt;
              </label>
              <input
                type="number"
                v-model="repeatCount"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              number of times one algorithm run should be repeated with the same
              parameter settings on the same input sequence dataset. Default
              &lt;100&gt;
            </p>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -w &lt;value&gt;
              </label>
              <input
                type="number"
                v-model="motifLength"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              length of the motif. Default &lt;8&gt;
            </p>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -x &lt;value&gt;
              </label>
              <input
                type="number"
                v-model="overlapValue"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              maximal allowed overlap between different motifs (only used if -n
              &gt; 1). Default &lt;1&gt;
            </p>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-semibold text-gray-700 w-40">
                -Q &lt;value&gt;
              </label>
              <input
                type="number"
                v-model="pspWeight"
                class="flex-1 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p class="text-sm text-gray-600 ml-40 mt-1">
              sets a weight on the PSP information (provided in -q file)
              compared to applying a uniform PSP. Default &lt;100&gt;
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-semibold text-gray-700 w-40">
              -s &lt;0|1&gt;
            </label>
            <input
              type="number"
              v-model="strandOption"
              class="flex-1 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <p class="text-sm text-gray-600 ml-40 mt-1">
            default &lt;1&gt; both strands of the sequences will be analyzed
            (i.e. input sequences and the reverse complement). &lt;0&gt; is only
            input sequences
          </p>

          <div class="flex items-center space-x-2">
            <label class="text-sm font-semibold text-gray-700 w-40">
              -n &lt;value&gt;
            </label>
            <input
              type="number"
              v-model="motifCount"
              class="flex-1 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <p class="text-sm text-gray-600 ml-40 mt-1">
            number of different motifs to search for. Default &lt;1&gt;
          </p>

          <div class="flex items-center space-x-2">
            <label class="text-sm font-semibold text-gray-700 w-40">
              -M &lt;value&gt;
            </label>
            <input
              type="number"
              v-model="maxInstances"
              class="flex-1 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <p class="text-sm text-gray-600 ml-40 mt-1">
            maximum number of instances of a motif to search for in any
            sequence. Default &lt;2&gt;
          </p>

          <div class="flex items-center space-x-2">
            <label class="text-sm font-semibold text-gray-700 w-40">
              -z &lt;0|1&gt;
            </label>
            <input
              type="number"
              v-model="temporaryParameter"
              class="flex-1 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <p class="text-sm text-gray-600 ml-40 mt-1">
            Temporary parameter, only for internal use. Please do not change the
            setting unless you are informed on its impact on motif sampling.
            Default &lt;1&gt;
          </p>
        </div>
      </div>

      <div class="mt-8 flex space-x-4 justify-center">
        <button
          @click="handleSubmit"
          class="bg-custom-green-1 text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold"
        >
          Submit
        </button>
        <button
          @click="handleReset"
          class="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700 font-semibold"
        >
          Reset
        </button>
      </div>
      <div v-if="showResult" class="flex flex-col mx-auto justify-center items-center mt-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 w-full text-left">Result</h2>
        <div v-for="(item, index) in result" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <Loading :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "./../constants/Axios";
import { isLoggedIn } from "./../stores/authStore";
import Loading from "./../components/layouts/Loading.vue";

// Input fields
const inputFiles = ref<{ f: File | null; b: File | null }>({
  f: null,
  b: null,
});
const outputFile = ref("");
const matrixFile = ref("");

const repeatCount = ref(100);
const motifLength = ref(8);
const overlapValue = ref(1);
const strandOption = ref(0);
const motifCount = ref(1);
const maxInstances = ref(2);
const pspWeight = ref(100);
const temporaryParameter = ref(1);

const isLoading = ref(false);

const result = ref([]);
const showResult = computed(() => result.value.length > 0);

function handleFileChange(key: "f" | "b", event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    inputFiles.value[key] = files[0];
  }
}

const handleSubmit = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append("f_file", inputFiles.value.f as File);
  formData.append("b_file", inputFiles.value.b as File);
  formData.append("output_o", outputFile.value);
  formData.append("output_m", matrixFile.value);
  formData.append("r", repeatCount.value.toString());
  formData.append("w", motifLength.value.toString());
  formData.append("x", overlapValue.value.toString());
  formData.append("s", strandOption.value.toString());
  formData.append("n", motifCount.value.toString());
  formData.append("M", maxInstances.value.toString());
  formData.append("Q", pspWeight.value.toString());
  formData.append("z", temporaryParameter.value.toString());

  if (isLoggedIn.value) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/user/motif-sampler", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      result.value = response.data.results;
      console.log("Motif Sampler response:", response.data);
    } catch (error) {
      console.error("Motif Sampler error:", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    try {
      const response = await axios.post("/guest/motif-sampler", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      result.value = response.data.results;
      console.log("Motif Sampler response:", response.data);
    } catch (error) {
      console.error("Motif Sampler error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

function handleReset() {
  inputFiles.value = { f: null, b: null };
  outputFile.value = "";
  matrixFile.value = "";
  repeatCount.value = 100;
  motifLength.value = 8;
  overlapValue.value = 1;
  strandOption.value = 0;
  motifCount.value = 1;
  maxInstances.value = 2;
  pspWeight.value = 100;
  temporaryParameter.value = 1;
}
</script>

<style>
.bg-custom-green-1 {
  background-color: #004d00;
}
</style>
