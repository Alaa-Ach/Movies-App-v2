<script setup>
import sideNavBar from "./components/sideNavBar.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const showMenu = ref(false);
</script>

<template>
  <div class="">
    <!-- background -->
    <div class="fixed inset-0 bg-[#060808]">
      <img
        src="https://wallpapers.com/images/featured/9pvmdtvz4cb0xl37.jpg"
        class="h-full object-cover lg:w-full opacity-30"
      />
    </div>
    <div class="relative z-50 sm:flex">
      <sideNavBar class="z-50" v-model:showMenu="showMenu" />
      <div class="transition-all w-full" :class="{ 'sm:ml-72': showMenu }">
        <!-- <home></home> -->

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
