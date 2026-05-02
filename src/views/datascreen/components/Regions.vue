<template>
  <div class="regions" ref="regionRef"></div>
</template>

<script setup lang="ts">
import { getRegionQuarterlyApi } from "@/apis/data/data.ts"
// import type { RegionQuarterly } from "@/apis/data/data.d"
import * as echarts from "echarts"
import { onMounted, ref, nextTick, onBeforeUnmount } from "vue"
interface SeriesItem {
  name: string
  type: string
  data: number[]
  stack?: string
}

const regionRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null

// ✅ 获取数据并初始化图表
const fetchDataAndInitChart = async () => {
  const res = await getRegionQuarterlyApi()
  const payload = res.data
  if (!payload) {
    return
  }

  const title = payload.title
  const regions = payload.regions
  const series = payload.series as SeriesItem[]

  //等待 DOM 渲染完成
  await nextTick()

  if (!regionRef.value) {
    console.error("regionRef 为空")
    return
  }
  // ✅ 添加这三行调试
  const rect = regionRef.value.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) {
    console.error("容器尺寸为 0，ECharts 无法初始化")
    return
  }

  // 初始化或获取已有实例
  if (!myChart) {
    myChart = echarts.init(regionRef.value)
  }

  // 配置图表选项
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    title: {
      text: title || "季度销售数据",
      left: "center",
      textStyle: {
        color: "#000",
        fontSize: 14,
      },
    },
    legend: {
      data: series.map((s: SeriesItem) => s.name),
      top: 30,
      textStyle: {
        color: "#000",
      },
    },
    grid: {
      left: "0%",
      right: "0%",
      top: 100,
      bottom: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: regions,
      axisLabel: {
        color: "#000",
      },
    },
    yAxis: {
      type: "value",
      name: "销售额（万元）",
      axisLabel: {
        color: "#000",
      },
    },
    series: series.map((s: SeriesItem) => {
      // ✅ 解构出 stack，但不使用它
      return {
        ...s,
        label: {
          show: true,
          position: "top",
          color: "#000",
        },
      }
    }) as echarts.SeriesOption[],
  }

  myChart.setOption(option)
}

// 响应窗口大小变化
const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  fetchDataAndInitChart()
  window.addEventListener("resize", handleResize)
})

// 组件卸载时清理
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  myChart?.dispose()
  myChart = null
})
</script>
<style scoped lang="scss">
.regions {
  width: 100%;
  height: 100%;
}
</style>
