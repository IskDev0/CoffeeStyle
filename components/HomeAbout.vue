<template>
  <div class="home-about_container text-center flex flex-col items-center gap-4 pt-24 px-4">
<h1 class="text-3xl">Even the all-powerful Pointing has no control about the blind texts.</h1>
  <p class="opacity-70">It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
  <NuxtLink to="/about" class="text-[#A25F4B] home-about_link">Read the full Story</NuxtLink>
  </div>
</template>

<style>

.home-about_container {
  max-width: 650px;
  margin: 0 auto;
}

.home-about_link{
  position: relative;
}
.home-about_link:after{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  bottom: -4px;
  left: 0;
  right: 0;
  background: rgba(162, 95, 75, 0.2);
}
</style>