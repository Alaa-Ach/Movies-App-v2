<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import icons from "./icons.vue";
import { useRequestsStore } from "../stores/requests";

const store = useRequestsStore();

const { searchFilter, genresList } = storeToRefs(store);
const showGenres = ref(false);

onMounted(async () => {
  store.getGenres();
});
</script>

<template>
  <div class="max-w-xs sm:max-w-full w-full transition-all my-3 text-white">
    <p class="font-bold">Genre(s) :</p>
    <div class="relative mt-2">
      <!-- Genre Div -->
      <div
        class="bg-[#374151] w-full h-12 rounded-lg flex items-center relative"
      >
        <div
          class="flex flex-grow overflow-hidden cursor-pointer"
          @click="showGenres = !showGenres"
        >
          <!-- left icon -->
          <div class="flex shrink-0 justify-center items-center h-full w-12">
            <icons iconName="filter" />
          </div>
          <div class="grow overflow-hidden flex items-center">
            <!-- Selected Genres -->
            <div class="h-5 cursor-pointer flex-shrink overflow-hidden w-full">
              <p class="truncate cursor-pointer">
                <span v-if="searchFilter.genres.length == 0"
                  >No Genre choosed</span
                >
                <span v-else>{{
                  searchFilter.genres.map((e) => e.name).toString()
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- right Icon empty Genres -->
        <div
          class="flex self-end shrink-0 justify-center items-center h-full w-12"
        >
          <icons
            class="fill-red-500 hover:fill-red-600 cursor-pointer w-8"
            iconName="x"
            @reset="($event) => (searchFilter.genres = [])"
          />
        </div>
      </div>
      <!-- Drop Down  All Genres -->
      <div
        :class="{ 'fadeOut hidden': !showGenres, fadeIn: showGenres }"
        class="absolute z-50 mt-3 w-full left-6 text-slate-50 font-mono rounded bg-[#585e6a] p-2 gap-2 flex flex-wrap"
      >
        <!-- Genre Element -->
        <div
          class="flex cursor-pointer bg-[#7e889a] p-1 rounded-md"
          @click="store.selectGenre(genre)"
          v-for="genre in genresList"
          :key="genre.id"
        >
          <input
            class="rounded-full outline-none border"
            type="checkbox"
            :checked="searchFilter.genres.includes(genre)"
          />
          <div>{{ genre.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.fadeOut {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  0% {
    display: none;
    @apply opacity-0;
    transform: translate3d(-50px, 0, 0); /* ADDED - start x position as -50px */
  }
  100% {
    display: block;
    @apply opacity-100;
    transform: translate3d(0, 0, 0); /* ADDED - move x to 0 on hover */
  }
}
@keyframes fadeOut {
  0% {
    display: block;
    @apply opacity-100;
    transform: translate3d(0, 0, 0); /* ADDED - move x to 0 on hover */
  }
  80% {
    transform: translate3d(-50px, 0, 0);
  }
  100% {
    display: none;
  }
}
</style>