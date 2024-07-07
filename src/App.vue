<template>
<headerBlock />

<RouterView />

<footerBlock />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import headerBlock from './components/headerBlock.vue'
import footerBlock from './components/footerBlock.vue'
</script>

<style lang="scss">
@import './assets/main.scss';
</style>
