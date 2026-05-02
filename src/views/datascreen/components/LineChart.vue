<template>
  <div class="line-chart-container" ref="chartContainer"></div>
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
      text: "用户数量与订单量变化图",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["用户数量", "订单量"],
      // 图例字体大小
      textStyle: {
        fontSize: 12,
      },
      // 图例项间距
      itemGap: 10,
    },
    // 工具箱：是否显示保存为图片按钮
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "2023-01-01",
          "2023-01-02",
          "2023-01-03",
          "2023-01-04",
          "2023-01-05",
          "2023-01-06",
          "2023-01-07",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "用户数量",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        color: "#006cff",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "订单量",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        color: "#1d9dff",
        data: [220, 182, 191, 234, 290, 330, 310],
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
.line-chart-container {
  width: 100%;
  height: 100%;
}
</style>
