<template>
  <div class="china-chart" ref="chinaChartRef"></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts"
import ChinaMap from "../json/china.geojson?raw"
import { onMounted, ref, onBeforeUnmount } from "vue"

const chinaChartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (!chinaChartRef.value) {
    return
  }

  try {
    const geoJsonData = JSON.parse(ChinaMap)
    echarts.registerMap("china", geoJsonData)

    if (!myChart) {
      myChart = echarts.init(chinaChartRef.value)
    }

    const option: echarts.EChartsOption = {
      title: {
        text: "中国地图",
        left: "center",
        top: 10,
        textStyle: {
          color: "#000",
          fontSize: 16,
        },
      },
      visualMap: {
        type: "continuous",
        min: 100000,
        max: 15000000,
        inRange: {
          color: ["#e0f3ff", "#74b9ff", "#0984e3", "#0652DD", "#063080"],
        },
        calculable: true,
        text: ["高", "低"],
        textStyle: {
          color: "#000",
          fontSize: 12,
        },
        top: 100,
        left: 500,
      },
      tooltip: {
        trigger: "item",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const value = params.value as number | undefined
          const formattedValue = value?.toLocaleString() || "0"
          return `<strong>${params.name}</strong><br/>用户数量: ${formattedValue} 人`
        },
      },
      series: [
        {
          type: "map",
          map: "china",
          layoutCenter: ["50%", "55%"],
          layoutSize: "110%",
          roam: true,
          // zoomOnMouseWheel 不是 MapSeriesOption 的标准属性，已通过 roam: true 启用缩放功能
          scaleLimit: {
            min: 1,
            max: 3,
          },
          label: {
            show: true,
            color: "#000",
            fontSize: 11,
            fontWeight: "normal",
            align: "center",
            verticalAlign: "middle",
            // hideOverlap 不是 MapSeriesOption 的标准属性，已移除
          },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1.5,
            areaColor: "#4a90d9",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              color: "#fff",
              fontWeight: "bold",
            },
            itemStyle: {
              areaColor: "#2e6db5",
            },
          },
          data: generateUserData(),
        },
      ],
    }
    myChart?.setOption(option)
  } catch (error) {
    console.error("Failed to initialize China map:", error)
  }
}
const generateUserData = () => {
  const provinces = [
    { name: "北京市", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "上海市", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "广东省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "浙江省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "江苏省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "福建省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "安徽省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "江西省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "湖南省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "湖北省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "四川省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "贵州省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "云南省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "重庆市", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "陕西省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "甘肃省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "青海省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "宁夏回族自治区", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "新疆维吾尔自治区", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "西藏自治区", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "内蒙古自治区", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "辽宁省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "吉林省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "黑龙江省", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "海南省", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "台湾省", value: Math.floor(Math.random() * 6000000) + 3000000 },
    { name: "香港特别行政区", value: Math.floor(Math.random() * 15000000) + 8000000 },
    { name: "澳门特别行政区", value: Math.floor(Math.random() * 5000000) + 2000000 },
    { name: "其他", value: Math.floor(Math.random() * 6000000) + 3000000 },
  ]
  return provinces
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
.china-chart {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
