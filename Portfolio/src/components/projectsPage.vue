<template>
  <div class="projects-page">
    <div class="title">
      <h1 class="name-text">Projektini</h1>
      <p class="bottom-text">Kuratoitu kokoelma ohjelmointi- ja sovellusprojekteistani</p>
    </div>

    <ProjectsCarousel :projects="projects" />

    <socialIcons />
  </div>
</template>

<script>
import ProjectsCarousel from './ProjectsCarousel.vue';
import socialIcons from './socialIcons.vue';

export default {
  components: { ProjectsCarousel, socialIcons },
  data() {
    const projects=  [
        {
          name: "GuitarDistortion VST3",
          description: "Perus kitarasäröefekti VST3-pluginina ja standalone-sovelluksena.",
          tech: ["C++", "JUCE", "Audio Processing"],
          link: "https://github.com/KOODIJONI/GuitarDistortion_vst3_plugin",
          image: "/images/guitardistortion.png"
        },
        {
          name: "AllGuitarScales",
          description: "Näyttää kitarasoinnut kaikilla otelaudan nauhoilla.",
          tech: ["C++", "Qt"],
          link: "https://github.com/KOODIJONI/GuitarScales",
          image: "/images/AllGuitarScales.png"
        },
        {
          name: "RocketBank",
          description: "Pankkijärjestelmäprojekti kurssille: backend, web-frontend ja Qt-sovellus.",
          tech: ["Node.js", "MySQL", "Qt", "JavaScript"],
          link: "https://github.com/KOODIJONI/OhjelmistokehityksenSovellusprojekti-k25",
          image: "/images/rocketbank.png"
        },
        {
          name: "Portfolio verkkosivu",
          description: "Oma verkkosivuni, jonka taustalla on customisoitu, shader tausta.",
          tech: ["Node.js", "Vue", "Three", "Typescript"],
          link: "https://github.com/KOODIJONI/",
          image: "/images/tama.png"
        },
        {
          name: "GuitarDistortion VST3",
          description: "Perus kitarasäröefekti VST3-pluginina ja standalone-sovelluksena.",
          tech: ["C++", "JUCE", "Audio Processing"],
          link: "https://github.com/KOODIJONI/GuitarDistortion_vst3_plugin",
          image: "/images/guitardistortion.png"
        },
        {
          name: "AllGuitarScales",
          description: "Näyttää kitarasoinnut kaikilla otelaudan nauhoilla.",
          tech: ["C++", "Qt"],
          link: "https://github.com/KOODIJONI/GuitarScales",
          image: "/images/AllGuitarScales.png"
        },
        {
          name: "RocketBank",
          description: "Pankkijärjestelmäprojekti kurssille: backend, web-frontend ja Qt-sovellus.",
          tech: ["Node.js", "MySQL", "Qt", "JavaScript"],
          link: "https://github.com/KOODIJONI/OhjelmistokehityksenSovellusprojekti-k25",
          image: "/images/rocketbank.png"
        },
        {
          name: "Portfolio-verkkosivu",
            description: "Henkilökohtainen portfolio, jossa on räätälöity shader-tausta ja moderni käyttöliittymä. Sivusto on täysin responsiivinen.",
          tech: ["Node.js", "Vue", "Three", "Typescript"],
          link: "https://github.com/KOODIJONI/",
          image: "/images/tama.png"
        }
      ]
      const repeatedProjects = [...projects, ...projects, ...projects];

     return {
      projects: repeatedProjects
    };
  }
};
</script>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.title {
  text-align: center;
}

.name-text {
  font-family: 'KanitThin', sans-serif;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 100;
}

.bottom-text {
  font-family: 'KanitThin', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgba(255,255,255,0.85);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}
</style>
