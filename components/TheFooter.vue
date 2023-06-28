<template>
<footer class="w-1/2 mx-auto flex justify-between gap-5 mt-24 mb-12">
<div class="flex flex-col w-2/6 gap-6">
  <NuxtLink to="/"><img src="/logo.svg" alt="logo"></NuxtLink>
  <p class="opacity-70">Delivering the best coffee life since 1996. From coffee geeks to the real ones.</p>
</div>
  <div class="flex flex-col w-1/6 gap-6">
    <h1 class="tracking-widest uppercase text-xs">Menu</h1>
    <ul class="opacity-70 flex flex-col gap-2.5">
      <li>
        <NuxtLink>Home</NuxtLink>
      </li>
      <li>
        <NuxtLink>Our Products</NuxtLink>
      </li>
      <li>
        <NuxtLink>About</NuxtLink>
      </li>
      <li>
        <NuxtLink>Contact</NuxtLink>
      </li>
      <li>
        <NuxtLink>Styleguide</NuxtLink>
      </li>
    </ul>
  </div>
  <div class="flex flex-col w-1/6 gap-6">
    <h1 class="tracking-widest uppercase text-xs">Follow Us</h1>
    <ul class="opacity-70 flex flex-col gap-2.5">
      <li>
        <a href="https://facebook.com">Facebook</a>
      </li>
      <li>
        <a href="https://instagram.com">Instagram</a>
      </li>
      <li>
        <a href="https://pinterest.com">Pinterest</a>
      </li>
      <li>
        <a href="https://twitter.com">Twitter</a>
      </li>
    </ul>
  </div>
  <div class="flex flex-col w-1/6 gap-6">
    <h1 class="tracking-widest uppercase text-xs">Contact Us</h1>
    <p>We’re Always Happy to Help</p>
    <a class="text-2xl" href="mailto:us@coffeestyle.io">us@coffeestyle.io</a>
  </div>
</footer>
</template>

<script setup>

</script>