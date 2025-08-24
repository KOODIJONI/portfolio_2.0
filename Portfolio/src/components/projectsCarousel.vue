<template>
  <div class="swiper projects-carousel">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="project in projects" :key="project.name">
        <img :src="project.image" alt="Project Image" class="project-image" />
        <h2 class="project_name">{{ project.name }}</h2>
        <p class="project_desc">{{ project.description }}</p>
        <div class="project-tech">
          <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
        </div>
        <a :href="project.link" target="_blank" class="project-link">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

export default {
  name: 'ProjectsCarousel',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  mounted() {
    new Swiper('.projects-carousel', {
  modules: [EffectCoverflow],
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  coverflowEffect: {
    rotate: -10,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true
  },
  spaceBetween: 30,
  breakpoints: {
    320: { slidesPerView: 'auto', spaceBetween: 15 },
    768: { slidesPerView: 'auto', spaceBetween: 20 },
    1024: { slidesPerView: 'auto', spaceBetween: 30 },
    
  }
});
  }
};
</script>

<style scoped>
.projects-carousel {
  width: 100%;
  max-width: 1200px;
  height: auto;
  padding: 0rem 0;
  overflow: visible;
}
.swiper-slide {
  background: rgba(0, 0, 0, 0.35);
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 90%;
  max-width: 350px;
  box-sizing: border-box;
}
.swiper-slide:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0,0,0,0.5);
}
.project-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}
h2 {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  margin: 0.5rem 0;
}
p {
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
  color: rgba(255,255,255,0.85);
  margin-bottom: 1rem;
}
.project-tech {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 0.5rem;
  margin-bottom: 1rem;
}
.tech-badge {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  transition: background 0.3s ease;
}
.tech-badge:hover {
  background: rgba(255,255,255,0.3);
}
.project-link {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.35));
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
}
.project-link:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.6));
  transform: translateY(-2px);
}
.project_name {
  font-family: 'KanitThin', sans-serif;
}
.project_desc {
  font-family: 'KanitThin', sans-serif;
  margin: 0;
}
</style>
