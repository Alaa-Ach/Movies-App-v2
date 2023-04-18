<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import icons from "./icons.vue";
import { useRequestsStore } from "../stores/requests";
import MovieCard from "./Movie/MovieCard.vue";
import MovieSlider from "./MovieSlider.vue";
const store = useRequestsStore();
const { bookmarkList, currentPage, searchText, TopratedMovies } = storeToRefs(store);
const props = defineProps({
  movieList: Object,
  results: Array,
  total_pages: Number,
});

const emit = defineEmits("pagechanged");
function onPagechanged(x) {
  emit("pagechanged", x);
  console.log(props.results);
}
</script>

<template>
  <div class="py-2">
    <!-- search -->
    <div
      v-if="searchText != ''"
      class="ml-12 mt-10 font-mono text-lg sm:text-2xl font-extrabold"
    >
      <span class="text-yellow-500"> Search For : </span>
      <span class="text-white">
        {{ searchText }}
      </span>
    </div>

    <div class="" v-if="movieList">
      <template v-if="movieList.results.length > 0">
        <div
          v-if="$route.name == 'home' && searchText == ''"
          class="mx-12 w-fit font-mono text-yellow-500 text-2xl font-extrabold"
        >
          {{
            searchText == "" && TopratedMovies
              ? "Latest Movies"
              : !TopratedMovies
              ? "Search By Filter :"
              : ""
          }}
        </div>
        <vue-awesome-paginate
          :total-items="total_pages ?? movieList.total_results"
          :items-per-page="20"
          :max-pages-shown="5"
          v-model="currentPage"
          :on-click="onPagechanged"
          :show-jump-buttons="true"
        />

        <div class="flex flex-wrap space-x-3 justify-center py-4 relative z-50 gap-2">
          <template v-if="movieList != null || results != null">
            <div v-for="movie in results ?? movieList.results" :key="movie.id" class="">
              <!-- Movie Card -->
              <movie-card
                :movie="movie"
                :isBookmarked="bookmarkList.includes(movie.id)"
              ></movie-card>
            </div>
          </template>
        </div>
        <vue-awesome-paginate
          :total-items="total_pages ?? movieList.total_results"
          :items-per-page="20"
          :max-pages-shown="5"
          v-model="currentPage"
          :on-click="onPagechanged"
          :show-jump-buttons="true"
        />
      </template>

      <div class="ml-12 text-slate-100 text-xl sm:text-5xl text-center" v-else>
        <icons iconName="loop" class="w-24 sm:w-56 mx-auto" />

        No Results Found !
      </div>
    </div>
  </div>
</template>

<style>
@import "vue-awesome-paginate/dist/style.css";
.pagination-container {
  @apply flex gap-1 justify-center  w-full;
}
.paginate-buttons {
  @apply h-6 w-6 sm:h-10 sm:w-10 rounded-lg cursor-pointer bg-[#f2f2f2] border-[#d9d9d9] text-black hover:bg-[#d8d8d8];
}

.active-page {
  @apply bg-[#374151] border-[#374151] text-white hover:bg-[#111827];
}
</style>
