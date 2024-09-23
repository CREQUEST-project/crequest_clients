<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import Datepicker from "vue3-datepicker";

const props = defineProps({
  title: String,
  data: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:data", "removeField"]);

const localData = ref<string | Date>(
  props.title === "Update Date" ? new Date(props.data) : props.data
);

watch(
  () => props.data,
  (newVal) => {
    if (props.title === "Update Date") {
      localData.value = new Date(newVal);
    } else {
      localData.value = newVal;
    }
  }
);

watch(localData, (newValue) => {
  if (props.title === "Update Date" && newValue instanceof Date) {
    emit("update:data", newValue.toISOString().split("T")[0]);
  } else {
    emit("update:data", newValue);
  }
});

const handleRemove = () => {
  emit("removeField", { title: props.title, data: localData.value });
};
</script>

<template>
  <div class="flex items-center justify-between">
    <label class="text-lg font-semibold text-gray-700" :for="title">{{
      title
    }}</label>
    <div class="w-3/4 flex items-center">
      <Datepicker
        v-if="title === 'Update Date'"
        v-model="localData"
        :format="'YYYY-MM-DD'"
        :class="'border w-full border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green'"
      />
      <input
        v-else
        v-model="localData"
        :placeholder="title"
        type="text"
        class="border w-full border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
      />
      <button @click="handleRemove">
        <span class="material-symbols-outlined ml-2 text-red-500">
          delete
        </span>
      </button>
    </div>
  </div>
</template>
