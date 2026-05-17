<template>
  <div class="space-y-6">
    <div
      v-if="successMessage"
      class="bg-green-100 text-green-700 p-4 rounded-lg"
    >
      {{ successMessage }}
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-xl font-semibold mb-4">Submit Vacation Request</h3>

      <p class="text-gray-500 mb-6">Submit and track your vacation requests</p>

      <form @submit.prevent="submitVacation" class="space-y-4">
        <div>
          <label class="block mb-2 font-medium"> Start Date </label>

          <input
            v-model="form.start_date"
            type="date"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block mb-2 font-medium"> End Date </label>

          <input
            v-model="form.end_date"
            type="date"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block mb-2 font-medium"> Reason </label>

          <textarea
            v-model="form.reason"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <button
          :disabled="loading"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm disabled:bg-blue-300"
        >
          {{ loading ? "Submitting..." : "Submit Request" }}
        </button>
      </form>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">My Vacation Requests</h3>

        <span class="text-sm text-gray-500">
          {{ vacations.length }} requests
        </span>
      </div>

      <div
        v-if="vacations.length === 0"
        class="text-center text-gray-500 py-10"
      >
        No vacation requests yet.
      </div>

      <div
        v-for="vacation in vacations"
        :key="vacation.id"
        class="border rounded-xl p-5 mb-4 hover:shadow-md transition"
      >
        <div class="flex flex-col md:flex-row md:justify-between gap-4">
          <div class="space-y-2">
            <p>
              <strong>Start:</strong>
              {{ vacation.start_date }}
            </p>

            <p>
              <strong>End:</strong>
              {{ vacation.end_date }}
            </p>

            <p>
              <strong>Reason:</strong>
              {{ vacation.reason || "No reason provided" }}
            </p>

            <p v-if="vacation.comments" class="text-red-500">
              <strong>Comment:</strong>
              {{ vacation.comments }}
            </p>
          </div>

          <div>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="getStatusClass(vacation.status)"
            >
              {{ vacation.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import api from "../services/api";

const vacations = ref<any[]>([]);

const loading = ref(false);

const successMessage = ref("");

const form = ref({
  start_date: "",
  end_date: "",
  reason: "",
});

const fetchVacations = async () => {
  try {
    const response = await api.get("/vacations/user/1");

    vacations.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const submitVacation = async () => {
  try {
    loading.value = true;

    successMessage.value = "";

    await api.post("/vacations", {
      user_id: 1,
      ...form.value,
    });

    successMessage.value = "Vacation request submitted successfully";

    form.value = {
      start_date: "",
      end_date: "",
      reason: "",
    };

    fetchVacations();

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const getStatusClass = (status: string) => {
  if (status === "Approved") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-700";
  }

  return "bg-yellow-100 text-yellow-700";
};

onMounted(() => {
  fetchVacations();
});
</script>
