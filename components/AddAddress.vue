<template>
  <div v-if="!isLoading" class="container mx-auto flex flex-col gap-4">
    <div class="mb-10 relative">
      <button class="py-2 px-4 w-full text-start bg-gray-100" @click="toggleDropdown('country')">{{selectedCountry.name ? selectedCountry.name : "Select country"}}</button>
      <ul v-if="toggleCountry" class="flex flex-col absolute bg-gray-100 top-10 h-64 overflow-y-scroll">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectCountry(country)"
            v-for="country in countries"
            :key="country.id"
        >{{country.name}}
        </li>
      </ul>
    </div>

    <div v-if="hasStates" class="bg-gray-100 mb-10">
      <button class="py-2 px-4 w-full text-start" @click="toggleDropdown('state')">{{selectedState.name ? selectedState.name : "Select state"}}</button>
      <ul v-if="toggleState" class="flex flex-col">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectState(state)"
            v-for="state in states"
            :key="state.id"
        >{{state.name}}
        </li>
      </ul>
    </div>

    <div v-if="hasCities" class="bg-gray-100 mb-10">
      <button class="py-2 px-4 w-full text-start" @click="toggleDropdown('city')">{{selectedCity.name ? selectedCity.name : "Select city"}}</button>
      <ul v-if="toggleCity" class="flex flex-col">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectCity(city)"
            v-for="city in cities"
            :key="city.id"
        >{{city.name}}
        </li>
      </ul>
    </div>

    <input v-model="street" class="bg-gray-100 py-2 px-4 mb-10" type="text" placeholder="Street">

    <input v-model="postal_code" class="bg-gray-100 py-2 px-4 mb-10" type="text" placeholder="Zip-code">

    <MainButton @click="addUserAddress" color="blue">Save</MainButton>
  </div>
  <div v-else class="h-full flex flex-col justify-center items-center">
  <TheLoader/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import MainButton from "~/components/UI/MainButton";
import LoadingPopup from "~/components/UI/LoadingPopup";
import TheLoader from "~/components/UI/TheLoader";

const headers = new Headers();
headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_STATE_CITY_KEY);

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const isLoading = ref(false)

const toggleCountry = ref(false)

const toggleState = ref(false)

const toggleCity = ref(false)

const selectedCountry = ref({})

const selectedState = ref({})

const street = ref()

const postal_code = ref()

const selectedCity = ref({})

const countries = ref([])

const states = ref([])

const cities = ref([])

const loadCountries = async () => {
  const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  countries.value = await response.json()
}

const loadStates = async () => {
  const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry.value.iso2}/states`, requestOptions)
  states.value = await response.json()
}

const loadCities = async () => {
  const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry.value.iso2}/states/${selectedState.value.iso2}/cities`, requestOptions)
  cities.value = await response.json()
}

const selectCountry = (country) => {
  states.value = []
  cities.value = []
  selectedState.value = ""
  selectedCity.value = ""
  toggleCountry.value = false
  selectedCountry.value = country
  loadStates()
}

const selectState = (state) => {
  cities.value = []
  selectedCity.value = []
  selectedState.value = state
  toggleState.value = false
  loadCities()
}

const selectCity = (city) => {
  selectedCity.value = city
  toggleCity.value = false
}

const toggleDropdown = (type) => {
  if (type === "country") {
    toggleCountry.value = !toggleCountry.value;
  } else if (type === "state") {
    toggleState.value = !toggleState.value;
  } else if (type === "city") {
    toggleCity.value = !toggleCity.value;
  }
};

const hasStates = computed(() => {
  return states.value.length > 0
})

const hasCities = computed(() => {
  return cities.value.length > 0
})


const loadUserAddress = async () => {

  try {
    isLoading.value = true
    let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .filter('id', 'eq', user.value.id)
        .single()
  }catch (e){
    console.log(e)
  }finally {
    isLoading.value = false
  }

}

const addUserAddress = async () => {

  const { data, error } = await supabase
      .from('addresses')
      .insert([
        {
          country: selectedCountry.value.name,
          state: selectedState.value.name,
          city: selectedCity.value.name,
          street: street.value,
          postal_code: postal_code.value,
          user_id: user.value.id
        },
      ])
      .select()

  selectedCountry.value = ""
  selectedState.value = ""
  selectedCity.value = ""
  street.value = ""
  postal_code.value = ""

}

onMounted(() => {
  loadCountries()
  loadUserAddress()
})



</script>