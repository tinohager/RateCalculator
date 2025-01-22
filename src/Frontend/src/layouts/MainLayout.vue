<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const navigationItems = [
  {
    name: 'Home',
    icon: 'home',
    link: '/',
  },
  {
    name: 'Stundenlohn Rechner für Mitarbeiter',
    icon: 'person',
    link: '/hourly-wage-calculator/employee',
  },
  {
    name: 'Stundenlohn Rechner für EPU',
    icon: 'apartment',
    link: '/hourly-wage-calculator/one-person-business',
  },
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          stretch
          flat
          icon="menu"
          aria-label="Menu"
          role="menuitem"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Stundenlohn Rechner</q-toolbar-title>
        <q-space />
        <q-btn stretch label="GitHub" href="https://github.com/tinohager/RateCalculator" />
      </q-toolbar>
    </q-header>

    <q-dialog v-model="leftDrawerOpen" square maximized seamless position="left" auto-close>
      <q-card class="bg-primary">
        <q-card-section class="text-right">
          <q-btn v-close-popup text-color="white" size="xl" flat>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="42"
              viewBox="0 -960 960 960"
              width="42"
              fill="white"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </q-btn>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-list class="main-menu text-center">
            <q-item
              v-for="navigationItem in navigationItems"
              :key="navigationItem.link"
              :to="navigationItem.link"
              class="text-white"
              exact
              active-class="bg-black text-white"
              role="none"
            >
              <q-item-section avatar>
                <q-avatar :icon="navigationItem.icon" />
              </q-item-section>
              <q-item-section class="menu-item text-uppercase text-left q-pr-md p-ml-xl">
                {{ navigationItem.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
