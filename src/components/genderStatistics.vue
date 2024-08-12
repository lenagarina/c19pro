<template>
<BCard no-body class="cpro_card-s">
  <div class="cpro_bg-primary text-light p-2">
    <h2>COVID-19 Infektionen nach Geschlecht</h2>
    <h3>Hier finden Sie aktuelle COVID-19 Kennzahlen nach Geschlecht</h3>
  </div>

  <table class="table table-striped" v-if="scope.ageStatistics !== null">
    <thead>
      <tr>
        <th></th>
        <th>Infektionen</th>
        <th>Todesfälle</th>
        <th>
          Infektionen <br />
          in%
        </th>
        <th>
          Todesfälle <br />
          in%
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Männlich</td>
        <td>{{ summarCalculater('casesMale') }}</td>
        <td>{{ summarCalculater('deathsMale') }}</td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
    width: Math.round(summarCalculater('casesMalePer100k') / (6 * 1000) ?? 0) + '%'
  }" :aria-valuenow="Math.round(summarCalculater('casesMalePer100k') / (6 * 1000) ?? 0)" aria-valuemin="0"
              aria-valuemax="100"></div>
            <div class="percentCalculaterNumber" style="padding-left: 2px">
              {{ Math.round(summarCalculater('casesMalePer100k') / (6 * 1000)) }}%
            </div>
          </div>
        </td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
    width: Math.round(summarCalculater('deathsMalePer100k') / (6 * 1000) ?? 0) + '%'
  }" :aria-valuenow="Math.round(summarCalculater('deathsMalePer100k') / (6 * 1000) ?? 0)" aria-valuemin="0"
              aria-valuemax="100"></div>
            <div class="percentCalculaterNumber" style="padding-left: 2px">
              {{ Math.round(summarCalculater('deathsMalePer100k') / (6 * 1000)) }}%
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>Weiblich</td>
        <td>{{ summarCalculater('casesFemale') }}</td>
        <td>{{ summarCalculater('deathsFemale') }}</td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
    width: Math.round(summarCalculater('casesFemalePer100k') / (6 * 1000) ?? 0) + '%'
  }" :aria-valuenow="Math.round(summarCalculater('casesFemalePer100k') / (6 * 1000) ?? 0)
    " aria-valuemin="0" aria-valuemax="100"></div>
            <div class="percentCalculaterNumber" style="padding-left: 2px">
              {{ Math.round(summarCalculater('casesFemalePer100k') / (6 * 1000)) }}%
            </div>
          </div>
        </td>
        <td>
          <div class="progress cpro_progress-bar">
            <div class="progress-bar" role="progressbar" :style="{
    width: Math.round(summarCalculater('deathsFemalePer100k') / (6 * 1000) ?? 0) + '%'
  }" :aria-valuenow="Math.round(summarCalculater('deathsFemalePer100k') / (6 * 1000) ?? 0)
    " aria-valuemin="0" aria-valuemax="100"></div>
            <div class="percentCalculaterNumber" style="padding-left: 2px">
              {{ Math.round(summarCalculater('deathsFemalePer100k') / (6 * 1000)) }}%
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div style="margin: 10px" class="cpro_card-info-text">
    <h3>Verteilung der Corona-Infektionen in Deutschland nach Geschlecht</h3>
    <span>
      Von den Fällen, für die alters- und geschlechtsspezifische Angaben vorlagen, entfielen rund
      49 Prozent auf Männer. Das zugrunde liegende Coronavirus hat sich mittlerweile in mehr als
      190 Ländern ausgebreitet. Derzeit werden aus den USA, Brasilien, Indien, der Türkei und
      Russland die höchsten Fallzahlen gemeldet. In Europa verzeichnen Italien, Spanien,
      Frankreich, Deutschland und das Vereinigte Königreich die meisten Corona-Infektionen.
    </span>
  </div>
</BCard>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import {
  type AgeStatisticsType,
  type AgeStatisticsSubType,
  type StatesStatisticsType
} from '../components/types/dataTypes'

const props = defineProps({
  type: { type: String, required: true }
})

const route = useRoute()

const scope: {
  ageStatistics: AgeStatisticsType | null
  statesStatistics: StatesStatisticsType | null
} = reactive({
  ageStatistics: null,
  statesStatistics: null
})

function getURLIdent(): string {
  if (props.type === 'district') {
    return route?.params?.ags.toString() ?? ''
  }
  if (props.type === 'state') {
    return route?.params?.abbreviation.toString() ?? ''
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

const summarCalculater = (key: keyof AgeStatisticsSubType): number => {
  let result = 0
  ageArray.forEach((item) => {
    if (scope.ageStatistics !== null) {
      const ageStatisticsAll: AgeStatisticsSubType = scope.ageStatistics[item.ident]

      result = result + ageStatisticsAll[key]
    }
  })
  return result
}

async function fetchAgeStatistics() {
  axios
    .get('https://api.corona-zahlen.org/' + getURLAPI() + '/' + getURLIdent() + '/age-groups')
    .then((response) => {
      const ageStatistics: AgeStatisticsType = response.data.data[getURLIdent()]
      scope.ageStatistics = ageStatistics
    })
    .catch((e) => {
      console.error("oh, no!", e.message);
    })
}

onMounted(() => {
  fetchAgeStatistics()
})
</script>
