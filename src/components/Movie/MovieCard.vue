<script setup>
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, ref } from "vue";
import { useRequestsStore } from "../../stores/requests";
import icons from "../icons.vue";
import VLazyImage from "v-lazy-image";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useRequestsStore();
const props = defineProps({
  movie: Object,
  isBookmarked: Boolean,
});
const $cookies = inject("$cookies");
const loadingImg = ref(true);
function showMovieDetails() {
  router.push({ name: "showMovie", params: { id: props.movie.id } });
}
// const bookmarkList = ref([]);
</script>
<template>
  <!-- <router-link :to="{ name: 'showMovie', params: { id: movie.id } }"> -->
  <div
    class="w-48 sm:w-56 overflow-hidden text-black rounded-lg relative hover:z-50 hover:text-white hover:scale-105 hover:bg-blue-900 hover:shadow-lg transition-all delay-75 cursor-pointer"
    @click="showMovieDetails"
  >
    <!-- Bookmark button -->
    <div
      class="text-black absolute cursor-pointer top-2 right-2 z-50"
      @click.stop="store.bookmarkClicked(movie.id)"
    >
      <icons
        iconName="bookmark"
        class="w-7 h-7 hover:scale-110 transition-all duration-150 ease-linear"
        :class="[
          isBookmarked
            ? 'fill-red-600 hover:slate-600'
            : 'fill-white hover:fill-red-400',
        ]"
      ></icons>
    </div>
    <div
      :class="$attrs.class"
      class="w-48 sm:w-56 sm:h-[332px] flex justify-center items-center overflow-hidden"
    >
      <!-- <img src="../../assets/not-found.png" alt="" /> -->
      <v-lazy-image
        :src="store.getImage(movie.poster_path, 'w300')"
        :src-placeholder="store.getImage(movie.poster_path, 'w200')"
      />
      <!-- 
        <icons
          v-if="loadingImg"
          iconName="loading-spinner"
          class="absolute mx-auto"
        ></icons>
        <img
          class="w-56"
          :src="store.getImage(movie.poster_path)"
          alt=""
          srcset=""
          @load="loadingImg = false"
        /> -->
    </div>
    <!-- Title -->
    <div class="font-mono text-center cursor-pointer leading-9 w-48 sm:w-56">
      <div class="break-words">
        {{ movie.original_title }}
      </div>
      <div>
        {{ movie.release_date.split("-")[0] }}
      </div>
    </div>
  </div>
  <!-- </router-link> -->
</template>
