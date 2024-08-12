<template>
<BCard no-body class="cpro_card-s">
  <div class="cpro_bg-primary text-light p-2">
    <h2>COVID-19 Infektionen nach Altersgruppe</h2>
    <h3>Hier finden Sie aktuelle COVID-19 Kennzahlen nach Altersgruppe</h3>
  </div>

  <table class="table table-striped" v-if="scope.ageStatistics !== null">
    <thead>
      <tr>
        <th></th>
        <th>Infektionen</th>
        <th>Todesfälle</th>
        <th>Infektionen<br />Per100k</th>
        <th>Todesfälle<br />Per100k</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ageItem, index) in ageArray" :key="index">
        <td>{{ ageItem.name }}</td>
        <td>
          {{
    scope.ageStatistics[ageItem.ident].casesFemale * 1 +
    scope.ageStatistics[ageItem.ident].casesMale * 1
  }}
        </td>
        <td>
          {{
      scope.ageStatistics[ageItem.ident].deathsFemale * 1 +
      scope.ageStatistics[ageItem.ident].deathsMale * 1
    }}
        </td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
      width:
        Math.round(
          percentCalculaterCasesPer100k(scope.ageStatistics[ageItem.ident]) ?? 0
        ) + '%'
    }" :aria-valuenow="Math.round(percentCalculaterCasesPer100k(scope.ageStatistics[ageItem.ident]) ?? 0)
    " aria-valuemin="0" aria-valuemax="100"></div>
            <div class="percentCalculaterNumber">
              {{ percentCalculaterCasesPer100k(scope.ageStatistics[ageItem.ident]) }} %
            </div>
          </div>
        </td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
    width:
      Math.round(
        percentCalculaterDeathsPer100k(scope.ageStatistics[ageItem.ident]) ?? 0
      ) + '%'
  }" :aria-valuenow="Math.round(
    percentCalculaterDeathsPer100k(scope.ageStatistics[ageItem.ident]) ?? 0
  )
    " aria-valuemin="0" aria-valuemax="100"></div>
            <div class="percentCalculaterNumber" style="padding-left: 2px">
              {{ percentCalculaterDeathsPer100k(scope.ageStatistics[ageItem.ident]) }} %
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</BCard>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import {
  type AgeStatisticsType,
  type StatesStatisticsType,
  type AgeStatisticsSubType
} from '../components/types/dataTypes'

const props = defineProps({
  type: { type: String, required: true }
})

const route = useRoute()

const ageArray: Array<{ name: string; ident: string }> = [
  {
    name: '0-4 Jahre',
    ident: 'A00-A04'
  },
  {
    name: '5-14 Jahre',
    ident: 'A05-A14'
  },
  {
    name: '15-34 Jahre',
    ident: 'A15-A34'
  },
  {
    name: '35-59 Jahre',
    ident: 'A35-A59'
  },
  {
    name: '60-79 Jahre',
    ident: 'A60-A79'
  },
  {
    name: '80+ Jahre',
    ident: 'A80+'
  }
]

const scope: {
  ageStatistics: AgeStatisticsType | null
  statesStatistics: StatesStatisticsType | null
} = reactive({
  ageStatistics: null,
  statesStatistics: null
})

function getURLIdent(): string {
  if (props.type === 'district') {
    return route?.params?.ags?.toString() ?? ''
  }
  if (props.type === 'state') {
    return route?.params?.abbreviation?.toString() ?? ''
  }
  return ''
}

function getURLAPI(): string {
  if (props.type === 'district') {
    return 'districts'
  }
  if (props.type === 'state') {
    return 'states'
  }
  return ''
}

const percentCalculaterCasesPer100k = (item: AgeStatisticsSubType): number | null => {
  const result = (item.casesMalePer100k * 1 + item.casesFemalePer100k * 1) / 2000
  return Math.round(result * 10) / 10
}

const percentCalculaterDeathsPer100k = (item: AgeStatisticsSubType): number | null => {
  const result = (item.deathsMalePer100k * 1 + item.deathsFemalePer100k * 1) / 2000
  return Math.round(result * 10) / 10
}

async function fetchAgeStatistics() {
  axios
    .get('https://api.corona-zahlen.org/' + getURLAPI() + '/' + getURLIdent() + '/age-groups')
    .then((response) => {
      const ageStatistics: AgeStatisticsType = response.data.data[getURLIdent()]
      scope.ageStatistics = ageStatistics
    }).catch((e) => {
      console.error("oh, no!", e.message);
    })
}

onMounted(() => {
  fetchAgeStatistics()
})
</script>
