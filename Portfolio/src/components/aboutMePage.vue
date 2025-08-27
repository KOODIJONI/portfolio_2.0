<script>
import SocialIcons from './socialIcons.vue';

export default {
  components: { SocialIcons },
};
</script>

<template>
  <div class="about-page">
    <div class="title">
      <h1 class="heading-text">Tietoa minusta</h1>
      <p class="sub-heading">Kuka olen ja mitä teen?</p>
    </div>

    <div class="content">
      <p class="about-text">
        Olen Joni Mäyrä, ohjelmistokehittäjä ja tietotekniikan opiskelija AMK:ssa. Erikoistun laiteläheiseen ohjelmistokehitykseen. Minulla on vahva pohja ohjelmoinnissa ja teknisissä ratkaisuissa, ja kehitän itseäni jatkuvasti uusissa teknologioissa.
      </p>
      <p class="about-text">
        Rakastan luoda moderneja, käyttäjäystävällisiä ja visuaalisesti näyttäviä
        sovelluksia, erityisesti 3D-grafiikan ja vuorovaikutteisten animaatioiden
        parissa. Työskentelen mm. JavaScript-, TypeScript-, Node.js-, Three.js-
        ja C++-teknologioilla.
      </p>
      <p class="about-text">
        Olen toteuttanut projekteja VST3-kitarasäröefekteistä, Qt- ja Unity-sovelluksiin
        sekä responsiivisiin web-portfolioihin, yhdistäen frontendin, backendin ja
        reaaliaikaisen visualisoinnin.
      </p>
    </div>

    <socialIcons />
  </div>
</template>

<script setup>
</script>

<style scoped>
@font-face {
  font-family: 'KanitThin';
  src: url('/fonts/kanit.thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

.about-page {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  pointer-events: none;
  z-index: 1000;
  box-sizing: border-box;
  padding: 1rem;
}

.title {
  text-align: center;
  margin-bottom: 0vh;
  padding-top: 0vh;
}

.heading-text {
  font-family: 'KanitThin', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.486);
  font-weight: 100;
  letter-spacing: 2vh;
  font-size: 5vw;
  margin: 0;
}

.sub-heading {
  font-family: 'KanitThin', sans-serif;
  font-size: 2vh;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 2px 5px 2px rgba(0, 0, 0, 1);
  font-weight: 500;
  letter-spacing: 0.5vw;
  margin-top: 1vh;
}

.content {
  max-width: 800px;
  text-align: center;
  margin: 2vh auto;
}

.about-text {
  font-family: 'KanitThin', sans-serif;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.8);
  font-size: 2.0vh;
  line-height: 1.8;
  margin-bottom: 2vh;
}
</style>
