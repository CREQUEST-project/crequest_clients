<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  title: String,
});

const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (value) => {
    console.log("value", value);
    localValue.value = value;
  }
);
</script>

<template>
  <div class="flex items-center justify-between">
    <label class="text-md font-semibold text-gray-700" :for="title">{{
      title
    }}</label>
    <div class="w-[70%] flex items-center">
      <input
        v-if="title === 'Update Date'"
        v-model="localValue"
        :placeholder="title"
        type="date"
        class="border w-full border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
      />
      <input
        v-else
        v-model="localValue"
        :placeholder="title"
        type="text"
        class="border w-full border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
      />
    </div>
  </div>
</template>
