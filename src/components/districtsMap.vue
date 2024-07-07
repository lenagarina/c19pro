<template>
<BContainer>
  <BRow>
    <BCol lg="8" style="text-align: center">
      <BImg class="cpro_maps-img" :src="'https://api.corona-zahlen.org/map/states-legend/history/' + date" />
    </BCol>
    <BCol lg="4" style="text-align: center">
      <BFormInput class="mt-4" v-model="date" :type="'date'" :max="todayInFormat" />
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

const todayInFormat = yyyy + "-" + mm + "-" + dd;

const date = ref(todayInFormat)

</script>
