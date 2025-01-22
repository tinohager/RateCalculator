<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const annualGrossOwnerSalary = ref<number>(42000)
const averageSickDays = ref(5)
const employeeProductivity = ref(75)
const monthlyFixedCosts = ref(1000)
const workingHoursPerDay = ref(8)

const annualWageCosts = computed(() => {
  return annualGrossOwnerSalary.value * 1.2683
  //Pensionsversicherung 18,50%
  //Krankenversicherung 6,80%
  //Unfallversicherung 12,86 € pro Monat
  //Selbständigenvorsorge (Abfertigung neu) 1,53 % des Einkommens.
  //Summe der variablen Beiträge. Insgesamt sind das 26,83 % des Einkommens.
})

const annualFixedCosts = computed(() => {
  const annualFixedCosts = monthlyFixedCosts.value * 12

  return annualFixedCosts
})

const requiredHourlyWage = computed(() => {
  const annualFixedCosts = monthlyFixedCosts.value * 12
  const temp = (annualWageCosts.value + annualFixedCosts) / availableAnnualHoursPerEmployee.value

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

  const availableDays = workingDaysPerYear - publicHolidaysPerYear - averageSickDays.value
  const availableWorkingHours = availableDays * workingHoursPerDay.value

  return (availableWorkingHours / 100) * employeeProductivity.value
})

const markerLabelSalary = computed(() => {
  if ($q.screen.lt.sm) {
    return [
      { value: 10000, label: '10000€' },
      { value: 50000, label: '50000€' },
      { value: 100000, label: '100000€' },
      { value: 150000, label: '150000€' },
      { value: 200000, label: '200000€' },
    ]
  }

  return [
    { value: 10000, label: '10000€' },
    { value: 50000, label: '50000€' },
    { value: 100000, label: '100000€' },
    { value: 150000, label: '150000€' },
    { value: 200000, label: '200000€' },
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
        <div class="col-12 col-md-12 col-lg-3 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Benötigter Stundenlohn (Netto)
              <div class="text-h1">{{ requiredHourlyWage }}€</div>
              <q-badge>
                bei
                {{ ((workingHoursPerDay * employeeProductivity) / 100).toFixed(1) }} abrechenbaren
                Stunden pro Tag
              </q-badge>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-3 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Monatlicher Lohn (Brutto)
              <div class="text-h1">{{ formatCurrency(annualWageCosts / 12) }}€</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-3 q-pa-sm">
          <q-card flat bordered>
            <q-card-section>
              Jährlicher Lohn (Brutto)
              <div class="text-h1">{{ formatCurrency(annualWageCosts) }}€</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6 col-lg-3 q-pa-sm">
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
          Jährlicher Inhaberlohn
          <q-badge color="grey-7" class="q-pa-sm">{{ annualGrossOwnerSalary }}€</q-badge>
          <q-slider
            v-model="annualGrossOwnerSalary"
            :min="10000"
            :max="200000"
            :step="1000"
            thumb-size="40px"
            :marker-labels="markerLabelSalary"
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

          Produktivität
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
