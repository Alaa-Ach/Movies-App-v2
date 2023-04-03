<script  setup>
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, onUpdated, ref, watch } from "vue";
import { useRequestsStore } from "../../stores/requests";
import MovieCard from "./../Movie/MovieCard.vue";
import MovieSlider from "../MovieSlider.vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import showMovies from "../showMovies.vue";
const store = useRequestsStore();
const { LatestMovies, bookmarkList, searchText, currentPage } =
  storeToRefs(store);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  currentPage.value = 1;
  store.getLatestMovies();
  store.inializebookmarkList();
  searchText.value = route.query.search ?? "";
});

const onPagechanged = (x) => {
  // currentPage.value = 1;
  store.getLatestMovies(x);
  console.log(x);
};
</script>

<template>
  <!-- Top rated movie -->
  <movie-slider></movie-slider>
  <show-movies
    class="mt-1"
    @pagechanged="onPagechanged"
    :movie-list="LatestMovies"
  ></show-movies>
</template>
