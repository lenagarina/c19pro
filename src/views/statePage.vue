<template><state-dates :type="'state'" />
<week-dates :type="'state'" />

<BContainer>
  <BRow style="margin-bottom: 20px">
    <BCol lg="6">
      <age-statistics :type="'state'" />
    </BCol>
    <BCol lg="6">
      <gender-statistics :type="'state'" />
    </BCol>
  </BRow>

  <BRow>
    <BCol>
      <districts-statistics v-if="getAbbreviation() != ''" :state-abbreviation="getAbbreviation()" />
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ageStatistics from './../components/ageStatistics.vue'
import genderStatistics from './../components/genderStatistics.vue'
import stateDates from './../components/stateDates.vue'
import weekDates from './../components/weekDates.vue'
import districtsStatistics from '@/components/districtsStatistics.vue'

const route = useRoute()

function getAbbreviation(): string {
  return route?.params?.abbreviation?.toString() ?? ''
}
</script>
