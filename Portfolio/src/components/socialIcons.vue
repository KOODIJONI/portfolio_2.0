<template>
  <div class="parent">
    <!-- Other content here -->

    <div class="social-icons">
      <a href="https://github.com/KOODIJONI" target="_blank" aria-label="GitHub Profile">
        <font-awesome-icon :icon="['fab', 'github']" class="icon" />
      </a>
      <a href="https://www.linkedin.com/in/joni-m%C3%A4yr%C3%A4-ba07632b3/" target="_blank" aria-label="LinkedIn Profile">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="icon" />
      </a>
      <a href="mailto:jjmayra1@outlook.com" target="_blank" aria-label="Send Email">
        <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>


.social-icons {
    padding-top: 0;
  display: flex;
  justify-content: center; 
  gap: 2rem;
  margin-top: auto; 
  padding-bottom: 1rem; 
}

.icon {
  font-size: 1.5rem;
  color: #ffffff96;
  transition: transform 0.2s, color 0.2s;
}

.icon:hover {
  transform: scale(1.2);
  color: #0077b5;
}
</style>
