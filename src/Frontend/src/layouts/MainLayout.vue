<script setup lang="ts"></script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Stundenlohn Rechner</q-toolbar-title>
        <q-space />
        <q-btn stretch label="GitHub" href="https://github.com/tinohager/RateCalculator" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
