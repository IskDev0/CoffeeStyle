<template>
  <div class="flex">
    <aside class="w-1/6 h-screen bg-[#1D1F2E]">
      <ul class="flex flex-col text-white pt-10">
          <NuxtLink class="py-2 px-4 hover:bg-gray-700" to="/">Home</NuxtLink>
          <NuxtLink class="py-2 px-4 hover:bg-gray-700" to="/admin/dashboard">Dashboard</NuxtLink>
          <NuxtLink class="py-2 px-4 hover:bg-gray-700" to="/admin/products">Products</NuxtLink>
          <NuxtLink class="py-2 px-4 hover:bg-gray-700">Orders</NuxtLink>
        <NuxtLink class="py-2 px-4 hover:bg-gray-700" to="/admin/blogs">Blogs</NuxtLink>
      </ul>
    </aside>
    <div class="w-5/6 h-screen overflow-x-hidden">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active{
  border-left: 5px solid #ababab;
}
</style>