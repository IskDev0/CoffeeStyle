<template>
  <div class="bg-gray-100">
  <div class="flex items-start gap-8 container mx-auto">
  <aside class="w-1/6 h-screen p-4 mt-10 font-bold">
    <nav class="flex flex-col">
    <NuxtLink to="/profile/" class="hover:bg-gray-200 py-2 px-4">Details</NuxtLink>
    <NuxtLink to="/profile/address" class="hover:bg-gray-200 py-2 px-4">Address</NuxtLink>
    <NuxtLink class="hover:bg-gray-200 py-2 px-4">Orders</NuxtLink>
    </nav>
  </aside>
  <div class="w-5/6 bg-white p-8 rounded-xl my-10">
    <slot/>
  </div>
  </div>
  </div>
</template>