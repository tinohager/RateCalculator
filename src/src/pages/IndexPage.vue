<script setup lang="ts">
import { ref, computed } from 'vue'

const grossSalary = ref<number>(3000)
const employess = ref(2)
const employeeProductivity = ref(75)

const total = computed(() => {
  const grossAnnualSalary = grossSalary.value * 14

  const totalCostsOfTheCompanyPerEmployee = grossAnnualSalary * 1.2959 // 29,59%

  return totalCostsOfTheCompanyPerEmployee * employess.value
})

const availableHoursPerEmployee = computed(() => {
  const daysPerWeek = 5
  const weeksPerYear = 52
  const workingDaysPerYear = daysPerWeek * weeksPerYear
  const publicHolidaysPerYear = 10
  const holidaysPerYear = 25
  const sickDays = 5
  const workingHoursPerDay = 8

  const availableDays = workingDaysPerYear - publicHolidaysPerYear - holidaysPerYear - sickDays
  const availableWorkingHours = availableDays * workingHoursPerDay

  return (availableWorkingHours / 100) * employeeProductivity.value
})
</script>

<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section>
        <q-input
          v-model="grossSalary"
          label="Brutto-Durchschnittsgehalt bei 14 Gehälter"
          class="q-mb-md"
        />
        Anzahl Mitarbeiter
        <q-slider
          v-model="employess"
          :min="1"
          :max="500"
          label-always
          :label-value="employess + ' Mitarbeiter'"
        />

        Produkivität ({{ availableHoursPerEmployee.toFixed(0) }} Stunden pro Jahr)
        <q-slider
          v-model="employeeProductivity"
          :min="1"
          :max="100"
          label-always
          :label-value="employeeProductivity + ' %'"
        />
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        Jährliche Kosten für das Unternehmen
        <h1>{{ total.toFixed(0) }}€</h1>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        Benötigter Stundenlohn
        <h1>{{ (total / (availableHoursPerEmployee * employess)).toFixed(2) }}€</h1>
      </q-card-section>
    </q-card>
  </q-page>
</template>
