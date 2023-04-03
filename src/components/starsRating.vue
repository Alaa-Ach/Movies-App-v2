<script setup>
const props = defineProps({
  review: Object,
});

function starsFill(rating, index) {
  // rating bigger than stars index
  if (rating >= index) return 1;
  // rating with pourcentage
  else if (0 < index - rating && index - rating < 1) return index - rating;
  return 0;
}
</script>

<template>
  <div class="flex">
    <template v-for="i in 5" :key="i">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-7 w-7 stroke-none"
      >
        <defs>
          <linearGradient :id="`grad${review.id}${i}`">
            <stop
              :offset="starsFill(review.author_details.rating / 2, i)"
              stop-color="yellow"
            />
            <stop
              :offset="starsFill(review.author_details.rating / 2, i)"
              stop-color="grey"
            />
          </linearGradient>
        </defs>
        <path
          :fill="`url(#grad${review.id}${i})`"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </template>
  </div>
</template>
