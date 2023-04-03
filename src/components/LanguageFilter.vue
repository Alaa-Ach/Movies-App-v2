<script setup>
import icons from "./icons.vue";
import searchBar from "./searchBar.vue";
import GenresFilter from "./GenresFilter.vue";
import RatingFilter from "./RatingFilter.vue";
import { useRequestsStore } from "../stores/requests";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Icons from "./icons.vue";

let store = useRequestsStore();
let { searchFilter, searchText, LanguagesList } = storeToRefs(store);
let showLang = ref(false);
let inputLang = ref("");
function test() {
  showLang = !showLang;

  inputLang =
    Object.keys(searchFilter.language).length != 0
      ? searchFilter.language.english_name
      : "";
}

onMounted(async () => {
  await store.getLanguages();
  searchFilter.value.language = LanguagesList.value.find(
    (e) => e.iso_639_1 == "xx"
  );
});
let comp = computed(() =>
  LanguagesList.value.filter((x) =>
    x.english_name.toLowerCase().startsWith(inputLang.value.toLowerCase())
  )
);
</script>

<template>
  <div
    class="relative max-w-xs sm:max-w-full w-full transition-all mt-3 text-white"
  >
    <p class="font-bold">Language :</p>
    <div>
      <!-- Languages Div -->
      <div class="relative mt-2">
        <div
          @click="
            showLang = !showLang;
            inputLang =
              searchFilter.language.iso_639_1 == 'xx'
                ? ''
                : searchFilter.language.english_name;
          "
          class="relative cursor-pointer flex items-center w-full h-12 max-w-xs sm:max-w-full rounded-lg focus-within:shadow-lg bg-[#374151] overflow-hidden transition-all"
        >
          <!-- language icon -->
          <div
            class="grid place-items-center h-full w-12 text-gray-300 shrink-0"
          >
            <Icons iconName="language"></Icons>
          </div>
          <!-- Selected Language -->
          <div
            class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <div class="text-ellipsis overflow-hidden">
              {{ searchFilter.language.english_name }}
            </div>
          </div>

          <!-- down arrow icon -->
          <div
            class="grid place-items-center h-full w-12 text-gray-300 shrink-0"
          >
            <Icons
              iconName="down-arrow"
              class="w-8 transition-all delay-100"
              :class="{ 'rotate-180': showLang }"
            ></Icons>
          </div>
        </div>
      </div>
      <!-- show list -->
      <div
        v-show="showLang"
        class="z-[51] absolute overflow-auto abs ml-2 mt-1 divide-y-2 text-white bg-slate-500 max-h-56 rounded-sm w-full"
      >
        <!-- input field -->
        <div class="flex bg-slate-400">
          <input
            placeholder="Search for language"
            v-model="inputLang"
            type="text"
            class="placeholder-slate-50 my-1 h-7 p-2 w-full outline-none bg-transparent"
          />
          <!-- delete icon -->
          <icons
            class="fill-red-500 hover:fill-red-600 cursor-pointer w-8"
            iconName="x"
            @reset="
              showLang = flase;
              searchFilter.language = LanguagesList.find(
                (e) => e.iso_639_1 == 'xx'
              );
              inputLang = '';
            "
          ></icons>
        </div>
        <!-- language options -->

        <div
          @click="
            searchFilter.language = lang;
            inputLang = lang.english_name;
            showLang = false;
          "
          class="p-2 hover:bg-slate-600 cursor-pointer"
          v-for="lang in comp"
          :key="lang.id"
        >
          {{ lang.english_name }}
        </div>
      </div>
    </div>
  </div>
</template>