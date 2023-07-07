<template>
  <section class="w-1/2 mx-auto">
  <pre v-if="user">{{user.email}}</pre>
  <MainButton color="blue" @click="userLogout">Logout</MainButton>
  </section>
</template>

<script setup lang="ts">

import MainButton from "~/components/UI/MainButton.vue";

const {auth}  = useSupabaseAuthClient()
const user = useSupabaseUser();

const router = useRouter()

const userLogout = async () => {
  await auth.signOut();
  router.replace("/auth/register")
};

</script>