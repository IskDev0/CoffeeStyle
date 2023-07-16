<template>
  <div v-if="!isLoading" class="container mx-auto flex flex-col gap-4">
    <div class="mb-10 relative">
      <button class="py-2 px-4 w-full text-start bg-gray-100" @click="toggleDropdown('country')">
        {{ addAddressForm.selectedCountry ? addAddressForm.selectedCountry.name : "Select country" }}
      </button>
      <ul v-if="toggleCountry" class="flex flex-col absolute bg-gray-100 top-10 h-64 overflow-y-scroll">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectCountry(country)"
            v-for="country in countries"
            :key="country.id"
        >{{ country.name }}
        </li>
      </ul>
    </div>

    <div v-if="hasStates" class="bg-gray-100 mb-10">
      <button class="py-2 px-4 w-full text-start" @click="toggleDropdown('state')">
        {{ addAddressForm.selectedState ? addAddressForm.selectedState.name : "Select state" }}
      </button>
      <ul v-if="toggleState" class="flex flex-col">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectState(state)"
            v-for="state in states"
            :key="state.id"
        >{{ state.name }}
        </li>
      </ul>
    </div>

    <div v-if="hasCities" class="bg-gray-100 mb-10">
      <button class="py-2 px-4 w-full text-start" @click="toggleDropdown('city')">
        {{addAddressForm.selectedCity ? addAddressForm.selectedCity.name : "Select city"  }}
      </button>
      <ul v-if="toggleCity" class="flex flex-col">
        <li
            class="cursor-pointer py-2 px-4 hover:bg-gray-200"
            @click="selectCity(city)"
            v-for="city in cities"
            :key="city.id"
        >{{ city.name }}
        </li>
      </ul>
    </div>

    <div class="mb-10">
      <input v-model="addAddressForm.street" class="bg-gray-100 py-2 px-4 w-full mb-2" type="text" placeholder="Street">
      <span class="text-red-500" v-for="error in $v.street.$errors" :key="error.$uid">{{ error.$message }}</span>
    </div>
    <div class="mb-10">
      <input v-model="addAddressForm.postal_code" class="bg-gray-100 py-2 px-4 w-full mb-2" type="text" placeholder="Zip-code">
      <span class="text-red-500" v-for="error in $v.postal_code.$errors" :key="error.$uid">{{ error.$message }}</span>
    </div>
    <MainButton @click="addUserAddress" color="blue">Save</MainButton>
  </div>
  <div v-else class="h-full flex flex-col justify-center items-center">
    <TheLoader/>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import MainButton from "~/components/UI/MainButton";
import TheLoader from "~/components/UI/TheLoader";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index";

const headers = new Headers();
headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_STATE_CITY_KEY);

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

const supabase = useSupabaseClient()

const user = useSupabaseUser()

const isLoading = ref<boolean>(false)

const toggleCountry = ref<boolean>(false)

const toggleState = ref<boolean>(false)

const toggleCity = ref<boolean>(false)

const addAddressForm = ref<AddressFormType>({
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  street: "",
  postal_code: ""
})

const countries = ref<CountryStateCityType[]>([])

const states = ref<CountryStateCityType[]>([])

const cities = ref<CountryStateCityType[]>([])

const loadCountries = async (): Promise<void> => {
  const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  countries.value = await response.json()
}

const loadStates = async ():Promise<void> => {
  const response = await fetch(`https://api.countrystatecity.in/v1/countries/${addAddressForm.value.selectedCountry.iso2}/states`, requestOptions)
  states.value = await response.json()
}

const loadCities = async () => {
  const response = await fetch(`https://api.countrystatecity.in/v1/countries/${addAddressForm.value.selectedCountry.iso2}/states/${addAddressForm.value.selectedState.iso2}/cities`, requestOptions)
  cities.value = await response.json()
}

const selectCountry = (country: string):void => {
  states.value = []
  cities.value = []
  addAddressForm.value.selectedState = ""
  addAddressForm.value.selectedCity = ""
  toggleCountry.value = false
  addAddressForm.value.selectedCountry = country
  loadStates()
}

const selectState = (state: string):void => {
  cities.value = []
  addAddressForm.value.selectedCity = ""
  addAddressForm.value.selectedState = state
  toggleState.value = false
  loadCities()
}

const selectCity = (city: string):void => {
  addAddressForm.value.selectedCity = city
  toggleCity.value = false
}

const toggleDropdown = (type: string):void => {
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


const loadUserAddress = async (): Promise<void> => {

  try {
    isLoading.value = true
    let {data: users, error} = await supabase
        .from('users')
        .select('*')
        .filter('id', 'eq', user.value.id)
        .single()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }

}

const emit = defineEmits(['open'])

const handleOpen = (value: boolean):void => {
  emit('open', value)
}

const addUserAddress = async (): Promise<void> => {

  const result = await $v.value.$validate()
  if (!result) return

  try {
    handleOpen(true)
    const {data, error} = await supabase
        .from('addresses')
        .insert([
          {
            country: addAddressForm.value.selectedCountry.name,
            state: addAddressForm.value.selectedState.name,
            city: addAddressForm.value.selectedCity.name,
            street: addAddressForm.value.street,
            postal_code: addAddressForm.value.postal_code,
            user_id: user.value.id
          },
        ])
        .select()

    addAddressForm.value = {}
  } catch (e) {

  } finally {
    handleOpen(false)
  }

}

onMounted(() => {
  loadCountries()
  loadUserAddress()
})


const rules = computed(() => {
  return {
    street: {required},
    postal_code: {required}
  }
})

const $v = useVuelidate(rules, addAddressForm)


</script>