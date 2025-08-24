<script>
import socialIcons from './socialIcons.vue';
</script>
<template>
  
  <div class="intro-page">
      <div class="title">

    <h1 class="name-text">Joni Mäyrä</h1>

    
    <p class="bottom-text " >Ohjelmistokehitys</p>
      </div>

      <socialIcons/>
    
  </div>
  
</template>

<script setup>
</script>

<style scoped>
@font-face {
  font-family: 'KanitThin';
  src: url('/fonts/kanit.thin.ttf') format('truetype');
  font-weight: 100; /* optional, matches thin weight */
  font-style: normal;
}
.intro-page {
display: flex;
flex-direction: column;
  
  position: relative;
  width: 100%;
  min-height: 100vh; 
  display: flex;         
  justify-content: center;
  align-items: center;
  background: transparent; 
  pointer-events: none;     
  z-index: 1000;            
  box-sizing: border-box; /* prevent padding/margin overflow */
  padding: 1rem;  
  
}

.name-text {
  font-family: 'KanitThin', sans-serif; 
  color: rgba(255, 255, 255, 0.9); /* semi-transparent white */
   text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.486);
  text-align: center;
  user-select: none;
    font-weight: 100;        /* ultra-thin */

    letter-spacing: 3vh;
  font-size: 8vw;          /* smaller than before, responsive */
  white-space: normal;      /* allow line breaks */
  width:100%;    
  padding: 0;
  margin: 0;
}
.bottom-text {
  font-family: 'KanitThin', sans-serif; 
  font-size: 2vh;    
  color: rgba(255, 255, 255, 0.8); 
text-shadow: 2px 5px 2px rgba(0, 0, 0, 1);

  text-align: center;
  user-select: none;
font-weight: 500;       

letter-spacing: 1vw;

}
.title {
  padding-top:25vh;
  height: 50%;
}
</style>
