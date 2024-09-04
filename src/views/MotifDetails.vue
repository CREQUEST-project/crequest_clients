<template>
  <div class="min-h-screen py-10 bg-gray-50 flex flex-col items-center">
    <div class="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        {{ motifData.ac }}
      </h1>

      <!-- Function Label -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Function label</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.functionLabel }}</p>
      </div>

      <!-- Function Details -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-700">Function details</h2>
        <hr class="border-t-2 border-gray-200 my-2" />
        <p class="text-base text-gray-900">{{ motifData.functionDetails }}</p>
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

const accessionNumber = useRouter().currentRoute.value.params.id;

// Dummy data to simulate the response you provided
const motifData = ref({
  uniqueAccessionNumber: "S000474",
  functionLabel: "None",
  functionDetails: "",
  dateOfUpdate: "01-August-2006 (last modified) kehi",
  briefDescription: `"Site II element" found in the promoter regions of cytochromegenes (Cytc-1, Cytc-2) in Arabidopsis; Located between -147 and-156 from the translational starts sites (Welchen et al., 2005);Y=C/T; See also S000308; Overrepresented in the promoters ofnuclear genes encoding components of the oxidativephosphorylation (OxPhos) machinery from both Arabidopsis and rice(Welchen and Gonzalez, 2006);`,
  keywords: "cytochrome; TCP-domain; meristem; oxidative phosphorylation;",
  commonName: "Arabidopsis thaliana; Oryza sativa (rice);",
  authorNames: "Welchen E, Gonzalez DH. Welchen E, Gonzalez DH.",
  reportTitle:
    "Differential expression of the Arabidopsis cytochrome c genesCytc-1 and Cytc-2. Evidence for the involvement of TCP-domainprotein-binding elements in anther- and meristem-specificexpression of the Cytc-1 gene.Overrepresentation of Elements Recognized by TCP-DomainTranscription Factors in the Upstream Regions of Nuclear GenesEncoding Components of the Mitochondrial OxidativePhosphorylation Machinery.",
  bibliographicInfo:
    "Plant Physiol. 139: 88-100 (2005) Plant Physiol. 141:540-545 (2006)",
  pubmedIdNumbers: "PubMed: 16113211 PubMed: 16760496",
  motifSequence: "TGGGCY",
});

onBeforeMount(async () => {
  const response = await axios.post("/guest/query-cre", {
    ac: accessionNumber,
  });
  motifData.value = response.data.data[0];
});
</script>
