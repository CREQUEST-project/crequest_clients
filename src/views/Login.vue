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
        Login
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
          <label for="password" class="block text-gray-700 text-lg font-semibold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <button
          @click="Login"
          type="submit"
          class="w-full bg-custom-green text-white text-[36px] font-bold py-3 rounded-lg hover:bg-green-800"
        >
          Login
        </button>
      </div>

      <p class="mt-8 text-center text-gray-600 text-lg">
        Forgot your password?
        <a href="/forgot-password" class="text-blue-500 font-bold"
          >Click here</a
        >
      </p>

      <p class="mt-8 text-center text-gray-600 text-lg">
        Not a member yet?
        <a href="/signup" class="text-blue-500 font-bold">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "./../constants/Axios";
import { useRouter } from "vue-router";
import { isLoggedIn } from "./../stores/authStore"; 
import { useToast } from "vue-toastification";

const toast = useToast();
const username = ref("");
const password = ref("");

const loading = ref(false);
const router = useRouter();

const Login = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    params.append("username", username.value);
    params.append("password", password.value);
    const response = await axios.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Login successful:', response.data);
    localStorage.setItem('token', response.data.access_token);

    const response2 = await axios.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.setItem('username', response2.data.user_name);
    localStorage.setItem('user_id', response2.data.id);

    isLoggedIn.value = true;

    toast.success('Login successful!');
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Login failed. Please check your credentials and try again.');
  } finally {
    loading.value = false;
  }
};
</script>
