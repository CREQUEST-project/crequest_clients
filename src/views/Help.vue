<template>
  <h1 class="text-4xl font-bold mb-4 p-10">How to use</h1>
  <div class="flex h-screen p-10">
    <!-- Sidebar -->
    <ul class="w-1/12 space-y-4">
      <li>
        <button
          @click="selectedOption = 'queryCare'"
          :class="buttonClass('queryCare')"
          class="w-full text-left"
        >
          Query Care
        </button>
      </li>
      <li>
        <button
          @click="selectedOption = 'searchForCare'"
          :class="buttonClass('searchForCare')"
          class="w-full text-left"
        >
          Search for Care
        </button>
      </li>
      <li>
        <button
          @click="selectedOption = 'motifSampler'"
          :class="buttonClass('motifSampler')"
          class="w-full text-left"
        >
          Motif Sampler
        </button>
      </li>
      <li>
        <button
          @click="selectedOption = 'biologist'"
          :class="buttonClass('biologist')"
          class="w-full text-left"
        >
          Biologist
        </button>
      </li>
    </ul>

    <!-- Main Content -->
    <div class="w-4/5 p-8">
      <!-- Query Care Content -->
      <div v-if="selectedOption === 'queryCare'">
        <h1 class="text-2xl font-bold">Query Care</h1>
        <div class="bg-green-600 text-white p-6 rounded-md mb-6">
          <p>
            This function allows all users to access the system and perform
            searches for Cis-regulatory elements (CREs) based on various
            information fields. Cis-regulatory elements (CREs) are specific
            short sequences within DNA, RNA, or proteins that have been
            identified through direct experiments and are of significant
            biological relevance. These CREs contain complete and highly
            accurate information.
          </p>
        </div>
      </div>

      <!-- Search for Care Content -->
      <div v-if="selectedOption === 'searchForCare'">
        <h1 class="text-2xl font-bold">Search for Care</h1>
        <div class="bg-green-600 text-white p-6 rounded-md mb-6">
          <p>
            This function allows all users to access the system and perform
            searches for Cis-regulatory elements (CREs) present in the promoter
            regions of DNA sequence.
          </p>
        </div>
      </div>

      <!-- Motif Sampler Content -->
      <div v-if="selectedOption === 'motifSampler'" class="mb-5">
        <h1 class="text-2xl font-bold">Motif Sampler</h1>
        <div class="bg-green-600 text-white p-6 rounded-md mb-6">
          <p>
            Motif discovery refers to motifs identified through computational
            methods. This process involves detecting patterns or sequences in
            biological data that appear more frequently than expected and are
            assumed to have functional significance. However, since motif
            discovery generates predictions, the accuracy might not be very
            high.
          </p>
        </div>
        <p class="my-2">Actors: Users, Biologists, Guests, Administrators</p>
        <p class="my-2">Pre-conditions and Post-conditions: None</p>
        <p class="my-2">Use:</p>
        <ul class="list-disc ml-6">
          <li class="my-2">
            <b>Step 1</b>: The actor selects the “QueryCARE” button. The system
            displays the motif information search interface.
          </li>
          <li class="my-2">
            <b>Step 2</b>: The actor inputs the desired search information (not
            all fields are mandatory).
          </li>
          <li class="ml-6">
            <b>Input</b>: The fields that can be entered include
          </li>
          <ul class="ml-6">
            <li class="my-2">
              <b>-f &lt;filename&gt;</b>: File with DNA sequences in Fasta
              format (file types: .fna, .fasta, .txt)
            </li>
            <li class="my-2">
              <b>-b &lt;filename&gt;</b>: File with genome-specific background
              model (file type: .bg)
            </li>
            <li class="my-2">
              <b>-o &lt;filename&gt;</b>: File with solutions in annotated
              instances format (file type: .txt)
            </li>
            <li class="my-2">
              <b>-m &lt;filename&gt;</b>: File with solutions in PWM format
              (file type: .mtrx)
            </li>
            <li class="my-2">
              <b>-r &lt;value&gt;</b>: The number of times one algorithm run
              should be repeated with the same parameter settings on the same
              input sequence dataset. Default &lt;100&gt;
            </li>
            <li class="my-2">
              <b>-s &lt;0|1&gt;</b>: Default &lt;1&gt; both strands of the
              sequences will be analyzed (i.e. input sequences and the reverse
              complement). &lt;0&gt; is only input sequences
            </li>
            <li class="my-2">
              <b>-w &lt;value&gt;</b>: The length of the motif. Default
              &lt;8&gt;
            </li>
            <li class="my-2">
              <b>-n &lt;value&gt;</b>: The number of different motifs to search
              for. Default &lt;1&gt;
            </li>
            <li class="my-2">
              <b>-x &lt;value&gt;</b>: The maximal allowed overlap between
              different motifs (only used if -n &gt; 1). Default &lt;1&gt;
            </li>
            <li class="my-2">
              <b>-M &lt;value&gt;</b>: The maximum number of instances of the
              motif to search for in any sequence. Default &lt;2&gt;
            </li>
            <li class="my-2">
              <b>-z &lt;0|1&gt;</b>: Temporary parameter, only for internal use.
              Please do not change the setting unless you are informed on its
              impact on motif sampling. Default &lt;1&gt;
            </li>
            <li class="my-2">
              <b>-Q &lt;value&gt;</b>: Sets a weight on the PSP information
              (provided in -q file) compared to applying a uniform PSP. Default
              &lt;100&gt;
            </li>
          </ul>
          <li class="my-2">
            <b>Step 2.1</b>: The actor selects the &quot;reset&quot; to revert
            the fields to their default values.
          </li>
          <li class="my-2">
            <b>Step 3</b>: The actor selects the &quot;submit&quot; button to
            send the search request to the server. After obtaining the results,
            the system displays the list of discovered motifs.
          </li>
        </ul>
      </div>

      <!-- Biologist Content -->
      <div v-if="selectedOption === 'biologist'">
        <h1 class="text-2xl font-bold">Biologist</h1>
        <div class="bg-green-600 text-white p-6 rounded-md mb-6">
          <p>
            The biologist can access and view a list of computational motifs
            that need validation. Based on the motifs in this list, they can
            conduct experiments or search for relevant literature on reputable
            forums to confirm their accuracy. The motifs in the pending list are
            referred to as motif samplers, identified through computational
            methods in the “Motif Sampler” function.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedOption = ref("motifSampler");

const buttonClass = (option: string) => {
  return selectedOption.value === option
    ? "text-green-500 font-bold"
    : "text-gray-600";
};
</script>

<style scoped>
button {
  padding: 8px;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f3f4f6;
}

button.text-green-500 {
  color: #22c55e;
}
</style>
