<template>
  <section class="w-1/2 mx-auto" v-if="currentUser">
    <h1 class="font-bold text-xl mb-10">Personal information</h1>
    <form @submit.prevent="updateUserDetails" class="flex flex-col gap-4">
    <label class="text-xs uppercase tracking-widest font-bold" for="first_name">First Name</label>
    <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="currentUser.first_name" type="text" id="first_name">
    <label class="text-xs uppercase tracking-widest font-bold" for="last_name">First Name</label>
    <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="currentUser.last_name" type="text" id="last_name">
      <label class="text-xs uppercase tracking-widest font-bold" for="phone">Phone</label>
      <VueTelInput
          class="border-2 border-[#1D1F2E] py-2 rounded-md"
          v-model="currentUser.phone"
          mode="international"
          :autoDefaultCountry="true"
          :required="true"
          :validCharactersOnly="true"/>
      <MainButton @click="updateUserDetails" color="blue">Save</MainButton>
    </form>
    <form @submit.prevent="updateUserAuth" class="flex flex-col gap-4 mt-10">
      <label class="text-xs uppercase tracking-widest font-bold" for="email">Email</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="currentUser.user.email" type="email" id="email">
      <label class="text-xs uppercase tracking-widest font-bold" for="password">Password</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="newPassword" type="password" id="password">
      <MainButton @click="updateUserAuth" color="blue">Save</MainButton>
    </form>
  <MainButton class="mt-10" size="expand" color="blue" @click="userLogout">Logout</MainButton>
  </section>
  <Transition name="slide-fade">
  <MessageAlert v-if="isError"  :message="errorMessage"/>
  </Transition>
</template>

<script setup lang="ts">
import {VueTelInput} from "vue-tel-input";
import MainButton from "~/components/UI/MainButton.vue";
import MessageAlert from "~/components/UI/MessageAlert.vue";

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/vue-tel-input/dist/vue-tel-input.css'
    }
  ]
})

const {auth}  = useSupabaseAuthClient()
const user = useSupabaseUser();
const supabase = useSupabaseClient()

const router = useRouter()

const newPassword =ref<string>()

const errorMessage = ref<string>()

const currentUser = ref<UserType>()

const userLogout = async () => {
  await auth.signOut();
  router.replace("/auth/register")
};

const getUser = async () => {

  let { data: users, error } = await supabase
      .from('users')
      .select("*")
      .filter('user->>id', 'eq', user.value!.id)
      .single()

  currentUser.value = users

}

const updateUserDetails = async () => {


  const { data, error } = await supabase
      .from('users')
      .update({
        first_name: currentUser.value.first_name,
        last_name: currentUser.value.last_name,
        phone: currentUser.value.phone
      })
      .filter('user->>id', 'eq', user.value!.id)
      .select()

}

const isError = ref(false)

const updateUserEmail = async () => {

  const { data, error } = await supabase.auth.updateUser({email: currentUser.value.user.email})
  if (error){
    newPassword.value = ""
    isError.value = true
    errorMessage.value=error.message
    setTimeout(()=> {
      isError.value = false
    },3000)
  }
}

const updateUserPassword = async () => {

  const { data, error } = await supabase.auth.updateUser({password: newPassword.value})
  if (error){
    newPassword.value = ""
    isError.value = true
    errorMessage.value=error.message
    setTimeout(()=> {
      isError.value = false
    },2000)
  }
}

const updateUserAuth = async () => {
  if (newPassword.value && user.value.email != currentUser.value.user.email){
    await updateUserEmail()
    await updateUserPassword()
  }
  if (newPassword.value){
    await updateUserPassword()
  }
  if (user.value.email != currentUser.value.user.email){
    await updateUserEmail()
  }
}

onMounted(() => {
  getUser()
})

</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(.57,.21,.69,1.25) ;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(.57,.21,.69,1.25) ;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style>