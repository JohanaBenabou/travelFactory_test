<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white rounded-2xl shadow-sm w-full max-w-lg p-8">
      <div class="text-center mb-8">
        <div
          class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-2xl"
        >
          ✈️
        </div>

        <h1 class="text-3xl font-bold">Vacation Manager</h1>

        <p class="text-gray-500 mt-2">
          Sign in to submit or review vacation requests
        </p>
      </div>

      <div class="bg-gray-100 rounded-xl p-1 flex mb-8">
        <button
          @click="isSignup = false"
          class="flex-1 py-3 rounded-xl font-semibold transition"
          :class="!isSignup ? 'bg-white shadow-sm' : 'text-gray-500'"
        >
          Sign in
        </button>

        <button
          @click="isSignup = true"
          class="flex-1 py-3 rounded-xl font-semibold transition"
          :class="isSignup ? 'bg-white shadow-sm' : 'text-gray-500'"
        >
          Sign up
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div v-if="isSignup">
          <label class="block mb-2 font-medium"> Full name </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded-xl p-4"
          />
        </div>

        <div>
          <label class="block mb-2 font-medium"> Email </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full border rounded-xl p-4"
          />
        </div>

        <div>
          <label class="block mb-2 font-medium"> Password </label>

          <input
            v-model="form.password"
            type="password"
            class="w-full border rounded-xl p-4"
          />
        </div>

        <div v-if="isSignup">
          <label class="block mb-2 font-medium"> Role </label>

          <div class="flex gap-6">
            <label class="flex items-center gap-2">
              <input v-model="form.role" type="radio" value="Requester" />

              Requester
            </label>

            <label class="flex items-center gap-2">
              <input v-model="form.role" type="radio" value="Validator" />

              Validator
            </label>
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-100 text-red-600 p-3 rounded-xl">
          {{ errorMessage }}
        </div>

        <button
          :disabled="loading"
          class="w-full bg-slate-900 text-white py-4 rounded-xl"
        >
          {{ loading ? "Loading..." : isSignup ? "Create account" : "Sign in" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const isSignup = ref(false);

const loading = ref(false);

const errorMessage = ref("");

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "Requester",
});

const handleSubmit = async () => {
  try {
    loading.value = true;

    errorMessage.value = "";

    let response;

    if (isSignup.value) {
      response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",

        headers: {
          Accept: "application/json",
        },

        body: new URLSearchParams({
          name: form.value.name,

          email: form.value.email,

          password: form.value.password,

          role: form.value.role,
        }),
      });
    } else {
      response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",

        headers: {
          Accept: "application/json",
        },

        body: new URLSearchParams({
          email: form.value.email,

          password: form.value.password,
        }),
      });
    }

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      errorMessage.value = data.message || "Authentication failed";

      return;
    }

    if (isSignup.value) {
      isSignup.value = false;

      errorMessage.value = "Account created successfully. Please sign in.";

      form.value = {
        name: "",
        email: "",
        password: "",
        role: "Requester",
      };

      return;
    }

localStorage.setItem(
  "user",
  JSON.stringify(
    data
  )
);

redirectUser(data);
  } catch (error) {
    console.log(error);

    errorMessage.value = "Server error";
  } finally {
    loading.value = false;
  }
};

const redirectUser = (user: any) => {
  if (user.role === "Validator") {
    router.push("/validator");
  } else {
    router.push("/");
  }
};
</script>
