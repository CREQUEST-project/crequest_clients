<script setup lang="ts">
defineProps({
  detailedItem: Object,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 max-h-[80%] max-w-3xl w-full overflow-y-auto">
      <div class="flex flex-end items-center mb-4">
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
          <span class="material-symbols-outlined"> close </span>
        </button>
      </div>
      <div v-if="detailedItem">
        <div class="w-full max-w-4xl bg-white p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">
            {{ detailedItem.ac }}
          </h1>
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              Unique identifier of the motif
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.id }}
            </p>
          </div>

          <!-- Date of Update -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">Date of update</h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.dt }}
            </p>
          </div>

          <!-- Brief Description of the Motif -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              Brief description of the motif
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.de }}
            </p>
          </div>

          <!-- Keywords -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">Keywords</h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">{{ detailedItem.kw }}</p>
          </div>

          <!-- Common Name and/or Scientific Name of Plant Species -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              Common name and/or scientific name of plant specie
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.os }}
            </p>
          </div>

          <!-- Author Name(s) of a Relevant Report -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              Author name(s) of a relevant report
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.ra }}
            </p>
          </div>

          <!-- Title of the Report -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">Title of the report</h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.rt }}
            </p>
          </div>

          <!-- Bibliographic Information of the Report -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              Bibliographic information of the report
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.rl }}
            </p>
          </div>

          <!-- PubMed ID Numbers or GenBank Accession Number -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">
              PubMed ID numbers or GenBank accession number
            </h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.rd }}
            </p>
          </div>

          <!-- Motif Sequence -->
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700">Motif sequence</h2>
            <hr class="border-t-2 border-gray-200 my-2" />
            <p class="text-base text-gray-900">
              {{ detailedItem.sq }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
