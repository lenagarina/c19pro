<template><state-dates :type="'district'" />
<week-dates :type="'district'" />

<BContainer>
  <BRow>
    <BCol lg="6">
      <age-statistics :type="'district'" />
    </BCol>
    <BCol lg="6">
      <gender-statistics :type="'district'" />
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import ageStatistics from './../components/ageStatistics.vue'
import genderStatistics from './../components/genderStatistics.vue'
import stateDates from './../components/stateDates.vue'
import weekDates from './../components/weekDates.vue'
</script>
