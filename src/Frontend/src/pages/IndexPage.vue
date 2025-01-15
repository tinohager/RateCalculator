<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

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

const annualFixedCosts = computed(() => {
  const annualFixedCosts = monthlyFixedCosts.value * 12

  return annualFixedCosts
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

const markerLabelSalary = computed(() => {
  if ($q.screen.lt.sm) {
    return [
      { value: 2000, label: '2000€' },
      { value: 10000, label: '10000€' },
    ]
  }

  return [
    { value: 2000, label: '2000€' },
    { value: 3000, label: '3000€' },
    { value: 4000, label: '4000€' },
    { value: 5000, label: '5000€' },
    { value: 6000, label: '6000€' },
    { value: 10000, label: '10000€' },
  ]
})

const markerLabelEmployees = computed(() => {
  if ($q.screen.lt.sm) {
    return [
      { value: 1, label: '1' },
      { value: 500, label: '500' },
    ]
  }

  return [
    { value: 1, label: '1' },
    { value: 10, label: '10' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 500, label: '500' },
  ]
})

function formatCurrency(value: number) {
  const formatted = value
    .toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    .replace(/,/g, ' ')
  return formatted
}
</script>

<template>
  <q-page>
    <div style="position: sticky; top: 0; z-index: 2000" class="bg-white">
      <div class="row q-mb-md">
        <div class="col-12 col-md-12 col-lg-4 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Benötigter Stundenlohn
              <div class="text-h1">{{ requiredHourlyWage }}€</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Jährliche Lohnkosten
              <div class="text-h1">{{ formatCurrency(annualWageCosts) }}€</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Jährliche Fixkosten
              <div class="text-h1">{{ formatCurrency(annualFixedCosts) }}€</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="q-pa-sm">
      <q-card flat bordered class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Einstellungen für die Berechnung</div>
        </q-card-section>
        <q-card-section>
          Monatlicher Bruttogehalt
          <q-badge color="grey-7" class="q-pa-sm">{{ grossSalary }}€</q-badge>
          <q-slider
            v-model="grossSalary"
            :min="2000"
            :max="10000"
            :step="100"
            thumb-size="40px"
            :marker-labels="markerLabelSalary"
            snap
            switch-label-side
            class="q-mb-md"
          />

          Anzahl Mitarbeiter
          <q-badge color="grey-7" class="q-pa-sm">{{ employess }} Mitarbeiter</q-badge>
          <q-slider
            v-model="employess"
            :min="1"
            :max="500"
            thumb-size="40px"
            :marker-labels="markerLabelEmployees"
            snap
            switch-label-side
            class="q-mb-md"
          />

          Monatliche Fixkosten
          <q-badge color="grey-7" class="q-pa-sm">{{ monthlyFixedCosts }} €</q-badge>
          <q-slider
            v-model="monthlyFixedCosts"
            :min="500"
            :max="5000"
            :step="100"
            thumb-size="40px"
            snap
            switch-label-side
            class="q-mb-md"
          />

          Krankheitstage pro Jahr
          <q-badge color="grey-7" class="q-pa-sm">{{ averageSickDays }} Tage</q-badge>
          <q-slider
            v-model="averageSickDays"
            :min="1"
            :max="20"
            thumb-size="40px"
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
            class="q-mb-md"
          />

          Urlaubstage pro Jahr
          <q-badge color="grey-7" class="q-pa-sm">{{ holidaysPerYear }} Tage</q-badge>
          <q-slider
            v-model="holidaysPerYear"
            :min="25"
            :max="30"
            thumb-size="40px"
            markers
            :marker-labels="[
              { value: 25, label: '25' },
              { value: 30, label: '30' },
            ]"
            switch-label-side
            class="q-mb-md"
          />

          Produkivität
          <q-badge color="grey-7" class="q-pa-sm">{{ employeeProductivity }} %</q-badge><br />
          <div class="text-caption text-grey">
            {{ ((workingHoursPerDay * employeeProductivity) / 100).toFixed(1) }} Stunden pro Tag |
            {{ availableAnnualHoursPerEmployee.toFixed(0) }} Stunden pro Jahr
          </div>
          <q-slider
            v-model="employeeProductivity"
            :min="5"
            :max="100"
            :step="5"
            thumb-size="40px"
            switch-label-side
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
