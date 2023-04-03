<script setup>
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, reactive } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useRequestsStore } from "../stores/requests";
import MovieCard from "./Movie/MovieCard.vue";
const store = useRequestsStore();
const { getTopRatedMovies, inializebookmarkMovies } = store;
const { TopratedMovies, searchText, bookmarkList } = storeToRefs(store);
const settings = reactive({
  itemsToShow: 1.7,
  snapAlign: "center",
});
const breakpoints = reactive({
  // 700px and up
  700: {
    itemsToShow: 2.8,
    snapAlign: "center",
  },
  // 700px and up
  520: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: "center",
  }, // 1024 and up
  1350: {
    itemsToShow: 6,
    snapAlign: "center",
  },
});

onMounted(() => {
  getTopRatedMovies();
  inializebookmarkMovies();
});
</script>

<template>
  <!-- {{ TopratedMovies }} -->
  <div v-if="TopratedMovies" class="mt-16">
    <div class="mx-12 font-mono text-yellow-500 text-2xl font-extrabold">
      Top Rated Movies:
    </div>
    <Carousel
      :settings="settings"
      :breakpoints="breakpoints"
      class=""
      :itemsToShow="6"
      :wrapAround="true"
      :transition="500"
    >
      <Slide v-for="movie in TopratedMovies.results" :key="movie.id">
        <movie-card
          class="relative"
          :movie="movie"
          :isBookmarked="bookmarkList.includes(movie.id)"
        ></movie-card>
        <!-- <div class="carousel__item">{{ slide }}</div> -->
      </Slide>

      <template #addons>
        <Navigation />
        <!-- <Pagination /> -->
      </template>
    </Carousel>
  </div>
</template>
  


<style >
.carousel__item {
  min-height: 200px;
  width: 300px;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__prev,
.carousel__next {
  @apply bg-yellow-500 rounded-full border-0;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  padding: 2em 0;
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>