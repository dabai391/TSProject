<template>
  <div class="rose-chart" ref="chartContainer"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import * as echarts from "echarts"

const chartContainer = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartContainer.value) {
    return
  }

  myChart = echarts.init(chartContainer.value)

  const option: echarts.EChartsOption = {
    title: {
      text: "地区分布图",
      left: "center",
      top: "0%",
      textStyle: {
        color: "#000",
        fontSize: 14,
      },
    },
    color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
    legend: {
      top: "7%",
      textStyle: {
        color: "#000",
        fontSize: 11,
      },
    },
    series: [
      {
        name: "面积模式",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "55%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          show: true,
          fontSize: 10,
          color: "#000",
          formatter: "{b}: {c}",
        },
        labelLine: {
          length: 6,
          length2: 8,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: "bold",
            color: "#000",
          },
        },
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" },
        ],
      },
    ],
  }

  myChart.setOption(option)
}

const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  myChart?.dispose()
  myChart = null
})
</script>
<style scoped lang="scss">
.rose-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
