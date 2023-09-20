<script setup>
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, ref } from "vue";
import { useRequestsStore } from "../../stores/requests";
import icons from "../icons.vue";
import VLazyImage from "v-lazy-image";
import { useRouter } from "vue-router";
const rr = "fdfddd";
const router = useRouter();
const store = useRequestsStore();
const props = defineProps({
  movie: Object,
  isBookmarked: Boolean,
});
const $cookies = inject("$cookies");
function convertTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}H ${minutes}M`;
}
const loadingImg = ref(true);
function showMovieDetails() {
  router.push({ name: "showMovie", params: { id: props.movie.id } });
}
// const bookmarkList = ref([]);
</script>
<template>
  <!-- <router-link :to="{ name: 'showMovie', params: { id: movie.id } }"> -->
  <div
    class="w-48 sm:w-56 overflow-hidden text-black rounded-sm relative hover:z-50 hover:scale-105 bg-yellow-600 hover:shadow-lg transition-all delay-75 cursor-pointer"
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
      <v-lazy-image
        :src="store.getImage(movie.poster_path, 'w300')"
        :src-placeholder="store.getImage(movie.poster_path, 'w200')"
      />
    </div>
    <!-- Title -->
    <div
      class="text-left cursor-pointer w-48 sm:w-56 p-2 break-words relative flex flex-col justify-between"
    >
      <div class="font-bold no-breaks">
        {{ movie.original_title }}
        <span class="text-sm font-semibold text-slate-800 self-end">
          ({{ movie.release_date.split("-")[0] }})
        </span>
      </div>
    </div>
  </div>
  <!-- </router-link> -->
</template>
