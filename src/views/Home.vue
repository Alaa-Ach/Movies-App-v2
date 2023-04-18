<script setup>
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, onUpdated, ref, watch } from "vue";
import { useRequestsStore } from "../stores/requests";
import MovieSlider from "../components/MovieSlider.vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import showMovies from "../components/showMovies.vue";
const store = useRequestsStore();
const { MoviesList, bookmarkList, searchText, currentPage } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  currentPage.value = 1;
  store.inializebookmarkList();
  searchText.value = route.query.search ?? "";
  store.getMovies();
});

const onPagechanged = (x) => {
  // currentPage.value = 1;
  store.getMovies(x);
};
</script>

<template>
  <!-- Top rated movie -->
  <movie-slider></movie-slider>
  <show-movies
    class="mt-1"
    @pagechanged="onPagechanged"
    :movie-list="MoviesList"
  ></show-movies>
</template>
