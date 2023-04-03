<script setup>
import { ref } from "vue";

const props = defineProps({
  text: String,
});
const showAll = ref(false);
</script>
<template>
  <div class="">
    <span
      class="text-slate-800 overflow-hidden"
      v-html="showAll ? text : text.slice(0, 200)"
    >
    </span
    ><span
      v-if="text.length >= 200"
      class="cursor-pointer underline"
      @click="showAll = !showAll"
      >show {{ !showAll ? " more" : " less" }}</span
    >
  </div>
</template>