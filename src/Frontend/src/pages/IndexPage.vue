<script setup lang="ts">
import { ref, computed } from 'vue'

const grossSalary = ref<number>(3000)
const employess = ref(1)
const averageSickDays = ref(5)
const holidaysPerYear = ref(25)
const employeeProductivity = ref(75)
const monthlyFixedCosts = ref(1000)
const workingHoursPerDay = ref(8)

const annualWageCosts = computed(() => {
  const grossAnnualSalary = grossSalary.value * 14

  const totalCostsOfTheCompanyPerEmployee = grossAnnualSalary * 1.2959 // 29,59%

  return totalCostsOfTheCompanyPerEmployee * employess.value
})

const requiredHourlyWage = computed(() => {
  const annualFixedCosts = monthlyFixedCosts.value * 12
  const temp =
    (annualWageCosts.value + annualFixedCosts) /
    (availableAnnualHoursPerEmployee.value * employess.value)
  return temp.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})

const availableAnnualHoursPerEmployee = computed(() => {
  const daysPerWeek = 5
  const weeksPerYear = 52
  const workingDaysPerYear = daysPerWeek * weeksPerYear
  const publicHolidaysPerYear = 10

  const availableDays =
    workingDaysPerYear - publicHolidaysPerYear - holidaysPerYear.value - averageSickDays.value
  const availableWorkingHours = availableDays * workingHoursPerDay.value

  return (availableWorkingHours / 100) * employeeProductivity.value
})

function formatCurrency(value: number) {
  const formatted = value
    .toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    .replace(/,/g, ' ')
  return formatted
}
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6">
        <q-card flat bordered>
          <q-card-section>
            Benötigter Stundenlohn
            <h1>{{ requiredHourlyWage }}€</h1>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered>
          <q-card-section>
            Jährliche Lohnkosten
            <h1>{{ formatCurrency(annualWageCosts) }}€</h1>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Einstellungen für die Berechnung</div>
      </q-card-section>
      <q-card-section>
        Monatlicher Bruttogehalt
        <q-slider
          v-model="grossSalary"
          :min="2000"
          :max="10000"
          :step="100"
          :marker-labels="[
            { value: 2000, label: '2000' },
            { value: 3000, label: '3000' },
            { value: 4000, label: '4000' },
            { value: 5000, label: '5000' },
            { value: 6000, label: '6000' },
            { value: 10000, label: '10000' },
          ]"
          snap
          switch-label-side
          label-always
          :label-value="`${grossSalary} €`"
          class="q-mb-md"
        />

        Anzahl Mitarbeiter
        <q-slider
          v-model="employess"
          :min="1"
          :max="500"
          :marker-labels="[
            { value: 1, label: '1' },
            { value: 10, label: '10' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: 200, label: '200' },
            { value: 500, label: '500' },
          ]"
          snap
          switch-label-side
          label-always
          :label-value="`${employess} Mitarbeiter`"
          class="q-mb-md"
        />

        Monatliche Fixkosten
        <q-slider
          v-model="monthlyFixedCosts"
          :min="500"
          :max="5000"
          :step="100"
          snap
          switch-label-side
          label-always
          :label-value="`${monthlyFixedCosts} €`"
          class="q-mb-md"
        />

        Krankheitstage pro Jahr
        <q-slider
          v-model="averageSickDays"
          :min="1"
          :max="20"
          markers
          :marker-labels="[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 20, label: '20' },
          ]"
          switch-label-side
          label-always
          :label-value="`${averageSickDays} Krankheitstage`"
          class="q-mb-md"
        />

        Urlaubstage pro Jahr
        <q-slider
          v-model="holidaysPerYear"
          :min="25"
          :max="30"
          markers
          :marker-labels="[
            { value: 25, label: '25' },
            { value: 30, label: '30' },
          ]"
          switch-label-side
          label-always
          :label-value="`${holidaysPerYear} Urlaubstage`"
          class="q-mb-md"
        />

        Produkivität ({{ ((workingHoursPerDay * employeeProductivity) / 100).toFixed(1) }} Stunden
        pro Tag | {{ availableAnnualHoursPerEmployee.toFixed(0) }} Stunden pro Jahr)
        <q-slider
          v-model="employeeProductivity"
          :min="5"
          :max="100"
          :step="5"
          switch-label-side
          label-always
          :label-value="employeeProductivity + ' %'"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>
