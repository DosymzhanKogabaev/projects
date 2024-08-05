<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Header from './components/Header.vue';
  import { onMounted, onUnmounted, ref } from "vue";

  let scrollTopButton = ref(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      scrollTopButton.value.classList.remove("invisible");
    } else {
      scrollTopButton.value.classList.add("invisible");
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<template>
  <Header class="wrapper"></Header>
  <RouterView class="wrapper" />
  <div ref="scrollTopButton">
    <button @click="scrollToTop()" id="myBtn" title="Go to top">
      <img class="arrow" src="./assets/arrow-up.png">
    </button>
  </div>
</template>

<style scoped>
  .arrow {
    width: 32px;
  }
  .invisible {
    display: none;
  }
  #myBtn {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    border: none;
    outline: none;
    background-color: rgb(0, 208, 255);
    color: white;
    cursor: pointer;
    border-radius: 100px;
    font-size: 18px;
  }

  #myBtn:hover {
    background-color: rgba(0, 208, 255, 0.548);
  }
  .wrapper {
    width: 90%;
    margin: 0 auto;
  }
</style>
<style>
  ::-webkit-scrollbar {
    display: none;
  }
</style>