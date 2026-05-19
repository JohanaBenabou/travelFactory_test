<template>
  <div class="space-y-6">

    <div
      class="bg-white rounded-2xl shadow-sm p-6"
    >

      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6"
      >

        <div>

          <h2
            class="text-2xl font-bold"
          >
            Validator Dashboard
          </h2>

          <p
            class="text-gray-500 mt-1"
          >
            Review and manage vacation requests
          </p>

        </div>

        <div class="flex gap-3">

          <select
            v-model="selectedStatus"
            class="border rounded-xl px-4 py-2"
          >
            <option value="All">
              All
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

          <div
            class="bg-slate-900 text-white px-4 py-2 rounded-xl"
          >
            {{ filteredVacations.length }}
            requests
          </div>

        </div>

      </div>

      <div
        v-if="filteredVacations.length === 0"
        class="text-center text-gray-500 py-10"
      >
        No vacation requests found.
      </div>

      <div
        v-for="vacation in filteredVacations"
        :key="vacation.id"
        class="border rounded-2xl p-5 mb-5 hover:shadow-md transition"
      >

        <div
          class="flex flex-col lg:flex-row lg:justify-between gap-6"
        >

          <div class="space-y-3">

            <p>
              <strong>User:</strong>
              {{ vacation.user.name }}
            </p>

            <p>
              <strong>Period:</strong>
              {{ vacation.start_date }}
              →
              {{ vacation.end_date }}
            </p>

            <p>
              <strong>Reason:</strong>
              {{ vacation.reason || "—" }}
            </p>

            <div class="flex items-center gap-3">

              <strong>Status:</strong>

              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="
                  getStatusClass(
                    vacation.status
                  )
                "
              >
                {{ vacation.status }}
              </span>

            </div>

            <p
              v-if="vacation.comments"
            >
              <strong>Comments:</strong>
              {{ vacation.comments }}
            </p>

          </div>

          <div
            class="lg:w-80"
          >

            <div
              v-if="
                vacation.status ===
                'Pending'
              "
            >

              <textarea
                v-model="comment"
                placeholder="Add comment..."
                class="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />

              <div
                class="flex gap-3"
              >

                <button
                  @click="
                    updateStatus(
                      vacation.id,
                      'Approved'
                    )
                  "
                  class="flex-1 bg-slate-900 hover:bg-slate-800 transition text-white py-3 rounded-xl shadow-sm"
                >
                  Approve
                </button>

                <button
                  @click="
                    updateStatus(
                      vacation.id,
                      'Rejected'
                    )
                  "
                  class="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl shadow-sm"
                >
                  Reject
                </button>

              </div>

            </div>

            <div
              v-else
              class="bg-gray-100 rounded-xl p-4 text-center"
            >

              <span
                class="text-green-600 font-medium"
              >
                Decision submitted
              </span>

            </div>

          </div>

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

const comment = ref("");

const selectedStatus =
  ref("All");

const filteredVacations =
  computed(() => {

    if (
      selectedStatus.value ===
      "All"
    ) {

      return vacations.value;
    }

    return vacations.value.filter(
      (vacation) =>
        vacation.status ===
        selectedStatus.value
    );
  });

const fetchVacations =
  async () => {

    try {

      const response =
        await api.get(
          "/vacations"
        );

      vacations.value =
        response.data;

    } catch (error) {

      console.log(error);
    }
  };

const updateStatus =
  async (
    id: number,
    status: string
  ) => {

    try {

      if (
        status === "Rejected" &&
        !comment.value
      ) {

        alert(
          "Comment is required when rejecting"
        );

        return;
      }

      await api.patch(
        `/vacations/${id}`,
        {
          status,
          comments:
            comment.value,
        }
      );

      comment.value = "";

      await fetchVacations();

    } catch (error) {

      console.log(error);
    }
  };

const getStatusClass = (
  status: string
) => {

  if (
    status === "Approved"
  ) {

    return "bg-green-100 text-green-700";
  }

  if (
    status === "Rejected"
  ) {

    return "bg-red-100 text-red-700";
  }

  return "bg-yellow-100 text-yellow-700";
};

onMounted(() => {

  fetchVacations();
});
</script>