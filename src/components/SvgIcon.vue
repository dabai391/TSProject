<template>
  <div>
    <svg :width="width" :height="height">
      <use :xlink:href="`icon-${name}`" :fill="fillcolor" />
    </svg>
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "",
  },
  fillcolor: {
    type: String,
    default: "",
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
