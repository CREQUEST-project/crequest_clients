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
          <label
            for="username"
            class="block text-gray-700 text-lg font-semibold mb-2"
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
          <label
            for="password"
            class="block text-gray-700 text-lg font-semibold mb-2"
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
        <button
          @click="toggleForgotPasswordModal"
          class="text-blue-500 font-bold"
        >
          Click here
        </button>
      </p>

      <p class="mt-8 text-center text-gray-600 text-lg">
        Not a member yet?
        <a href="/signup" class="text-blue-500 font-bold">Sign up</a>
      </p>
    </div>
    <div
      v-if="isForgotPasswordModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Forgot Password
        </h2>
        <button
          @click="toggleForgotPasswordModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span class="material-icons">close</span>
        </button>
        <div class="space-y-4">
          <div>
            <label class="text-gray-600">Email</label>
            <input
              type="email"
              v-model="forgotPasswordEmail"
              class="w-full border border-gray-300 rounded-lg mt-2 p-2 outline-none focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            @click="sendForgotPasswordEmail"
            class="bg-custom-green text-white font-bold py-2 px-3 rounded-lg hover:bg-green-800 w-full mt-4"
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "./../constants/Axios";
import { useRouter } from "vue-router";
import { isLoggedIn, isBiologist } from "./../stores/authStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const username = ref("");
const password = ref("");

const isForgotPasswordModalVisible = ref(false);
const forgotPasswordEmail = ref("");

const loading = ref(false);
const router = useRouter();

const toggleForgotPasswordModal = () => {
  isForgotPasswordModalVisible.value = !isForgotPasswordModalVisible.value;
};

const Login = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    params.append("username", username.value);
    params.append("password", password.value);
    const response = await axios.post("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Login successful:", response.data);
    localStorage.setItem("token", response.data.access_token);

    const response2 = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.setItem("username", response2.data.user_name);
    localStorage.setItem("user_id", response2.data.id);
    localStorage.setItem("user_role_id", response2.data.user_role_id);

    isLoggedIn.value = true;
    if (localStorage.getItem("user_role_id") === "3") {
      isBiologist.value = true;
    } else {
      isBiologist.value = false;
    }

    toast.success("Login successful!");
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Login failed. Please check your credentials and try again.");
  } finally {
    loading.value = false;
  }
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendForgotPasswordEmail = async () => {
  if (!forgotPasswordEmail.value) {
    toast.error("Please enter your email.");
    return;
  } else if (EMAIL_REGEX.test(forgotPasswordEmail.value) === false) {
    toast.error("Please enter a valid email.");
    return;
  }
  try {
    const response = await axios.put("/user-info/password/forgot", {
      email: forgotPasswordEmail.value,
    });
    if (response.status === 200) {
      toast.success("Reset link sent to your email!");
      toggleForgotPasswordModal();
      forgotPasswordEmail.value = "";
    }
  } catch (error) {
    console.error("Failed to send reset email:", error);
    toast.error("Failed to send reset link. Please try again later.");
  }
};
</script>
