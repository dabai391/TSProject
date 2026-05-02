<template>
  <div class="scatter-container" ref="scatterContainer"></div>
</template>

<script setup lang="ts">
import { getScatterChartApi } from "@/apis/data/data"
import { onMounted, onBeforeUnmount, ref } from "vue"
import * as echarts from "echarts"

const scatterContainer = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null

interface SeriesData {
  name: string
  type: string
  data: number[][]
  symbolSize?: string
}

const initChart = async () => {
  const res = await getScatterChartApi()
  const payload = res.data
  if (!payload) return
  const title = payload.title
  const xAxisName = payload.xAxisName
  const yAxisName = payload.yAxisName
  const series = payload.series as SeriesData[]

  if (!scatterContainer.value) return

  if (myChart) {
    myChart.dispose()
  }
  myChart = echarts.init(scatterContainer.value)

  const option: echarts.EChartsOption = {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "item",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const data = params.data as number[]
        return `${params.seriesName}<br/>
                ${xAxisName}：${data[0]}<br/>
                ${yAxisName}：${data[1]}`
      },
    },
    legend: {
      data: series.map((s) => s.name),
      bottom: 10,
    },
    grid: {
      left: "10%",
      right: "8%",
      top: 80,
      bottom: 25,
      containLabel: true,
    },
    xAxis: {
      name: xAxisName,
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      name: yAxisName,
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: series.map((s) => ({
      name: s.name,
      type: "scatter",
      data: s.data,
      emphasis: {
        focus: "series",
      },
    })) as echarts.SeriesOption[],
  }

  myChart.setOption(option)
}

// 窗口大小变化时重绘
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
.scatter-container {
  width: 100%;
  height: 100%;
}
</style>
