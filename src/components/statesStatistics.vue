<template>
<BCard no-body class="cpro_card-m">
  <BRow>
    <BCol lg="12">
      <div class="cpro_bg-primary text-light p-3">
        <h2>Statistik zu COVID-19 Infektionen nach Bundesländer</h2>
        <h3>
          Hier finden Sie aktuelle COVID-19 Kennzahlen für alle 16 Bundesländer in Deutschland
        </h3>
      </div>
      <!--<BToast v-model="scope.toastVisible" title="Hinweis:" static no-auto-hide>text</BToast>-->

      <div class="cpro_alert alert alert-primary alert-dismissible fade show" role="alert" v-if="scope.isAlertVisible">
        <button type="button" class="close alert-close" data-dismiss="alert" aria-label="Close"
          @click="scope.isAlertVisible = false">
          <span aria-hidden="true">
            <BIconX />
          </span>
        </button>
        <h5>
          <span class="fw-bold">Hinweis:</span>
          Nutzen Sie die Suchfunktion, um Kennzahlen für Ihr Bundesland schneller zu finden oder
          klicken Sie auf eine Spalte, um die Tabelle neu zu sortieren. Mit Klick auf den Namen
          eines Bundeslands erhalten Sie weitere Informationen.
        </h5>
      </div>
      <div class="cpro_table-container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Bundesland</th>
              <th scope="col">Befölkerung</th>
              <th scope="col">Infektionen</th>
              <th scope="col">Todesfälle</th>
              <th scope="col">Erholt</th>
              <th scope="col">Aktualisiert</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in scope.statesStatisticsArray
        .filter(filterFunction)
        .sort(compareFunction)
        .slice(7 * (scope.currentPage - 1), 7 * scope.currentPage)" :key="index">
              <td>
                <RouterLink :to="'/state/' + item.abbreviation">
                  <div>{{ item.name }}</div>
                </RouterLink>
              </td>
              <td>{{ item.population.toLocaleString() }}</td>
              <td>
                <div class="progress cpro_progress-bar">
                  <div class="progress-bar" role="progressbar"
                    :style="{ width: Math.round(percentCalculater(item) ?? 0) + '%' }"
                    :aria-valuenow="Math.round(percentCalculater(item) ?? 0)" aria-valuemin="0" aria-valuemax="100">
                    <div class="percentCalculaterNumber">{{ percentCalculater(item) }} %</div>
                  </div>
                </div>
              </td>
              <td>{{ item.deaths.toLocaleString() }}</td>
              <td>{{ item.recovered.toLocaleString() }}</td>
              <td>{{ item.hospitalization.lastUpdate.substring(0, 10).replace('-', '.') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BCol>
  </BRow>
  <BRow>
    <BCol lg="4" md="6">
      <div class="input-group has-validation ms-4">
        <span class="input-group-text" id="inputGroupPrepend">
          <BIconSearch />
        </span>
        <input type="text" id="validationCustomUsername" aria-describedby="inputGroupPrepend"
          placeholder="Welche Bundesland?" v-model="scope.filterName" />
      </div>
    </BCol>
    <BCol lg="8" md="6">
      <div class="pagination cpro_pagination_with_xs_offset"
        v-if="scope.statesStatisticsArray.filter(filterFunction).length > 5">
        <b-pagination v-model="scope.currentPage"
          :total-rows="scope.statesStatisticsArray.filter(filterFunction).length" :per-page="7">
        </b-pagination>
      </div>
    </BCol>
  </BRow>
</BCard>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { BIconSearch, BIconX } from 'bootstrap-icons-vue'
import { type MetaInformation, type StatesStatisticsType } from './types/dataTypes'

const scope: {
  filterName: string
  statesStatisticsArray: Array<StatesStatisticsType>
  metaInformation: MetaInformation | null
  currentPage: number
  toastVisible: boolean
  isAlertVisible: boolean
} = reactive({
  filterName: '',
  statesStatisticsArray: [],
  metaInformation: null,
  currentPage: 1,
  toastVisible: true,
  isAlertVisible: true
})

async function fetchStatesStatistics() {
  axios.get('https://api.corona-zahlen.org/states').then((response) => {
    const responseData = response.data.data
    scope.metaInformation = response.data.meta
    const allValues: Array<StatesStatisticsType> = Object.values(responseData)
    scope.statesStatisticsArray = allValues
  }).catch((e) => {
    console.error("oh, no!", e.message);
  })
}

// arg item: StatesStatisticsType - object element with states statistic data
// return the result of an equation with numbers
const percentCalculater = (item: StatesStatisticsType): number | null => {
  if (
    !Number.isInteger(item.cases) ||
    !Number.isInteger(item.population) ||
    item.population === 0
  ) {
    return null
  }

  const result = (item.cases / item.population) * 100
  return Math.round(result * 10) / 10
}

// arg item: StatesStatisticsType - object element with statistic data
// return boolean - check substring filterName in item.name
const filterFunction = (item: StatesStatisticsType): boolean => {
  return item.name.toLowerCase().includes(scope.filterName.toLowerCase())
}

// function compare 2 arguments
// sort function returns a type number (-1, 0, 1)
const compareFunction = (a: StatesStatisticsType, b: StatesStatisticsType): number => {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  } else {
    return 0
  }
}

onMounted(() => {
  fetchStatesStatistics()
})
</script>
