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

      <form class="space-y-6">
        <div>
          <label class="block text-gray-700 text-lg font-semibold mb-2"
            >Username</label
          >
          <input
            type="text"
            placeholder="Username"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 text-lg font-semibold mb-2"
            >Password</label
          >
          <input
            type="password"
            placeholder="Password"
            class="w-full border-b-2 border-custom-green py-2 text-lg outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-custom-green text-white text-[36px] font-bold py-3 rounded-lg hover:bg-green-800"
        >
          Login
        </button>
      </form>

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
// Không cần thêm logic bổ sung cho form này ở cấp độ cơ bản.
</script>
