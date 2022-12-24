<script setup>
import {RouterView} from 'vue-router'
import MainHeader from "./components/MainHeader.vue";
import MainHero from "./components/MainHero.vue"
import AboutSection from "./components/AboutSection.vue";
import FeaturedMugs from "./components/FeaturedMugs.vue";</script>

<template>
  <MainHeader/>
  <main class="main">

    <MainHero/>
    <div class="container">
      <AboutSection/>
      <FeaturedMugs/>
      <RouterView/>
    </div>
  </main>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</template>

