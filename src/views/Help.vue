<template>
  <h1 class="text-4xl font-bold mb-4 p-10">How to use</h1>
  <div class="flex p-10">
    <!-- Sidebar -->
    <ul class="w-1/12 space-y-4 fixed top-1/2 transform -translate-y-1/2">
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
          @click="selectedOption = 'history'"
          :class="buttonClass('history')"
          class="w-full text-left"
        >
          History
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
    <div class="w-1/12"></div>

    <!-- Main Content -->
    <div class="w-5/6 px-8">
      <!-- Query Care Content -->
      <div v-if="selectedOption === 'queryCare'">
        <h1 class="text-2xl font-bold">Query Care</h1>
        <div class="bg-green-600 text-white p-6 rounded-md my-6">
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
        <p class="my-2">
          <b>Actors</b>: Users, Biologists, Guests, Administrators
        </p>
        <p class="my-2"><b>Pre-conditions and Post-conditions</b>: None</p>
        <p class="my-2">
          <b><u>Use</u></b
          >:
        </p>
        <ul class="list-disc ml-6">
          <li class="my-2">
            <b>Step 1</b>: The actor selects the “Query CRE” button. The system
            displays the CRE information search interface.
          </li>
          <li class="my-2">
            <b>Step 2</b>: The actor inputs the desired search information (not
            all fields are mandatory).
          </li>
          <li class="ml-6">
            <b>Input</b>: The fields that can be entered include
          </li>
          <ul class="ml-12">
            <li class="my-2">Unique identifier</li>
            <li class="my-2">Unique accession number</li>
            <li class="my-2">Date of update</li>
            <li class="my-2">Brief description of the CRE</li>
            <li class="my-2">Keywords</li>
            <li class="my-2">
              Common name and/or scientific name of the plant species
            </li>
            <li class="my-2">Author name(s) of a relevant report</li>
            <li class="my-2">Title of the report</li>
            <li class="my-2">Bibliographic information of the report</li>
            <li class="my-2">PubMed ID numbers or GenBank accession number</li>
            <li class="my-2">Sequence</li>
          </ul>
          <li class="my-2">
            <b>Step 2.1</b>: The actor selects “reset” to clear all entered
            information.
          </li>
          <li class="my-2">
            <b>Step 3</b>: The actor submits the search information to the
            system. The system returns a list of CREs matching all the search
            criteria. If no matching CREs are found, the system returns an empty
            result.
          </li>
          <li class="ml-6">
            <b>Output</b>: The returned CRE information is displayed in a list
            that includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">AC: Unique accession number</li>
            <li class="my-2">DT: Date of update</li>
            <li class="my-2">RD: PubMed ID numbers</li>
          </ul>
          <li class="my-2">
            <b>Step 4</b>: The actor selects the desired Unique accession
            number. The system displays detailed information about the selected
            CRE.
          </li>
          <li class="ml-6">
            <b>Output</b>: Detailed CRE information includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">Function label</li>
            <li class="my-2">Function details</li>
            <li class="my-2">Unique identifier</li>
            <li class="my-2">Unique accession number</li>
            <li class="my-2">Date of update</li>
            <li class="my-2">Brief description of the CRE</li>
            <li class="my-2">Keywords</li>
            <li class="my-2">
              Common name and/or scientific name of the plant species
            </li>
            <li class="my-2">Author name(s) of a relevant report</li>
            <li class="my-2">Title of the report</li>
            <li class="my-2">Bibliographic information of the report</li>
            <li class="my-2">PubMed ID numbers or GenBank accession number</li>
            <li class="my-2">Sequence</li>
            <li class="my-2">Note</li>
          </ul>
        </ul>
      </div>

      <!-- Search for Care Content -->
      <div v-if="selectedOption === 'searchForCare'">
        <h1 class="text-2xl font-bold">Search for Care</h1>
        <div class="bg-green-600 text-white p-6 rounded-md my-6">
          <p>
            This function allows all users to access the system and perform
            searches for Cis-regulatory elements (CREs) present in the promoter
            regions of DNA sequence.
          </p>
        </div>
        <p class="my-2">
          <b>Actors</b>: Users, Biologists, Guests, Administrators
        </p>
        <p class="my-2"><b>Pre-conditions and Post-conditions</b>: None</p>
        <p class="my-2">
          <b><u>Use</u></b
          >:
        </p>
        <ul class="list-disc ml-6">
          <li class="my-2">
            <b>Step 1</b>: The actor selects the “Search for CRE” button. The
            system displays the CRE information search interface.
          </li>
          <li class="my-2">
            <b>Step 2</b>: The actor inputs the promoter region.
          </li>
          <li class="ml-6"><b>Input</b>: The promoter region sequence.</li>
          <li class="my-2">
            <b>Step 2.1</b>: The actor selects “reset” to clear all entered
            information.
          </li>
          <li class="my-2">
            <b>Step 3</b>: The actor submits the search information to the
            system. The system returns a list of Cis-regulatory elements (CREs)
            found in the given DNA promoter region. If no matching CREs are
            found, the system returns an empty result.
          </li>
          <li class="ml-6">
            <b>Output</b>: The returned CRE information is categorized into two
            types: function and no-function, includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">Function/No function</li>
            <li class="my-2">Unique accession number</li>
            <li class="my-2">Sequence</li>
          </ul>
          <li class="my-2">
            <b>Step 4</b>: The actor selects the Unique accession number. The
            system displays detailed information about the selected CRE.
          </li>
          <li class="my-2">
            <b>Step 3</b>: The actor submits the search information to the
            system. The system returns a list of CREs matching all the search
            criteria. If no matching CREs are found, the system returns an empty
            result.
          </li>
          <li class="ml-6">
            <b>Output</b>: The returned CRE information is displayed in a list
            that includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">AC: Unique accession number</li>
            <li class="my-2">DT: Date of update</li>
            <li class="my-2">RD: PubMed ID numbers</li>
          </ul>
          <li class="my-2">
            <b>Step 4</b>: The actor selects the desired Unique accession
            number. The system displays detailed information about the selected
            CRE.
          </li>
          <li class="ml-6">
            <b>Output</b>: Detailed CRE information includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">Function label</li>
            <li class="my-2">Function details</li>
            <li class="my-2">Unique identifier</li>
            <li class="my-2">Unique accession number</li>
            <li class="my-2">Date of update</li>
            <li class="my-2">Brief description of the CRE</li>
            <li class="my-2">Keywords</li>
            <li class="my-2">
              Common name and/or scientific name of the plant species
            </li>
            <li class="my-2">Author name(s) of a relevant report</li>
            <li class="my-2">Title of the report</li>
            <li class="my-2">Bibliographic information of the report</li>
            <li class="my-2">PubMed ID numbers or GenBank accession number</li>
            <li class="my-2">Sequence</li>
            <li class="my-2">Note</li>
          </ul>
          <li class="my-2">
            <b>Step 4.1</b>: The actor selects the CRE. The system highlights
            the position of the CRE within the promoter sequence and displays a
            brief description of the CRE.
          </li>
          <li class="ml-6">
            <b>Output</b>: Description of the motif sequence includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">Short description</li>
            <li class="my-2">Organism</li>
          </ul>
        </ul>
      </div>

      <div v-if="selectedOption === 'history'">
        <h1 class="text-2xl font-bold">History</h1>
        <div class="bg-green-600 text-white p-6 rounded-md my-6">
          <p>
            Both biologists and users can view and delete search history after
            logging in. The search history is only displayed for the “Search For
            CRE” function.
          </p>
        </div>
        <p class="my-2"><b>Actors</b>: Users, Biologists, Administrators</p>
        <p class="my-2"><b>Pre-conditions</b>: Logged into the system</p>
        <p class="my-2"><b>Post-conditions</b>: None</p>
        <p class="my-2">
          <b><u>Use</u></b
          >:
        </p>
        <ul class="list-disc ml-6">
          <li class="my-2">
            <b>Step 1</b>: The actor selects the “History” button. The system
            displays the search history interface.
          </li>
          <li class="ml-6">
            <b>Output</b>: The search history interface includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">DNA sequence</li>
            <li class="my-2">Search date</li>
            <li class="my-2">Delete</li>
          </ul>
          <li class="my-2">
            <b>Step 2</b>: The actor selects the DNA sequence of the search
            history they want to review. The system displays the search results
            interface similar to the one shown in the “Search For CRE” function.
          </li>
          <li class="my-2">
            <b>Step 3</b>: The actor can delete any search history by selecting
            the “delete” button of that search history. The system confirms the
            action and deletes the selected search information.
          </li>
        </ul>
      </div>

      <!-- Motif Sampler Content -->
      <div v-if="selectedOption === 'motifSampler'" class="mb-5">
        <h1 class="text-2xl font-bold">Motif Sampler</h1>
        <div class="bg-green-600 text-white p-6 rounded-md my-6">
          <p>
            Motif discovery refers to motifs identified through computational
            methods. This process involves detecting patterns or sequences in
            biological data that appear more frequently than expected and are
            assumed to have functional significance. However, since motif
            discovery generates predictions, the accuracy might not be very
            high.
          </p>
        </div>
        <p class="my-2">
          <b>Actors</b>: Users, Biologists, Guests, Administrators
        </p>
        <p class="my-2"><b>Pre-conditions and Post-conditions</b>: None</p>
        <p class="my-2">
          <b><u>Use</u></b
          >:
        </p>
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
        <div class="bg-green-600 text-white p-6 rounded-md my-6">
          <p>
            The biologist can access and view a list of computational motifs
            that need validation. Based on the motifs in this list, they can
            conduct experiments or search for relevant literature on reputable
            forums to confirm their accuracy. The motifs in the pending list are
            referred to as motif samplers, identified through computational
            methods in the “Motif Sampler” function.
          </p>
        </div>
        <p class="my-2"><b>Actors</b>: Biologist</p>
        <p class="my-2">
          <b>Pre-conditions</b>: Logged in with an account assigned the role of
          biologist
        </p>
        <p class="my-2"><b>Post-conditions</b>: None</p>
        <p class="my-2">
          <b><u>Use</u></b
          >:
        </p>
        <ul class="list-disc ml-6">
          <li class="my-2">
            <b>Step 1</b>: The actor selects the “Biologist” button. The system
            displays the motif validation interface.
          </li>
          <li class="ml-6">
            <b>Output</b>: The information displayed on the history interface
            includes:
          </li>
          <ul class="ml-12">
            <li class="my-2">Sequence</li>
            <li class="my-2">Confirm</li>
            <li class="my-2">Delete</li>
          </ul>
          <li class="my-2">
            <b>Step 2</b>: If the actor wants to approve a motif, they select
            the “Confirm” button next to the motif. The system displays a motif
            information entry interface, where the SQ (Sequence) has already
            been pre-filled. The actor completes the remaining information
            required for motif validation.
          </li>
          <li class="ml-6">
            <b>Input</b>: The fields that need to be filled include:
          </li>
          <ul class="ml-12">
            <li class="my-2">AC: Unique accession number</li>
            <li class="my-2">DT: Date of update</li>
            <li class="my-2">DE: Brief description of the CRE</li>
            <li class="my-2">KW: Keywords</li>
            <li class="my-2">
              OS: Common name and/or scientific name of the plant species
            </li>
            <li class="my-2">RA: Author name(s) of a relevant report</li>
            <li class="my-2">RT: Title of the report</li>
            <li class="my-2">RL: Bibliographic information of the report</li>
            <li class="my-2">
              RD: PubMed ID numbers or GenBank accession number
            </li>
          </ul>
          <li class="my-2">
            <b>Step 2.1</b>: If the actor wants to delete a motif, they select
            the “delete” button next to the motif to be removed. The system
            confirms the action and deletes the selected motif.
          </li>
          <li class="my-2">
            <b>Step 3</b>: After completing the information, the actor selects
            the “submit” button to confirm the validation of the motif. The
            validated motif will be stored with information as a CRE.
          </li>
        </ul>
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
