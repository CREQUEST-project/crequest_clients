<template>
  <header class="bg-custom-green text-white font-poppins shadow-md h-[80px]">
    <div class="mx-auto flex items-center justify-between h-full px-4">
      <!-- Logo Section -->
      <a href="/">
        <div class="flex items-center space-x-2">
          <img src="@/assets/logo.png" alt="CREquest Logo" class="h-10" />
          <span class="text-2xl font-bold">CREquest</span>
        </div>
      </a>

      <!-- Navigation and Authentication Links Combined -->
      <div class="flex items-center space-x-8 text-lg">
        <nav class="flex items-center space-x-8">
          <a
            href="/query-care"
            :class="isActive('/query-care')"
            @click="setActive('query-care')"
            class="hover:text-gray-300"
          >
            QUERY CARE
          </a>
          <a
            href="/search-for-care"
            :class="isActive('/search-for-care')"
            @click="setActive('search-for-care')"
            class="hover:text-gray-300"
          >
            SEARCH FOR CARE
          </a>
          <a
            href="/motif-sampler"
            :class="isActive('/motif-sampler')"
            @click="setActive('motif-sampler')"
            class="hover:text-gray-300"
          >
            MOTIF SAMPLER
          </a>

          <a
            v-if="!isLoggedIn"
            :class="isActive('/login')"
            @click="setActive('login')"
            href="/login"
            class="hover:text-link-blue font-semibold"
            >LOGIN/SIGNUP</a
          >
          <a
            v-if="isLoggedIn"
            href="/history"
            :class="isActive('/history')"
            @click="setActive('history')"
            class="hover:text-gray-300"
          >
            HISTORY
          </a>
          <a
            v-if="isLoggedIn"
            href="/biologist"
            :class="isActive('/biologist')"
            @click="setActive('biologist')"
            class="hover:text-gray-300"
          >
            BIOLOGIST
          </a>
        </nav>

        <div v-if="isLoggedIn" class="relative flex items-center">
          <button @click="toggleDropdown" class="focus:outline-none">
            <span class="material-symbols-outlined text-4xl">
              account_circle
            </span>
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute top-10 right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50"
          >
            <a href="#" class="block px-4 py-2 hover:bg-gray-200">PROFILE</a>
            <a @click="logout" class="block px-4 py-2 hover:bg-gray-200 text-red-500"
              >LOG OUT</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { isLoggedIn } from "./../../stores/authStore";

const route = useRoute();
const router = useRouter();
const dropdownOpen = ref(false);
const activeNav = ref("search-for-care");

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
  }
});

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function isActive(...paths: string[]) {
  return paths.includes(route.path)
    ? "bg-white text-custom-green rounded-lg px-4 py-2"
    : "";
}

function setActive(navItem: string) {
  activeNav.value = navItem;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
  isLoggedIn.value = false;
  dropdownOpen.value = false;
  router.push("/login");
}
</script>
