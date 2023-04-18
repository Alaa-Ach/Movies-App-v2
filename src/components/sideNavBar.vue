<script setup>
import searchBar from "./searchBar.vue";
import GenresFilter from "./GenresFilter.vue";
import RatingFilter from "./RatingFilter.vue";
import LanguageFilter from "./LanguageFilter.vue";
import { useRequestsStore } from "../stores/requests";
import icons from "./icons.vue";
import { computed, onMounted, onUpdated, ref } from "vue";
import { storeToRefs } from "pinia";
// Routing
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
const props = defineProps({
  showMenu: Boolean,
});
const router = useRouter();
const route = useRoute();
const tetsberg = ref(false);
onUpdated(() => {
  console.log(route.query);
});
const store = useRequestsStore();
const { searchFilter, searchText, LanguagesList } = storeToRefs(store);
const { applyFilters } = store;
const test = ref(false);
</script>

<template>
  <div tabindex="1" class="bg-[#111827] z-[500] relative">
    <!-- Humberger Button -->
    <div
      :class="[showMenu ? 'hamburger-open w-[20px]' : 'w-[30px] sm:w-[50px]']"
      id="hamburger-icon"
      href="#"
      class="open-close-btn fixed top-2 left-3 z-[300]"
      @click="$emit('update:showMenu', !showMenu)"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div
      :class="[
        showMenu
          ? 'h-fit sm:h-full sm:w-72 max-w-xs mx-auto py-10 px-4 '
          : 'h-0  sm:w-0 overflow-hidden',
      ]"
      class="bg-[#111827] transition-all z-3 sm:fixed col-span-1 flex flex-col items-center sm:h-full relative"
    >
      <!--Routes -->
    
      <div
        class=" text-left justify-between flex text-blue-600 gap-2 p-2 w-full"
      >
        <router-link to="/" class="flex">
          <icons iconName="home" class="w-5"></icons>
          <div class="inline-block">Home</div></router-link
        >
        |
        <router-link to="/Bookmarks" class="flex">
          <icons iconName="bookmark" class="w-5 inline-block"></icons>
          <div class="inline-block">Bookmarks</div></router-link
        >
      </div>

      <div v-if="route.name == 'bookmarks'">
        <searchBar
          class="max-w-xs sm:max-w-full w-full"
          v-model:value="searchText"
        />
      </div>
      <!-- Show filters only on home page -->
      <div v-if="route.name == 'home'" class="sm:w-full">
        <searchBar
          class="max-w-xs sm:max-w-full w-full mb-8 mt-8"
          v-model:value="searchText"
        />
        <!-- Genres Filter -->

        <GenresFilter />

        <!-- Rating Filter -->

        <RatingFilter />

        <!-- Languages List -->
        <LanguageFilter />

        <!-- Apply changes -->

        <button
          @click="applyFilters"
          class="w-full mt-8 rounded-md py-2 font-mono select-none bg-[#324773] hover:bg-[#25365a] text-slate-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>
<style >
.open-close-btn {
  text-decoration: none;
  z-index: 10;
}

/* Hamburger Icon */
#hamburger-icon {
  display: inline-block;

  height: 30px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

#hamburger-icon span {
  display: inline-block;
  position: absolute;
  height: 7px;
  width: 100%;
  background: #eab308;
  border-radius: 3px;
  opacity: 1;
  left: 0;
  margin-top: 6px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

/* Hamburger Lines  */

#hamburger-icon span:nth-child(1) {
  top: 0px;
}

#hamburger-icon span:nth-child(2),
#hamburger-icon span:nth-child(3) {
  top: 13px;
}

#hamburger-icon span:nth-child(4) {
  top: 26px;
}

#hamburger-icon.hamburger-open span {
  background: #eab308;
  /* margin-left: 2%; */
}

#hamburger-icon.hamburger-open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#hamburger-icon.hamburger-open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#hamburger-icon.hamburger-open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#hamburger-icon.hamburger-open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

/* we will explain what these classes do next! */

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

a.router-link-active {
  @apply text-yellow-300;
}

#menu[open] {
  display: block;
}
#menu {
  display: none;
}
</style>


