<template>
  <section class="container mx-auto px-4">
    <form @submit.prevent="signUp" class="flex flex-col gap-4">
      <label class="text-xs uppercase tracking-widest font-bold" for="first_name">First Name</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="registerFormData.firstName" type="text" id="first_name">
      <label class="text-xs uppercase tracking-widest font-bold" for="last_name">Last Name</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="registerFormData.lastName" type="text" id="last_name">
      <label class="text-xs uppercase tracking-widest font-bold" for="email">Email</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="registerFormData.email" type="email" id="email">
      <span class="text-red-500" v-for="error in $v.email.$errors" :key="error.$uid">{{error.$message}}</span>
      <label class="text-xs uppercase tracking-widest font-bold" for="password">Password</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="registerFormData.password" type="password" id="password">
      <span class="text-red-500" v-for="error in $v.password.$errors" :key="error.$uid">{{error.$message}}</span>
      <MainButton class="self-center w-full rounded-md" color="blue" type="submit">Register</MainButton>
    </form>
    <span class="flex flex-col items-center md:flex-row justify-center gap-2 mt-6">Already have an account? <NuxtLink class="font-bold underline" to="/auth/login">Sign In</NuxtLink></span>
  </section>

        <LoadingPopup v-if="isLoading"/>

  <MessageAlert v-if="isError" :message="errorMessage" />
</template>

<script setup lang="ts">

import {required, email, minLength} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import MainButton from "~/components/UI/MainButton.vue";
import MessageAlert from "~/components/UI/MessageAlert.vue";
import LoadingPopup from "~/components/UI/LoadingPopup.vue";


const client = useSupabaseAuthClient()

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const errorMessage = ref<string>()

const isLoading = ref<boolean>(false)

const isError = ref<boolean>(false)

const registerFormData = ref(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
)


const rules = computed(() => {
  return {
    firstName: {required},
    lastName: {required},
    email: { required, email },
    password: {required, minLength: minLength(6)}
  };
});

const addUserToDB = async (): Promise<void> => {

  const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: user.value.id,
          first_name: registerFormData.value.firstName,
          last_name: registerFormData.value.lastName,
          email: user.value.email
        },
      ])
      .select()

}

const router = useRouter()

const signUp = async (): Promise<void> => {
  const result = await $v.value.$validate()

  try {
    isLoading.value = true
    isError.value = false
    const {data, error} = await client.auth.signUp({
      email: registerFormData.value.email,
      password: registerFormData.value.password
    })
    await addUserToDB()
    router.replace("/profile")
    if (error) throw error
  }catch (error){
    isLoading.value = false
    isError.value = true
    errorMessage.value = error.message
  }

  if (!result) return
}

const $v = useVuelidate(rules, registerFormData)

</script>