<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  placeHolder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
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
  <div class="flex justify-between items-center w-full">
    <label class="font-semibold text-gray-600">{{ props.title }}</label>
    <input
      type="text"
      v-model="localValue"
      :placeholder="props.placeHolder"
      class="w-[70%] border border-gray-300 rounded-lg p-3 mt-2 outline-none focus:border-custom-green"
    />
  </div>
</template>
