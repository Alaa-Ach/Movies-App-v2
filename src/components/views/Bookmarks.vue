<script setup>
import { useRequestsStore } from "../../stores/requests";
import showMovies from "../showMovies.vue";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
const store = useRequestsStore();
// store.bookmarkMoviesList
const { bookmarkMoviesList, currentPage, searchText } = storeToRefs(store);
onMounted(() => {
  currentPage.value = 1;
  store.inializebookmarkMovies();
});
//computed for search to filter by search to use with count result
let bookmarkMoviesListComp = computed(() =>
  bookmarkMoviesList.value.results.filter((x) =>
    x.original_title.toLowerCase().includes(searchText.value.toLowerCase())
  )
);
// computed for slice by changing depending on current page
let sliced = computed(() =>
  bookmarkMoviesListComp.value.slice(
    (currentPage.value - 1) * 20,
    currentPage.value * 20
  )
);

function onPagechanged(params) {
  //   alert(currentPage);
  //   currentPage = params;
}
</script>
<template>
  <div v-if="bookmarkMoviesList.results != undefined">
    <show-movies
      @pagechanged="null"
      :movie-list="bookmarkMoviesList"
      :total_pages="bookmarkMoviesListComp.length"
      :results="sliced"
    ></show-movies>
  </div>
</template>


