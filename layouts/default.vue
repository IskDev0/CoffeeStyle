<template>
<TheHeader @open="openMobileMenu"/>
  <Transition name="slide">
  <MobileMenu :open-mobile="openMobile" @close="closeMobileMenu" v-show="openMobile"/>
  </Transition>
  <main class="pt-32 text-[#1D1F2E]">
  <slot/>
    <TheSubscribe/>
  </main>
  <TheFooter/>
</template>
<script setup lang="ts">

const openMobile = ref(false)

const closeMobileMenu = ():void => {
  openMobile.value = false
}

const openMobileMenu = ():void => {
  openMobile.value = true
}

import MobileMenu from "../components/MobileMenu";
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>