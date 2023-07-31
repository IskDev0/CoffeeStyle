<template>
  <section>
    <div class="mx-auto w-full">
      <form class="flex flex-col gap-4 items-stretch" @submit.prevent="submitForm">
        <div class="mb-5">
          <label
              for="name"
              class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Cardholder Name
          </label>
          <input
              v-maska:[options]
              data-maska="A A"
              data-maska-tokens="A:[A-Z]:multiple"
              v-model="cardDetails.name"
              type="text"
              id="name"
              autocomplete="true"
              placeholder="Cardholder Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <span
              class=" text-red-600 dark:text-red-500"
              v-for="error in v$.name.$errors"
              :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="mb-5">
          <label
              for="Card Number"
              class="mb-3 block text-base font-medium text-[#07074D]"
          >
            Card Number
          </label>
          <input
              v-maska
              data-maska="#### #### #### ####"
              v-model="cardDetails.cardNumber"
              type="text"
              id="Card Number"
              autocomplete="true"
              placeholder="e.g 1234 5678 9009 8765"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <span
              class=" text-red-600 dark:text-red-500"
              v-for="error in v$.cardNumber.$errors"
              :key="error.$uid">{{ error.$message }}</span>

        </div>
        <div class="flex justify-between rounded-md gap-8">
          <div class="w-1/2">
            <div @click="cardDetails.isMonthOpened = !cardDetails.isMonthOpened"
                 class="rounded-md border border-[#e0e0e0] py-3 px-6">
              {{cardDetails.selectedMonth }}
            </div>
            <div class="relative flex flex-col rounded-md border border-[#e0e0e0]" v-if="cardDetails.isMonthOpened">
              <div class="absolute top-0 left-0 bg-white w-full h-64 overflow-y-scroll">
                <div @click="optionsSelect(option)"
                     v-if="cardDetails.isMonthOpened"
                     class="cursor-pointer py-2 px-6 hover:bg-slate-200"
                     v-for="option in cardDetails.options"
                     :key="option">
                  {{ option }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div @click="cardDetails.isOpened = !cardDetails.isOpened"
                 class="rounded-md border border-[#e0e0e0] py-3 px-6">
              {{ cardDetails.selectedYear }}
            </div>
            <div
                class="relative rounded-md border border-[#e0e0e0]"
                v-if="cardDetails.isOpened">
              <div class="absolute top-0 left-0 flex flex-col bg-white w-full overflow-y-scroll">
                <div
                    @click="yearSelect(year)"
                    v-if="cardDetails.isOpened"
                    v-for="year in cardDetails.years"
                    :key=year
                    class="cursor-pointer py-2 px-6 hover:bg-slate-200">
                  {{ year }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label
              for="CVC"
              class="mb-3 block text-base font-medium text-[#07074D]">
            Card Number
          </label>
          <div class="flex justify-between items-center rounded-md border border-[#e0e0e0] px-6">
            <input
                v-maska data-maska="###"
                v-model="cardDetails.cvc"
                :type="passwordFieldType"
                type="number"
                name="CVC"
                id="CVC"
                placeholder="e.g 123"
                class="w-full bg-white py-3 text-base font-medium text-[#6B7280] outline-none"
            />
            <div class="cursor-pointer" @click="switchVisibility">
              <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#606060" d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
            </div>
          </div>
          <span
              class=" text-red-600 dark:text-red-500"
              v-for="error in v$.cvc.$errors"
              :key="error.$uid">{{ error.$message }}</span>
        </div>
        <button
            type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 mt-4 text-base font-semibold text-white outline-none">
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">

import {useVuelidate} from '@vuelidate/core'
import {maxLength, minLength, required} from '@vuelidate/validators'

const cardDetails = reactive({
  name: "",
  cardNumber: "",
  cvc: "",
  years: [],
  options: [
    1,2,3,4,5,6,7,8,9,10,11,12
  ],
  selectedMonth: 1,
  selectedYear: Number(String(new Date().getFullYear()).slice(-2)),
  isOpened: false,
  isMonthOpened: false,
})

const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(25)
    },
    cardNumber: {
      required,
      minLength: minLength(16),
      maxLength: maxLength(19)
    },
    cvc: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(3)
    }
  }
})

const v$ = useVuelidate(rules, cardDetails)

let passwordFieldType = ref<string>("password")

const switchVisibility = ():void => {
  if (cardDetails.cvc.length > 0) {
    passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
  }
}

const submitForm = async (): Promise<void> => {
  const result = await v$.value.$validate()
  if (!result) return
}


const optionsSelect = (option: number):void => {
  cardDetails.selectedMonth = option
  cardDetails.isMonthOpened = false
}
const yearSelect = (year: number):void => {
  cardDetails.selectedYear = year
  cardDetails.isOpened = false
}
const getYear = ():void => {
  let currentYear = String(new Date().getFullYear()).slice(-2)
  for (let i = Number(currentYear); i <= Number(currentYear) + 5; i++) {
    cardDetails.years.push(i)
  }
}

const options = {
  preProcess: (val: string) => val.toUpperCase()
}

onMounted(() => {
  getYear()
})
</script>

