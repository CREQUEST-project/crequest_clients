<template>
  <div class="flex">
    <!-- Phần bên trái với hình ảnh -->
    <div
      class="w-1/2 bg-cover bg-center"
      :style="{ backgroundImage: `url(@/assets/your-image.jpg)` }"
    >
      <img src="@/assets/signup.png" alt="Sign up" />
    </div>

    <!-- Phần bên phải chứa form đăng ký -->
    <div class="w-1/2 bg-white flex flex-col justify-center px-16 py-12">
      <h2 class="text-[48px] item-center font-bold text-custom-green mb-10">
        Sign up
      </h2>

      <div class="space-y-6">
        <div>
          <label for="username" class="block text-gray-700 text-lg font-semibold mb-2"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label for="username" class="block text-gray-700 text-lg font-semibold mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 text-lg font-semibold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <ul class="text-gray-600 text-sm space-y-1">
          <li>
            Your password can't be too similar to your other personal
            information.
          </li>
          <li>Your password must contain at least 8 characters.</li>
          <li>Your password can't be a commonly used password.</li>
          <li>Your password can't be entirely numeric.</li>
        </ul>

        <button
          @click="submitRegister"
          type="submit"
          class="w-full bg-custom-green text-white text-[36px] font-bold py-3 rounded-lg hover:bg-green-800"
        >
          Sign up
        </button>
      </div>

      <p class="mt-8 text-center text-gray-600 text-lg">
        Already A Member?
        <a href="/login" class="text-blue-500 font-bold">Login</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "./../constants/Axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const username = ref("");
const password = ref("");
const email = ref("");
const router = useRouter();
const toast = useToast();

const submitRegister = async () => {
  try {
    const response = await axios.post(
      "/auth/register",
      {
        user_name: username.value,
        password: password.value,
        email: email.value,
        user_role_id: 2,
      }
    );
    if (response.status === 200) {
      toast.success("Registration successful!");
      router.push("/login");
    }
  } catch (error) {
    toast.error("Registration failed!");
    console.error(error);
  }
};
</script>
