<template>
  <div class="data-screen">
    <div class="regions-container">
      <Regions />
    </div>
    <div class="scatter-container">
      <Scatter />
    </div>
    <div class="china-container">
      <China />
    </div>
    <div class="line-chart-container">
      <LineChart />
    </div>
    <div class="rose-container">
      <Rose />
    </div>
  </div>
</template>
<script setup lang="ts">
import Regions from "@/views/datascreen/components/Regions.vue"
import Scatter from "@/views/datascreen/components/Scatter.vue"
import China from "@/views/datascreen/components/China.vue"
import LineChart from "@/views/datascreen/components/LineChart.vue"
import Rose from "@/views/datascreen/components/Rose.vue"
</script>
<style scoped lang="scss">
.data-screen {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/data.png") no-repeat center center / cover;
  position: relative;

  .regions-container {
    // background-color: rgba(250, 235, 215, 0.9);
    position: absolute;
    width: 300px;
    height: 300px;
    top: 30px;
    left: 2%;
    border-radius: 8px;
    padding: 10px;
  }

  .scatter-container {
    // background-color: rgba(250, 235, 215, 0.9);
    position: absolute;
    width: 300px;
    height: 250px;
    top: 30px;
    right: 2%;
    border-radius: 8px;
    padding: 10px;
  }

  .china-container {
    // background-color: rgba(250, 235, 215, 0.9);
    position: absolute;
    width: 700px;
    height: 500px;
    top: 20%;
    left: 17%;
    // transform: translateX(-50%);
    border-radius: 8px;
    padding: 15px;
  }

  .line-chart-container {
    // background-color: rgba(250, 235, 215, 0.9);
    position: absolute;
    width: 350px;
    height: 280px;
    top: 33%;
    left: 2%;
    border-radius: 8px;
    padding: 10px;
  }

  .rose-container {
    // background-color: rgba(250, 235, 215, 0.9);
    position: absolute;
    width: 400px;
    height: 350px;
    top: 350px;
    right: 2%;
    border-radius: 8px;
    padding: 10px;
  }
}
</style>
