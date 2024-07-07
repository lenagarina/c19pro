<template>
<BContainer :fluid="true" class="cpro_header-top-block container-fluid">
  <BRow>
    <BCol cols="4" class="logo-style" :class="{ 'logo-style-expanded': expanded }">
      <RouterLink to="/">
        <BImg class="logo-img" src="../src/assets/pics/logo.png" />
      </RouterLink>
    </BCol>

    <BCol cols="8" class="navi-block">
      <BNavbar>
        <BCollapse id="nav-collapse" :class="{ show: expanded }">
          <BNavbarNav>
            <li class="nav-item">
              <RouterLink class="nav-link" :to="'/'" :class="{ active: isLinkActive('/') }">
                Startseite
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :to="'/about'" :class="{ active: isLinkActive('/about') }">
                Über Projekt
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :to="'/contact'" :class="{ active: isLinkActive('/contact') }">
                Kontakt
              </RouterLink>
            </li>
          </BNavbarNav>
        </BCollapse>

        <BNavbarToggle target="nav-collapse" @click="expanded = !expanded">
          <BIconXLg v-if="expanded" />
          <BIconList v-else />
        </BNavbarToggle>
      </BNavbar>
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()

const expanded = ref(false)

function isLinkActive(link: string): boolean {
  return route.path === link
}
</script>
