<template>
  <div class="space-y-6">

    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >

      <div
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <p class="text-gray-500 mb-2">
          Total Requests
        </p>

        <h3 class="text-3xl font-bold">
          {{ vacations.length }}
        </h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <p class="text-gray-500 mb-2">
          Approved
        </p>

        <h3
          class="text-3xl font-bold text-green-600"
        >
          {{ approvedCount }}
        </h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <p class="text-gray-500 mb-2">
          Pending
        </p>

        <h3
          class="text-3xl font-bold text-yellow-500"
        >
          {{ pendingCount }}
        </h3>
      </div>

    </div>

    <div
      class="bg-white rounded-xl shadow-sm p-6"
    >

      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
      >

        <div>
          <h3 class="text-2xl font-semibold">
            Vacation Requests
          </h3>

          <p class="text-gray-500 mt-1">
            Review and manage employee vacations
          </p>
        </div>

        <select
          v-model="selectedStatus"
          class="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            All Statuses
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

      </div>

      <div
        v-if="loading"
        class="text-center py-10 text-gray-500"
      >
        Loading vacation requests...
      </div>

      <div
        v-else-if="filteredVacations.length === 0"
        class="text-center text-gray-500 py-10"
      >
        No vacation requests found.
      </div>

      <div
        v-else
        class="overflow-x-auto"
      >

        <table class="min-w-full">

          <thead>

            <tr
              class="border-b text-left text-gray-500"
            >
              <th class="p-4 font-medium">
                Employee
              </th>

              <th class="p-4 font-medium">
                Start
              </th>

              <th class="p-4 font-medium">
                End
              </th>

              <th class="p-4 font-medium">
                Reason
              </th>

              <th class="p-4 font-medium">
                Status
              </th>

              <th class="p-4 font-medium">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="vacation in filteredVacations"
              :key="vacation.id"
              class="border-b hover:bg-gray-50 transition"
            >

              <td class="p-4 font-medium">
                {{ vacation.user.name }}
              </td>

              <td class="p-4">
                {{ vacation.start_date }}
              </td>

              <td class="p-4">
                {{ vacation.end_date }}
              </td>

              <td class="p-4">
                {{ vacation.reason || "No reason provided" }}
              </td>

              <td class="p-4">

                <span
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusClass(vacation.status)"
                >
                  {{ vacation.status }}
                </span>

              </td>

              <td class="p-4">

                <div
                  v-if="vacation.status === 'Pending'"
                  class="flex gap-2"
                >

                  <button
                    @click="approveVacation(vacation.id)"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
                  >
                    Approve
                  </button>

                  <button
                    @click="openRejectModal(vacation.id)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
                  >
                    Reject
                  </button>

                </div>

                <div
                  v-else
                  class="text-gray-400 text-sm"
                >
                  No actions available
                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    <div
      v-if="showRejectModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >

      <div
        class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
      >

        <h3 class="text-xl font-semibold mb-2">
          Reject Vacation Request
        </h3>

        <p class="text-gray-500 mb-4">
          Please provide a reason for rejecting this request.
        </p>

        <textarea
          v-model="rejectComment"
          placeholder="Enter rejection reason..."
          class="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          rows="4"
        />

        <div
          v-if="rejectError"
          class="text-red-500 text-sm mb-4"
        >
          {{ rejectError }}
        </div>

        <div class="flex justify-end gap-3">

          <button
            @click="closeRejectModal"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            @click="rejectVacation"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Reject Request
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
} from "vue";

import api from "../services/api";

const vacations = ref<any[]>([]);

const selectedStatus = ref("");

const loading = ref(false);

const showRejectModal = ref(false);

const selectedVacationId = ref<number | null>(
  null
);

const rejectComment = ref("");

const rejectError = ref("");

const fetchVacations = async () => {
  try {
    loading.value = true;

    const response = await api.get(
      "/vacations"
    );

    vacations.value = response.data;

  } catch (error) {
    console.log(error);

  } finally {
    loading.value = false;
  }
};

const approveVacation = async (
  id: number
) => {
  try {
    await api.patch(
      `/vacations/${id}`,
      {
        status: "Approved",
      }
    );

    fetchVacations();

  } catch (error) {
    console.log(error);
  }
};

const openRejectModal = (
  id: number
) => {
  selectedVacationId.value = id;

  showRejectModal.value = true;
};

const closeRejectModal = () => {
  showRejectModal.value = false;

  rejectComment.value = "";

  rejectError.value = "";

  selectedVacationId.value = null;
};

const rejectVacation = async () => {
  try {
    rejectError.value = "";

    if (!rejectComment.value.trim()) {
      rejectError.value =
        "Rejection comment is required";

      return;
    }

    await api.patch(
      `/vacations/${selectedVacationId.value}`,
      {
        status: "Rejected",
        comments: rejectComment.value,
      }
    );

    closeRejectModal();

    fetchVacations();

  } catch (error) {
    console.log(error);
  }
};

const filteredVacations = computed(() => {
  if (!selectedStatus.value) {
    return vacations.value;
  }

  return vacations.value.filter(
    (vacation) =>
      vacation.status ===
      selectedStatus.value
  );
});

const approvedCount = computed(() => {
  return vacations.value.filter(
    (vacation) =>
      vacation.status === "Approved"
  ).length;
});

const pendingCount = computed(() => {
  return vacations.value.filter(
    (vacation) =>
      vacation.status === "Pending"
  ).length;
});

const getStatusClass = (
  status: string
) => {
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