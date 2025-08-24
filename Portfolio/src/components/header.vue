<template>
  <header class="header">
    <nav class="nav">
      <ul>
        <li v-for="link in links" :key="link.name">
          <a :href="link.href">{{ link.name }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  z-index: 999999;
}
.header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  pointer-events: none; /* gradient doesn’t block clicks */
  z-index: -1; /* behind the links */
}


/* Make the ul full width and flex */
.nav ul {
  display: flex;
  width: 100%;          /* full width of header */
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: space-evenly; /* evenly spaced */
  align-items: center;
}

/* Make each li centered in its space */
.nav li {
  text-align: center;
  flex: 1;               /* equal space for each link */
}

.nav a {
  font-family: 'KanitThin', sans-serif;
  letter-spacing: 0.1cap;
  font-weight: 100;
  font-size: 1.9vh;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease;
  z-index: 999999999;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: width 0.3s ease;
}

.nav a:hover::after {
  width: 100%;
}

.nav a:hover {
  color: #fff;
}
</style>
