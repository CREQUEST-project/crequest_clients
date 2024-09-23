<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import Datepicker from 'vue3-datepicker';

const props = defineProps({
  title: String,
  data: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:data']);

const localData = ref(props.title === 'Date of update' ? new Date(props.data) : props.data);

watch(
  () => props.data,
  (newVal) => {
    if (props.title === 'Date of update') {
      localData.value = new Date(newVal);
    } else {
      localData.value = newVal;
    }
  }
);

watch(localData, (newValue) => {
  if (props.title === 'Date of update' && newValue instanceof Date) {
    emit('update:data', newValue.toISOString().split('T')[0]);
  } else {
    emit('update:data', newValue);
  }
});
</script>

<template>
  <div class="flex">
    <div class="w-1/4">
      <label class="block text-sm font-medium text-gray-700">{{ title }}</label>
    </div>
    <div class="w-3/4">
      <Datepicker
        v-if="title === 'Date of update'"
        v-model="localData"
        :format="'YYYY-MM-DD'"
        :class="'mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'"
      />
      <input
        v-else
        v-model="localData"
        type="text"
        class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      />
    </div>
  </div>
</template>
