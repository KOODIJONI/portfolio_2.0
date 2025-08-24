import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useScrollPage(containerSelector: string = '.container') {
  const currentPage = ref(0);
  let container: HTMLElement | null = null;

  function onScroll() {
    if (!container) return;
    const scrollTop = container.scrollTop;
    const pageHeight = window.innerHeight;

    currentPage.value = Math.round(scrollTop / pageHeight);
  }

  onMounted(() => {
    container = document.querySelector(containerSelector);
    if (container) {
      container.addEventListener('scroll', onScroll);
    }
  });

  onBeforeUnmount(() => {
    if (container) {
      container.removeEventListener('scroll', onScroll);
    }
  });

  return {
    currentPage
  };
}