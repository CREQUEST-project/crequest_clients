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
            SAVE PROFILE
          </button>
          <button
            @click="toggleChangePasswordModal"
            class="bg-green-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-800"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isChangePasswordModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Change Password
        </h2>
        <button
          @click="toggleChangePasswordModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span class="material-icons">close</span>
        </button>
        <div class="space-y-4">
          <div>
            <label class="text-gray-600">Current Password</label>
            <input
              type="password"
              v-model="currentPassword"
              class="w-full border border-gray-300 rounded-lg mt-2 p-2 outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label class="text-gray-600">New Password</label>
            <input
              type="password"
              v-model="newPassword"
              class="w-full border border-gray-300 rounded-lg mt-2 p-2 outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label class="text-gray-600">Confirm New Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              class="w-full border border-gray-300 rounded-lg mt-2 p-2 outline-none focus:border-green-500"
            />
          </div>
          <button
            @click="changePassword"
            class="bg-green-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-800 w-full mt-4"
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

const isChangePasswordModalVisible = ref(false);

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

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

const toggleChangePasswordModal = () => {
  isChangePasswordModalVisible.value = !isChangePasswordModalVisible.value;
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.error("New passwords do not match!");
    return;
  }

  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.put(
      `/user-info/${userId}/password/change`,
      {
        old_password: currentPassword.value,
        new_password: newPassword.value,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.status === 200) {
      toast.success("Password changed successfully!");
      toggleChangePasswordModal();
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    }
  } catch (error) {
    toast.error("Failed to change password!");
    console.error(error);
  }
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
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
