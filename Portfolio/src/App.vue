<script setup lang="ts">
import ShaderCube from './components/ShaderCube.vue'
import IntroductionPage from './components/IntroductionPage.vue';
import Header from './components/header.vue';
import aboutMe from './components/aboutMePage.vue';
import { useScrollPage } from './useScrollPage';
import ProjectsPage from './components/projectsPage.vue';
import { onMounted } from 'vue';
import contactPage from './components/contactPage.vue';
const { currentPage } = useScrollPage(); // defaults to '.intro-container'

// Scroll to hash on page load
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const container = document.querySelector<HTMLDivElement>('.container');
    const target = container?.querySelector<HTMLElement>(hash);
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  }
});
</script>
<template>
    <Header/> 
    <div class="container">
    <IntroductionPage id="home"/>
    <aboutMe id="about"/>
    <ProjectsPage id="projects"/>
    <contactPage id= "contact"/>
  </div>

    <ShaderCube :currentPage="currentPage" />

</template>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.container {
  position: fixed;  /* sticks to viewport */
  top: 0;
  left: 0;
  width: 100%;      /* 100% of viewport width */
  height: 100%;     /* 100% of viewport height */
  margin: 0;
  padding: 0;
  overflow-y: scroll;  /* allow vertical scrolling */
  overflow-x: hidden;  /* avoid horizontal scroll */
  box-sizing: border-box;
    z-index: 999;
     scroll-snap-type: y mandatory;
}
#app {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}
.container > * {
  height: 100vh;           /* each page takes full viewport */
  scroll-snap-align: start;
}
</style>