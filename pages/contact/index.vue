<template>
<section class="container mx-auto mt-12 px-4">
  <h1 class="text-4xl font-bold text-center uppercase mb-12">Contact Us</h1>
  <form class="flex flex-col gap-4" @submit.prevent="submitForm">
    <div class="flex flex-col gap-3 ">
    <label class="text-xs uppercase tracking-widest font-bold" for="firstName">First name</label>
    <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="formData.firstName" type="text" id="firstName">
    <span class="text-red-500" v-for="error in $v.firstName.$errors" :key="error.$uid">{{error.$message}}</span>
    </div>
    <div class="flex flex-col gap-3">
      <label class="text-xs uppercase tracking-widest font-bold" for="lastName">Last name</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="formData.lastName" type="text" id="lastName">
      <span class="text-red-500" v-for="error in $v.lastName.$errors" :key="error.$uid">{{error.$message}}</span>
    </div>
    <div class="flex flex-col gap-3 ">
      <label class="text-xs uppercase tracking-widest font-bold" for="email">Email address</label>
      <input class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="formData.email" type="email" id="email">
      <span class="text-red-500" v-for="error in $v.email.$errors" :key="error.$uid">{{error.$message}}</span>
    </div>
    <div class="flex flex-col gap-3 ">
      <label class="text-xs uppercase tracking-widest font-bold" for="phone">Phone number</label>
      <VueTelInput
          class="border-2 border-[#1D1F2E] py-2 rounded-md"
          v-model="formData.phone"
          mode="international"
          :autoDefaultCountry="true"
          :required="true"
          :validCharactersOnly="true" />
      <span class="text-red-500" v-for="error in $v.phone.$errors" :key="error.$uid">{{error.$message}}</span>
    </div>
    <div class="flex flex-col gap-3 ">
      <label class="text-xs uppercase tracking-widest font-bold" for="message">Message</label>
      <textarea class="border-2 border-[#1D1F2E] rounded-md p-3" v-model="formData.message" type="email" id="message"/>
      <span class="text-red-500" v-for="error in $v.message.$errors" :key="error.$uid">{{error.$message}}</span>
    </div>
    <MainButton size="expand" color="blue">Submit</MainButton>
  </form>
</section>
</template>

<script setup lang="ts">
import {VueTelInput} from "vue-tel-input";
import {required, email, minLength} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import MainButton from "~/components/UI/MainButton.vue";

useSeoMeta({
  title: "Contact Us | CoffeeStyle",
  description: 'Get in touch with us at CoffeeStyle. If you have any questions, inquiries, or feedback, feel free to contact our friendly customer support team. We are here to assist you!',
  ogTitle: 'Contact Us | CoffeeStyle',
  ogDescription: 'Get in touch with us at CoffeeStyle. If you have any questions, inquiries, or feedback, feel free to contact our friendly customer support team. We are here to assist you!',
  ogImage: '/contact_preview.jpg',
  ogUrl: 'https://www.CoffeeStyle.com/contact-us',
  twitterTitle: 'Contact Us | CoffeeStyle',
  twitterDescription: 'Get in touch with us at CoffeeStyle. If you have any questions, inquiries, or feedback, feel free to contact our friendly customer support team. We are here to assist you!',
  twitterImage: '/contact_preview.jpg',
  twitterCard: 'summary_large_image'
});

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/vue-tel-input/dist/vue-tel-input.css'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.svg'
    }
  ]
})

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: ""
});

const rules = computed(() => {
  return {
    firstName: {required, minLength: minLength(3)},
    lastName: {required, minLength: minLength(3)},
    email: { required, email },
    phone: {required},
    message: {required}
  };
});

const submitForm = async (): Promise<void> => {
  const result = await $v.value.$validate()
  console.log(formData.value)
  if (!result) return
}

const $v = useVuelidate(rules, formData)

</script>