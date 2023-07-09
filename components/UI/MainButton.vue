<template>
  <button :class="getClassObject" class="uppercase text-center p-2 tracking-widest">
    <slot></slot>
  </button>
</template>
<script setup>

const props = defineProps({
  color: {
    required: true,
    type: String
  },
  size: {
    type: String
  }
});

const getClassObject = computed(() => {
  return {
    'bg-white': props.color === 'white',
    'text-[#1D1F2E]': props.color === 'white',
    'bg-[#1D1F2E]': props.color === 'blue',
    'text-white': props.color === 'blue',
    'w-full' : props.size === 'expand'
  };
});
</script>