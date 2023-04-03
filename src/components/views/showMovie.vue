<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRequestsStore } from "../../stores/requests";
import { useMovieStore } from "../../stores/movieStore";
import icons from "../icons.vue";
import starsRating from "../starsRating.vue";
import showMoreLess from "../showMoreLess.vue";
import Icons from "../icons.vue";
import { computed } from "@vue/reactivity";
const store = useRequestsStore();
const movieStore = useMovieStore();
const { getImage, inializebookmarkList, bookmarkClicked } = store;
const { bookmarkList } = storeToRefs(store);
const { getMovieByid, getTrailer, getCasts, getReviews } = movieStore;
const route = useRoute();
const movieResp = ref(null);
const trailerUrl = ref(null);
const showAllCasts = ref(false);
const currentPage = ref(1);
var Casts = ref([]);
var Director = ref(null);
var Reviews = ref(null);

function onPagechanged(v) {
  currentPage.value = v;
  // getReviews(id, v).then((rep) => (Reviews.value = rep.results));
}
function getAvatarImage(url) {
  // Picture not found or Picture path
  if (url == null || !url.includes("http")) return getImage(url);
  //full path picture
  return url.slice(1);
}
function convertTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}H ${minutes}M`;
}

onMounted(async () => {
  inializebookmarkList();
  const id = route.params.id;
  trailerUrl.value = await getTrailer(id);
  ({ Casts, Director } = await getCasts(id));
  Reviews.value = await getReviews(id);
  movieResp.value = await getMovieByid(id);
});
</script>
<template>
  <div class="grow" v-if="movieResp">
    <!-- backdrop -->
    <div class="inset-0 relative">
      <div class="">
        <img
          class="object-cover sm:w-full sm:object-cover"
          :src="getImage(movieResp.backdrop_path)"
          alt=""
          srcset=""
        />
        <div
          class="bg-gradient-to-b from-transparent via-[#354c80] to-[#354c80] w-full h-72 -bottom-32 absolute"
        ></div>
      </div>
      <!-- backdrop opacity -->
      <div class="fixed opacity-50 inset-0 bg-slate-800 w-full h-full"></div>

      <!-- Infos -->
      <div class="absolute top-24 md:top-60 z-2 sm:mx-24 text-white p-5">
        <!-- Title -->
        <p class="font-extrabold font-mono text-6xl">
          {{ movieResp.original_title }}
        </p>
        <!-- Second line -->
        <div class="flex items-center gap-2">
          <!-- Stars -->
          <div class="flex items-center font-semibold text-lg">
            <Icons
              iconName="star"
              class="stroke-amber-400 border-transparent stroke-2/3 inline-block mr-1"
            ></Icons>

            {{ movieResp.vote_average }}
          </div>
          <!-- Infos -->
          <div class="ml-5 flex justify-between gap-3">
            <!-- Time -->
            <div>
              <Icons
                iconName="time"
                class="stroke-amber-400 border-transparent stroke-2/3 inline-block mr-1"
              ></Icons>
              {{ convertTime(movieResp.runtime) }}
            </div>

            <!-- Categories -->
            <div>
              <Icons
                iconName="tag"
                class="stroke-amber-400 border-transparent stroke-2/3 inline-block mr-1"
              ></Icons>
              {{ movieResp.genres.map((e) => e.name).toString() }}
            </div>
          </div>
        </div>

        <!-- Third line -->
        <div class="flex gap-2 px-2 py-2 font-mono text-lg">
          <div>
            {{ movieResp.status }}
          </div>

          <icons iconName="vertical-ellipsis"></icons>
          <div>
            <Icons
              iconName="calendar"
              class="stroke-amber-400 fill-amber-400 border-transparent stroke-2/3 inline-block mr-1"
            ></Icons>
            {{ movieResp.release_date }}
          </div>
        </div>

        <!-- Overview -->

        <p class="font-sans tracking-wide leading-relaxed indent-5 my-3">
          {{ movieResp.overview }}
        </p>

        <!-- Third Line Buttons -->

        <div class="py-5 flex gap-5">
          <!-- Watch Trailer -->
          <a
            :href="trailerUrl"
            target="_blank"
            :class="[
              trailerUrl
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : ' bg-gray-500 cursor-not-allowed',
            ]"
            class="py-4 px-4 rounded-full text-sm font-bold uppercase font-mono text-black items-center flex gap-1"
          >
            <icons
              iconName="play"
              class="inline-block fill-black stroke-none w-5"
            />
            {{ trailerUrl ? "watch trailer" : "Trailer Not Available" }}
          </a>
          <!-- Add/Remove bookmark -->
          <button
            @click="bookmarkClicked(movieResp.id)"
            class="hover:bg-slate-200 py-4 px-4 rounded-full text-sm font-bold bg-white uppercase font-mono text-black items-center flex gap-1"
          >
            <icons
              :iconName="
                !bookmarkList.includes(movieResp.id) ? 'plus' : 'x-mark'
              "
              class="inline-block fill-black w-5"
            />
            <div>
              {{ bookmarkList.includes(movieResp.id) ? "Remove " : "Add " }}
              List
            </div>
          </button>
        </div>

        <!-- Director -->
        <div class="text-xl py-2">
          <span class="font-semibold font-mono">Directed By : </span>
          <span class="text-lg tracking-wide">{{ Director.name }}</span>
        </div>
        <!-- Casts -->

        <div class="py-2">
          <span class="font-semibold font-mono text-xl">Casts :</span>
          <div class="flex flex-wrap gap-x-5 gap-y-2 py-5 transition-all">
            <div
              v-for="Cast in showAllCasts ? Casts : Casts.slice(0, 10)"
              :key="Cast.id"
              class="w-20 text-center leading-tight transition-all"
            >
              <img
                class="w-20 h-20 rounded-full overflow-hidden object-cover"
                :src="getImage(Cast.profile_path, 'w200')"
                alt=""
                srcset=""
              />
              <div class="break-words">{{ Cast.name }}</div>
            </div>
            <div>
              <div
                @click="showAllCasts = !showAllCasts"
                class="h-20 w-20 bg-slate-900 rounded-full cursor-pointer flex flex-col items-center justify-center"
              >
                <icons :iconName="showAllCasts ? 'minus' : 'plus'" class="" />
                <div class="text-sm mx-2 text-center break-words">
                  {{ showAllCasts ? "Show Less" : "Show All" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->

        <div class="py-2">
          <div class="text-xl font-bold font-mono">Reviews :</div>
          <!-- stars -->

          <!-- List Reviews -->
          <vue-awesome-paginate
            :total-items="Reviews.total_results"
            :items-per-page="4"
            :max-pages-shown="5"
            v-model="currentPage"
            :on-click="onPagechanged"
            :show-jump-buttons="true"
          />
          <div
            v-if="Reviews != null"
            class="grid gap-2 lg:grid-cols-2 md:gap-x-5 lg:gap-x-10 md:gap-y-2 justify-center relative"
          >
            <div
              class="select-none shadow-xl shadow-yellow-600/30 text-black my-2 rounded-lg p-3 col-auto relative hover:scale-105 hover:transition-transform bg-[#e29b03]"
              v-for="review in Reviews.results.slice(
                (currentPage - 1) * 4,
                currentPage * 4
              )"
              :key="review.id"
            >
              <div class="flex justify-between">
                <!-- author name & avatar -->
                <div
                  class="tracking-wide capitalize flex items-center gap-2 mb-1 sm:mb-2"
                >
                  <img
                    class="w-8 h-8 rounded-full"
                    :src="getAvatarImage(review.author_details.avatar_path)"
                    alt=""
                    srcset=""
                  />
                  <span class="tracking-wide font-mono">
                    {{ review.author }}
                  </span>
                </div>
                <!-- starts rating -->
                <starsRating :review="review"> </starsRating>
              </div>

              <!-- content -->
              <show-more-less :text="review.content"></show-more-less>
              <!-- Date -->
              <div
                class="self-end text-sm text-slate-600 opacity-80 text-right"
              >
                {{
                  `${new Date(review.updated_at).toDateString()} ${new Date(
                    review.updated_at
                  ).getHours()}H:${new Date(review.updated_at).getMinutes()}M`
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- {{ movieResp }} -->
  </div>
  <div v-else-if="movieResp == 'error'">Error</div>
  <div v-else>Loading..</div>
</template>


<style>
.pagination-container {
  @apply flex gap-1 justify-center  w-full;
}
.paginate-buttons {
  @apply h-10 w-10 rounded-full cursor-pointer bg-[#f2f2f2] border-[#d9d9d9] text-black hover:bg-[#d8d8d8];
}

.active-page {
  @apply bg-[#374151] border-[#374151] text-white hover:bg-[#111827];
}
</style>