<template>
  <div class="bg-gray-100">
  <div class="flex flex-col items-center px-4 md:flex-row md:items-start gap-8 container mx-auto">
  <aside class="md:w-1/6 md:h-screen p-4 mt-10 font-bold">
    <nav class="flex md:flex-col">
    <NuxtLink to="/profile/" class="hover:bg-gray-200 py-2 px-4">Details</NuxtLink>
    <NuxtLink to="/profile/address" class="hover:bg-gray-200 py-2 px-4">Address</NuxtLink>
    <NuxtLink to="/profile/orders" class="hover:bg-gray-200 py-2 px-4">Orders</NuxtLink>
    </nav>
  </aside>
  <div class="w-full md:w-5/6 bg-white p-8 rounded-xl mb-10 md:my-10">
    <slot/>
  </div>
  </div>
  </div>
</template>