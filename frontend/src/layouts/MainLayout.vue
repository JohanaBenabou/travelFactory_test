<template>
  <div class="flex min-h-screen bg-gray-100">

    <aside
      class="w-64 bg-slate-900 text-white p-6 flex flex-col"
    >

      <div class="mb-10">

        <h1 class="text-3xl font-bold">
          Vacation App
        </h1>

        <p class="text-slate-400 mt-2 text-sm">
          Employee Management
        </p>

      </div>

      <nav class="space-y-3">

        <router-link
          to="/"
          class="block p-3 rounded-lg transition hover:bg-slate-800"
          active-class="bg-blue-600"
        >
          Requester
        </router-link>

        <router-link
          to="/validator"
          class="block p-3 rounded-lg transition hover:bg-slate-800"
          active-class="bg-blue-600"
        >
          Validator
        </router-link>

      </nav>

      <div
        class="mt-auto pt-10 text-sm text-slate-400"
      >
        Travel Factory Technical Test
      </div>

    </aside>

    <main class="flex-1 p-6">

      <div
        class="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center"
      >

        <div>

          <h2 class="text-2xl font-semibold">
            Vacation Management Dashboard
          </h2>

          <p class="text-gray-500 text-sm mt-1">
            Manage employee vacation requests
          </p>

        </div>

        <div class="flex items-center gap-3">

          <div
            class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
          >
            J
          </div>

          <div>

            <p class="font-semibold">
              Johana
            </p>

            <p class="text-sm text-gray-500">
              Employee
            </p>

          </div>

        </div>

      </div>

      <router-view />

    </main>

  </div>
</template>