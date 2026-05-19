<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
    <aside
      class="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col"
    >
      <div class="mb-10">
        <h1 class="text-3xl font-bold">Vacation App</h1>

        <p class="text-slate-400 mt-2 text-sm">Employee Management</p>
      </div>

      <nav class="space-y-3">
        <router-link
          v-if="user.role === 'Requester'"
          to="/"
          class="block p-3 rounded-lg transition hover:bg-slate-800"
          active-class="bg-blue-600"
        >
          Requester
        </router-link>

        <router-link
          v-if="user.role === 'Validator'"
          to="/validator"
          class="block p-3 rounded-lg transition hover:bg-slate-800"
          active-class="bg-blue-600"
        >
          Validator
        </router-link>
      </nav>

      <div class="mt-auto">
        <button
          @click="logout"
          class="w-full bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-lg"
        >
          Logout
        </button>

        <div class="pt-6 text-sm text-slate-400">
          Travel Factory Technical Test
        </div>
      </div>
    </aside>

    <main class="flex-1 p-6">
      <div
        class="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center"
      >
        <div>
          <h2 class="text-2xl font-semibold">Vacation Management Dashboard</h2>

          <p class="text-gray-500 text-sm mt-1">
            Manage employee vacation requests
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
          >
            {{ user.name ? user.name.charAt(0) : "U" }}
          </div>

          <div>
            <p class="font-semibold">
              {{ user.name }}
            </p>

            <p class="text-sm text-gray-500">
              {{ user.role }}
            </p>
          </div>
        </div>
      </div>

      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
const storedUser = localStorage.getItem("user");

const user =
  storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : {
        name: "",
        role: "",
      };

const logout = () => {
  localStorage.removeItem("user");

  window.location.href = "/auth";
};
</script>
