<template>
  <svg :width="width" :height="height" :fill="fillcolor">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "",
  },
  fillcolor: {
    type: String,
    default: "currentColor",
  },
  width: {
    type: String,
    default: "24px",
  },
  height: {
    type: String,
    default: "24px",
  },
})
</script>
