<template>
  <div class="mobile__wrapper">
  <nav class="mobile__menu">
    <a @click="$emit('closeMobile', closeMobile)" href="/" class="mobile__menu-item">Home</a>
    <a @click="$emit('closeMobile', closeMobile)" href="#products" class="mobile__menu-item">Our Products</a>
    <a @click="$emit('closeMobile', closeMobile)" href="#blog" class="mobile__menu-item">Blog</a>
    <a @click="$emit('closeMobile', closeMobile)" href="#about" class="mobile__menu-item">About</a>
    <a @click="$emit('closeMobile', closeMobile)" href="#contact" class="mobile__menu-item">Contact</a>
    <a @click="$emit('closeMobile', closeMobile)" href="/" class="mobile__menu-item">Styleguide</a>
  </nav>
  </div>
</template>

<script setup>
let props = defineProps({
  showMobile: {
    type: Boolean,
    required: true
  }
})
let closeMobile = props.showMobile
</script>
