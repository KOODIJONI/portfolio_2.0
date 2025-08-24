<script>
import SocialIcons from './socialIcons.vue';

export default {
  components: { SocialIcons },
};
</script>

<template>
  <div class="contact-page">
    <div class="title">
      <h1 class="heading-text">Ota yhteyttä</h1>
      <p class="sub-heading">Lähetä viesti tai seuraa minua sosiaalisessa mediassa</p>
    </div>

    <div class="content">
      <form class="contact-form" @submit.prevent="handleSubmit">
        <input type="text" v-model="name" placeholder="Nimi" required />
        <input type="email" v-model="email" placeholder="Sähköposti" required />
        <textarea v-model="message" placeholder="Viesti" rows="6" required></textarea>
        <button type="submit">Lähetä</button>
      </form>
    </div>

    <socialIcons />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // npm install axios


const name = ref('');
const email = ref('');
const message = ref('');


const handleSubmit = async () => {
  try {
    await axios.post('https://formspree.io/f/xkgvwrnb', {
      name: name.value,
      email: email.value,
      message: message.value,
    }, {
      headers: { 'Accept': 'application/json' }
    });
    alert(`Kiitos ${name.value}, viestisi on lähetetty!`);
    name.value = '';
    email.value = '';
    message.value = '';
  } catch (error) {
    alert('Viestin lähetys epäonnistui. Yritä uudelleen.');
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'KanitThin';
  src: url('/fonts/kanit.thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

.contact-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.title {
  text-align: center;
  margin-bottom: 3vh;
}

.heading-text {
  font-family: 'KanitThin', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
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
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin: 4vh auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-form input,
.contact-form textarea {
  font-family: 'KanitThin', sans-serif;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  resize: none;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: 2px solid #fff;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.contact-form button {
  font-family: 'KanitThin', sans-serif;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

.contact-form button:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

/* Responsiivisuus */
@media (max-width: 768px) {
  .heading-text {
    font-size: 8vw;
    letter-spacing: 1vw;
  }
  .sub-heading {
    font-size: 2.5vh;
  }
}
</style>
