<template>
  <section class="container mx-auto px-4">
    <form @submit.prevent="submitAuthForm" class="flex flex-col  gap-4">
      <label class="text-xs uppercase tracking-widest font-bold" for="email">Email</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="signFormData.email" type="email" id="email">
      <span class="text-red-500" v-for="error in $v.email.$errors" :key="error.$uid">{{error.$message}}</span>
      <label class="text-xs uppercase tracking-widest font-bold" for="password">Password</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="signFormData.password" type="password" id="password">
      <span class="text-red-500" v-for="error in $v.password.$errors" :key="error.$uid">{{error.$message}}</span>
      <MainButton class="self-center w-full rounded-md" color="blue" type="submit">Login</MainButton>
    </form>
    <span class="flex flex-col items-center md:flex-row justify-center gap-2 mt-6">Dont have an account? <NuxtLink class="font-bold underline" to="/auth/register">Sign Up</NuxtLink></span>
  </section>

      <LoadingPopup v-if="isLoading" />

    <MessageAlert v-if="isError" :message="errorMessage" />
</template>

<script setup lang="ts">


const client = useSupabaseAuthClient()


import {required, email, minLength} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import MainButton from "~/components/UI/MainButton.vue";
import MessageAlert from "~/components/UI/MessageAlert.vue";
import LoadingPopup from "~/components/UI/LoadingPopup.vue";

const signFormData = ref(
    {
      email: "",
      password: ""
    }
)


const rules = computed(() => {
  return {
    email: { required, email },
    password: {required, minLength: minLength(6)}

  };
});

const isLoading = ref<boolean>(false)

const isError = ref<boolean>()

const errorMessage = ref<string>()

const router = useRouter()

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const submitAuthForm = async (): Promise<void> => {
  const result = await $v.value.$validate()

  try {
    isLoading.value = true
    isError.value = false
    const { data, error } = await client.auth.signInWithPassword({
      email: signFormData.value.email,
      password: signFormData.value.password,
    })


    if (error) throw error
    else  router.replace("/profile")
  }catch (error){
    errorMessage.value = error.message
    isError.value = true
  }finally {
    isLoading.value = false
  }

  if (!result) return
}

const $v = useVuelidate(rules, signFormData)

</script>