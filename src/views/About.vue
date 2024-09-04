<template>
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Text section -->
      <div class="my-auto">
        <h1 class="text-4xl font-bold mb-4">About</h1>
        <p class="text-lg mb-4">
          This database is a collection of nucleotide sequence motifs related to
          the regulations of gene expressions, such as promoters, in higher
          plants. The data are annotated and the database provides users with
          information of publications, links to PubMed and DDBJ/EMBL/GenBank
          accession numbers. Users can search this database for possible motifs
          in their own sequence data.
        </p>
      </div>
      <!-- Image section -->
      <div class="flex">
        <div class="grid gap-2 mx-2">
          <img src="@/assets/about1.png" alt="Flower 1" class="object-cover" />
          <img src="@/assets/about3.png" alt="Flower 2" class="object-cover" />
          <img src="@/assets/about5.png" alt="Flower 3" class="object-cover" />
        </div>
        <div class="grid gap-4">
          <img src="@/assets/about2.png" alt="Flower 4" class="object-cover" />
          <img src="@/assets/about4.png" alt="Flower 5" class="object-cover" />
          <img src="@/assets/about6.png" alt="Flower 6" class="object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
