<template>
  <div class="grid grid-cols-5 justify-items-center gap-8 py-2 px-4 bg-gray-200 font-semibold">
    <span>Customer</span>
    <select class="bg-transparent" @change="sortByStatus" v-model="orderStatus">
      <option selected value="All">All</option>
      <option value="Complete">Complete</option>
      <option value="Pending">Pending</option>
      <option value="Canceled">Canceled</option>
    </select>
    <span>Products</span>
    <select class="bg-transparent" @change="sortByDate" v-model="newnessSelect">
      <option selected value="All">All</option>
      <option value="New">New</option>
      <option value="Old">Old</option>
    </select>
    <select class="bg-transparent" @change="sortByTotal" v-model="totalValue">
      <option selected value="All">All</option>
      <option value="Low">Low</option>
      <option value="High">High</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();

const orderStatus = ref<string>("All");
const newnessSelect = ref<string>("All");
const totalValue = ref<string>("All");

const sortByStatus = (): void => {
  if (orderStatus.value === "All") {
    adminStore.sortedAdminOrders = adminStore.adminOrders;
  } else {
    adminStore.sortedAdminOrders = adminStore.adminOrders.filter(
        (item) => item.status === orderStatus.value
    );
  }
};

const sortByDate = (): void => {
  if (newnessSelect.value === "New") {
    adminStore.sortedAdminOrders?.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  } else if (newnessSelect.value === "Old") {
    adminStore.sortedAdminOrders?.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else {
    adminStore.sortedAdminOrders = adminStore.sortedAdminOrders?.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }
};

const sortByTotal = (): void => {
  if (totalValue.value === "Low") {
    adminStore.sortedAdminOrders?.sort((a, b) => a.total - b.total);
  } else if (totalValue.value === "High") {
    adminStore.sortedAdminOrders?.sort((a, b) => b.total - a.total);
  } else {
    adminStore.sortedAdminOrders?.sort((a, b) => a.total - b.total);
  }
};
</script>
