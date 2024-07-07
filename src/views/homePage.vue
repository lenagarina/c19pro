<template>
<BContainer :fluid="true" class="body-block p-0 mb-4">
  <Carousel class="cpro_carousel" :wrap-around="true">
    <Slide :key="'slide_1'">
      <div class="carousel__item carousel-slide" style="background-image: url(/src/assets/pics/cpro_banner-1.jpg)">
      </div>
    </Slide>
    <Slide :key="'slide_2'">
      <div class="carousel__item carousel-slide" style="background-image: url(/src/assets/pics/cpro_banner-2.jpg)">
      </div>
    </Slide>
    <Slide :key="'slide_3'">
      <div class="carousel__item carousel-slide" style="background-image: url(/src/assets/pics/cpro_banner-3.jpg)">
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <div class="carousel-content">
        <div class="carousel-content-background"></div>
        <div class="carousel-content-texts">
          <h1>Corona Statistiken</h1>
          <h2>Aktuelle Corona Statistiken</h2>
          <span>Auf diese Seite befinden sich die Staat-, Bundesländer- und Kreis Statistiken auch
            nach Alter und Gender</span>
        </div>
      </div>
    </template>
  </Carousel>
</BContainer>

<BContainer>
  <BRow>
    <BCol lg="12">
      <states-statistics />
      <br />
      <districts-statistics />
    </BCol>
  </BRow>
</BContainer>

<BContainer :fluid="true" class="cpro_footer-block container-fluid">
  <BRow>
    <BCol class="cpro_footer-text">
      <BContainer>
        <BRow>
          <BCol>
            <p>
              Hintergrund zu COVID-19 <br />
              Coronaviren wurden erstmals Mitte der 1960er Jahre identifiziert. Sie können sowohl
              Menschen als auch verschiedene Tiere infizieren. SARS-CoV-2 ist die offizielle
              Bezeichnung des neuartigen Coronavirus und COVID-19 die offizielle Bezeichnung der
              Erkrankung durch das neuartige Coronavirus.
            </p>
          </BCol>
        </BRow>
      </BContainer>
    </BCol>
  </BRow>
</BContainer>
<BContainer>
  <BRow>
    <BCol lg="12">
      <districts-map />
    </BCol>
  </BRow>
</BContainer>
</template>

<script setup lang="ts">
import statesStatistics from './../components/statesStatistics.vue'
import districtsStatistics from './../components/districtsStatistics.vue'
import districtsMap from './../components/districtsMap.vue'

import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
</script>
