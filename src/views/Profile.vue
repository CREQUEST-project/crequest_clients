<template>
  <div class="min-h-[calc(100vh-80px)] flex justify-center items-center">
    <div
      class="bg-white rounded-lg shadow-lg max-w-5xl w-full p-8 flex flex-col lg:flex-row lg:items-start border border-green-600 relative"
    >
      <h1
        class="absolute -top-6 left-8 text-4xl font-bold text-green-800 bg-white px-2"
      >
        Profile
      </h1>
      <!-- Thông tin cá nhân -->
      <div class="flex-1 lg:mr-8">
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Username</h2>
            <input
              type="text"
              v-model="username"
              class="w-full border-b border-gray-300 outline-none focus:border-green-500 text-gray-600 mt-2 py-2"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Email</h2>
            <input
              type="email"
              v-model="email"
              class="w-full border-b border-gray-300 outline-none focus:border-green-500 text-gray-600 mt-2 py-2"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Location</h2>
            <input
              type="text"
              v-model="location"
              class="w-full border-b border-gray-300 outline-none focus:border-green-500 text-gray-600 mt-2 py-2"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Phone</h2>
            <input
              type="text"
              v-model="phone"
              class="w-full border-b border-gray-300 outline-none focus:border-green-500 text-gray-600 mt-2 py-2"
            />
          </div>
        </div>
      </div>

      <!-- Ảnh đại diện và nút chỉnh sửa -->
      <div class="flex flex-col items-center mt-8 lg:mt-0 lg:w-2/5">
        <div class="relative mb-6">
          <img
            id="profile-picture"
            alt="Profile Picture"
            class="w-40 h-40 rounded-full border border-gray-300"
          />
          <label
            for="avatar"
            class="absolute bottom-0 right-0 py-2 bg-white rounded-full shadow-lg cursor-pointer"
          >
            <span class="material-icons text-gray-500">camera_alt</span>
          </label>
          <input
            type="file"
            id="avatar"
            class="hidden"
            @change="updateProfilePicture"
          />
        </div>
        <div class="space-x-4">
          <button
            @click="editProfile"
            class="bg-green-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-800"
          >
            EDIT PROFILE
          </button>
          <button
            @click="changePassword"
            class="bg-green-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-800"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "../constants/Axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const username = ref("");
const email = ref("");
const location = ref("");
const phone = ref("");

onMounted(async () => {
  await getProfile();
});

const getProfile = async () => {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.get(`/user-info/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = response.data;
    username.value = data.user_name;
    email.value = data.email;
    location.value = data.location;
    phone.value = data.phone;
    const base64String = response.data.avatar;

    const imageElement = document.getElementById(
      "profile-picture"
    ) as HTMLImageElement;
    if (imageElement) {
      if (base64String === null) {
        imageElement.src = "https://via.placeholder.com/150";
      } else {
        imageElement.src = `data:image/jpeg;base64,${base64String}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const editProfile = async () => {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.put(
      `/user-info/${userId}`,
      {
        user_name: username.value,
        email: email.value,
        location: location.value,
        phone: phone.value,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (response.status === 200) {
      toast.success("Profile updated successfully!");
      await getProfile();
    }
  } catch (error) {
    toast.error("Profile update failed!");
    console.error(error);
  }
};

const changePassword = () => {
  console.log("Change Password clicked");
};

const updateProfilePicture = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const user_id = localStorage.getItem("user_id");
  if (input.files && input.files[0]) {
    const file = input.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.put(
        `/user-info/${user_id}/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile picture updated successfully!");
        await getProfile();
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
/* Thêm một số biểu tượng nếu cần */
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
