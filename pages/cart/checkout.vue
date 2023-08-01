<template>
  <section class="bg-gray-100 pt-10">
    <div class="container mx-auto flex gap-10">
    <section class="w-1/2 bg-white p-6 rounded-md">
    <div>
    <h1 class="text-xl font-bold">User details</h1>
    <div class="flex flex-col gap-4" v-if="userData">
      <MainInput v-model="userData.first_name" type="text" placeholder="First name"/>
      <MainInput v-model="userData.last_name" type="text" placeholder="Last name"/>
      <VueTelInput
          class="border-2 border-[#1D1F2E] py-2 rounded-md"
          v-model="userData.phone"
          mode="international"
          :autoDefaultCountry="true"
          :required="true"
          :validCharactersOnly="true"/>
      <MainInput v-model="userData.email" type="email" placeholder="Email"/>
    </div>
    </div>
    <section class="my-10">
    <h1 class="text-xl font-bold">Select Address</h1>
  <CheckoutAddresses
      :selected-index="selectedIndex"
      :user-addresses="userAddresses"
      v-if="userAddresses.length > 0"
      @selectAddress="selectAddress"/>
      <div v-else>
       <MainButton @click="$router.push('/profile/address')" color="blue">Add address</MainButton>
      </div>
    </section>
      <CardDetailsForm/>
  </section>
    <section class="w-1/2 bg-white p-6 rounded-md h-min">
     <CheckoutItemList/>
      <h1 class="text-xl font-bold text-right">Total: ${{totalPrice.toFixed(2)}}</h1>
      <MainButton @click="checkout" class="mt-4" size="expand" color="blue">Checkout</MainButton>
    </section>
    </div>
  </section>
  <MessagePopup v-if="checkedOut"/>
  <MessageAlert :message="alertMessage" v-if="alertMessage"/>
</template>

<script setup lang="ts">
import MainInput from "~/components/UI/MainInput.vue";
import {VueTelInput} from "vue-tel-input";
import {useCartStore} from "~/stores/cart";

definePageMeta({
  layout: "empty"
})

useHead({
  title: "Cart | Checkout",
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/vue-tel-input/dist/vue-tel-input.css'
    }
  ]
})

const cartStore = useCartStore()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const userAddresses = ref<AddressType[] | undefined>([])

const userData = ref<UserType | null>()

const checkedOut = ref<boolean>(false)

const alertMessage = ref<string>()

const getUser = async () => {
  let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.value!.id)
      .single()

  userData.value = users
}

const getUserAddresses = async () => {


  let { data: addresses, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.value!.id)

  userAddresses.value = addresses

}

const selectedAddress = ref<AddressType>()

const selectedIndex = ref<number>()

const selectAddress = (userAddress: AddressType | undefined, index:number):void => {
  selectedAddress.value = userAddress
  selectedIndex.value = index
}

const totalPrice = computed((): number => {
  let total = 0;
  for (let cartItem in cartStore.cartProducts) {
    let item = cartStore.cartProducts[cartItem];
    total += (item.price - item.price * (item.discount / 100)) * item.quantity
  }
  return total
})

const checkout = async () => {

  try {
    alertMessage.value = ""
    if (selectedAddress.value){
      const { data, error } = await supabase
          .from('orders')
          .insert([
            {
              status: "Pending",
              total: totalPrice.value,
              user_id: user.value.id,
              products: cartStore.cartProducts,
              address: selectedAddress.value
            },
          ])
          .select()

      checkedOut.value = true
      cartStore.cartProducts = []
    }else {
      alertMessage.value = "Select address"
    }
  }catch (error) {
    console.error(error)
  }

}

onMounted(() => {
  getUser()
  getUserAddresses()
})
import CardDetailsForm from "~/components/CardDetailsForm.vue";
import CheckoutItemList from "~/components/CheckoutItemList.vue";
import MainButton from "~/components/UI/MainButton.vue";
import CheckoutAddresses from "~/components/CheckoutAddresses.vue";
import MessagePopup from "~/components/UI/MessagePopup.vue";
import MessageAlert from "~/components/UI/MessageAlert.vue";
</script>
