<template>
<BContainer :fluid="true">
  <BRow class="textblock-style">
    <BCol>
      <BContainer>
        <BRow>
          <BCol class="p-3">
            <h2>Corona-Zahlen</h2>
            <h4 v-if="scope.statesStatistics !== null" class="m-0">
              Hier finden Sie aktuelle COVID-19 Kennzahlen für Bundesland
              {{ scope.statesStatistics.name }}
            </h4>
          </BCol>
        </BRow>
      </BContainer>
    </BCol>
  </BRow>
</BContainer>

<BContainer v-if="scope.isLoading" class="mt-3">
  <BRow>
    <BCol lg="4" md="6" class="cell-style">
      <BSpinner variant="primary" label="Spinning"></BSpinner>
    </BCol>
    <BCol lg="4" md="6" class="cell-style">
      <BSpinner variant="primary" label="Spinning"></BSpinner>
    </BCol>
    <BCol lg="4" md="6" class="cell-style">
      <BSpinner variant="primary" label="Spinning"></BSpinner>
    </BCol>
  </BRow>
</BContainer>

<BContainer v-if="scope.statesStatistics !== null && !scope.isLoading" class="mt-3">
  <BRow>
    <BCol lg="4" sm="12">
      <div class="cpro_cell">
        <h1>{{ scope.statesStatistics.population.toLocaleString() }}</h1>
        <span>Einwohner
          <b-button class="icon-info-button" variant="link"
            v-b-popover.hover.right="'Einwohnerzahl nach statistischem Landesamt'">
            <BIconInfoCircle />
          </b-button>
        </span>
      </div>
    </BCol>

    <BCol lg="4" sm="12">
      <div class="cpro_cell">
        <h1>{{ scope.statesStatistics.cases.toLocaleString() }}</h1>
        <span>Infektionen (gesamt)
          <b-button class="icon-info-button" variant="link" v-b-popover.hover.right="'Gesamtzahl aller gemeldeten'">
            <BIconInfoCircle />
          </b-button>
        </span>
      </div>
    </BCol>

    <BCol lg="4" sm="12">
      <div class="cpro_cell">
        <h1>{{ scope.statesStatistics.deaths.toLocaleString() }}</h1>
        <span>Todesfälle (gesamt)
          <b-button class="icon-info-button" variant="link" v-b-popover.hover.right="'Gesamtzahl aller gemeldeten'">
            <BIconInfoCircle />
          </b-button>
        </span>
      </div>
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import type { BIconInfoCircle } from 'bootstrap-icons-vue'
import { type StatesStatisticsType } from '../components/types/dataTypes'

const props = defineProps({
  type: { type: String, required: false }
})

const route = useRoute()

const scope: {
  statesStatistics: StatesStatisticsType | null
  isLoading: boolean
} = reactive({
  statesStatistics: null,
  isLoading: false
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

async function fetchStatesStatistics() {
  scope.isLoading = true
  axios
    .get('https://api.corona-zahlen.org/' + getURLAPI() + '/' + getURLIdent())
    .then((response) => {
      const responseData = response.data.data[getURLIdent()]
      scope.statesStatistics = responseData
      scope.isLoading = false
    })
    .catch((e) => {
      console.error("oh, no!", e.message);
    })
}

onMounted(() => {
  fetchStatesStatistics()
})
</script>
