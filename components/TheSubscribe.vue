<template>
  <section class="bg-[#1D1F2E] text-white text-center py-20">
    <div class="w-1/3 mx-auto">
<h1 class="tracking-widest uppercase text-xs">Sign up and get free coffee bags</h1>
  <h2 class="text-4xl pt-4 pb-6">Coffee Updates</h2>
  <form class="mb-6 flex gap-2.5 justify-center">
    <input class="upper-placeholder bg-transparent p-4 border-2 border-[#2F303E] placeholder-white w-2/3 focus:outline-white" type="email" placeholder="customer@coffeestyle.io">
    <input class="bg-white text-black uppercase tracking-widest py-4 px-6" type="submit" value="subscribe">
  </form>
    </div>
  </section>
</template>

<style scoped>
.upper-placeholder::placeholder {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
}
</style>