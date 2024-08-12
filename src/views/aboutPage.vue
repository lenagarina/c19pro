<template>
<BContainer class="">
  <BRow>
    <BCol lg="6" class="mt-4">
      <h2>C19Pro Projekt</h2>
      <h3 class="mt-2">Projekt basiert on Robert Koch-Institut API - von Marlon Lückert</h3>
      <h3 class="mt-1">Technologie-Stack</h3>
      <ul>
        <li>Technologien: HTML, CSS, NodeJS</li>
        <li>Fontend Framework: Vue 3 with Composition API, Vite</li>
        <li>UI Framework: Bootstrap 5</li>
        <li>Style: SCSS, CSS</li>
        <li>Code Formatter: prettier, eslint</li>
        <li>Programmiersprachen: Typescript 5.3, Javascript</li>
        <li>VCS: Git</li>
        <li>Backend: Rest API Verbindung mit Robert Koch-Institut API (ajax, axios, json)</li>
      </ul>
    </BCol>

    <BCol lg="6" class="cpro_logos-img mt-4">
      <BImg src="../src/assets/pics/pro_logos.jpg" />
    </BCol>
  </BRow>
  <BRow>
    <BCol lg="6" class="mt-4">
      <h3 class="mt-1">Übersicht</h3>
      <ul>
        <li>Anzahl der Infektionen, Todesfälle, Genesenen</li>
        <li>7-Tage-Inzidenz Wert</li>
        <li>Neuinfektionen, neue Todesfälle, neue Genesene (Differenz zum Vortag)</li>
        <li>R-Wert (Reproduktion)</li>
        <li>Impfquote</li>
        <li>Werte für jedes Bundesland und jeden Landkreis</li>
        <li>historische Daten für Deutschland, jedes Bundesland and jeden Landkreis</li>
        <li>Karten mit Bundesländern und Landkreisen</li>
        <li>Anzahl der wöchentlich durchgeführen PCR-Tests, Anzahl der positiven Tests sowie der Positiv Quote</li>
        <li>Fallzahlen und Todesfälle pro Altersgruppe</li>
        <li>Hospitalisierungsrate</li>

      </ul>
    </BCol>

    <BCol lg="6">
      &nbsp;
    </BCol>
  </BRow>
</BContainer>
</template>
