<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import icons from "./icons.vue";
import { useRequestsStore } from "../stores/requests";

const store = useRequestsStore();

const { searchFilter, genresList } = storeToRefs(store);
</script>

<template>
  <div class="max-w-xs sm:max-w-full w-full transition-all my-3 text-white">
    <p class="font-bold">Rating :</p>
    <div class="relative mt-2">
      <!-- Rating Div -->
      <div
        class="bg-[#374151] w-full h-12 rounded-lg flex items-center relative"
      >
        <div
          class="cursor-pointer flex items-center flex-grow"
          @click="showGenres = !showGenres"
        >
          <!-- icon -->
          <div class="flex justify-center shrink-0 items-center h-full w-12">
            <icons iconName="star" class="fill-white" />
          </div>
          <!-- Selected Rating -->
          <div class="h-5 cursor-pointer grow flex items-center justify-center">
            <!-- input rating -->
            <icons
              v-for="x in 5"
              :key="x"
              :class="[
                searchFilter.rating >= x
                  ? 'fill-amber-400'
                  : 'fill-transparent',
              ]"
              iconName="star"
              class="stroke-1 w-8 h-8 sm:w-7 sm:h-7 sm:flex-grow transition-all delay-75"
              @changeRating="searchFilter.rating = x"
            >
            </icons>
          </div>
        </div>
        <!-- Icon empty Genres -->
        <div class="flex justify-center shrink-0 items-center h-full w-12">
          <icons
            class="fill-red-500 hover:fill-red-600 cursor-pointer w-8"
            iconName="x"
            @reset="($event) => (searchFilter.rating = [])"
          />
        </div>
      </div>
    </div>
  </div>
</template>