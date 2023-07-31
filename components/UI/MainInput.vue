<template>
  <input @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="border-2 border-black p-2 rounded-md" v-bind="$attrs">
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ""
  },
})
</script>
