<template>
  <div
    class="relative min-h-screen bg-white flex items-center justify-between overflow-hidden"
  >
    <div class="max-w-3xl pl-10 lg:pl-20">
      <h1 class="text-5xl text-gray-900 leading-tight mb-6">
        SEARCH INFORMATION ABOUT MOTIFS
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        The QueryCRE function is accessible to any user. QueryCRE allows users
        to search information about motifs in the database.
      </p>
      <button
        class="bg-custom-green text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300"
        @click="router.push('/search-for-cre')"
      >
        START SEARCHING
      </button>
      <div class="flex space-x-2 mt-8">
        <span class="w-3 h-3 bg-custom-green rounded-full"></span>
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
      </div>
    </div>

    <div
      class="flex-1 h-full flex justify-end items-center pr-10 lg:pr-20 z-20"
    >
      <img
        src="@/assets/home.png"
        alt="Home"
        class="object-contain h-96 lg:h-auto"
      />
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-r from-green-300 via-green-400 to-green-500 transform -skew-y-6 z-10"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
