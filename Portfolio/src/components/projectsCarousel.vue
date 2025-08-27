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
    projects: { type: Array, required: true }
  },
  mounted() {
    new Swiper('.projects-carousel', {
      modules: [EffectCoverflow],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      coverflowEffect: {
        rotate: -5,
        stretch: 0,
        depth: 150, /* CHANGED: Reduced depth for a tighter feel */
        modifier: 1,
        slideShadows: true
      },
      spaceBetween: 40, /* CHANGED: Reduced space between slides */
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 40 },
        1440: { slidesPerView: 4, spaceBetween: 50 }
      }
    });
  }
};
</script>

<style scoped>
.projects-carousel {
  width: 100%;
  max-width: 1200px;
  padding: 0;
  overflow: visible;
}

.swiper-slide {
  background: rgba(0, 0, 0, 0.35);
  border-radius: 12px; /* CHANGED: Slightly smaller radius */
  padding: 0.7rem; /* CHANGED: Reduced padding */
  text-align: center;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 90%;
  max-width: 300px; /* CHANGED: Reduced max-width for smaller cards */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 340px; /* CHANGED: Reduced min-height for shorter cards */
}

.swiper-slide:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.project-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px; /* CHANGED: Smaller radius */
  margin-bottom: 0.5rem; /* CHANGED: Reduced margin */
}

/* Typography */
h2 { font-size: clamp(1.1rem, 2vw, 1.4rem); margin: 0.25rem 0; } /* CHANGED: Smaller font and margin */
p { font-size: clamp(0.8rem, 1.5vw, 0.9rem); color: rgba(255,255,255,0.85); margin-bottom: 0.5rem; } /* CHANGED: Smaller font and margin */

.project-tech { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-bottom: 0.75rem; } /* CHANGED: Reduced gap */
.tech-badge { background: rgba(255,255,255,0.15); backdrop-filter: blur(5px); padding: 0.25rem 0.6rem; border-radius: 1rem; font-size: 0.75rem; transition: background 0.3s ease; } /* CHANGED: Smaller badges */
.tech-badge:hover { background: rgba(255,255,255,0.3); }

.project-link { display: inline-block; padding: 0.4rem 1.2rem; background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.35)); border-radius: 0.5rem; color: white; text-decoration: none; font-weight: 500; transition: background 0.3s ease, transform 0.2s ease; } /* CHANGED: Smaller button */
.project-link:hover { background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.6)); transform: translateY(-2px); }

.project_name, .project_desc { font-family: 'KanitThin', sans-serif; margin: 0; }
</style>