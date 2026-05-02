import http from "@/util/http"
import type { RegionQuarterly, ScatterChartData } from "./data.d"
const API = {
  // 获取地区销售数据大屏数据
  getRegionQuarterly: "/sales/region-quarterly",
  // 获取散点图数据
  getScatterChart: "/chart/scatter",
}
export const getRegionQuarterlyApi = () => {
  return http<{ code: number; message: string; data: RegionQuarterly }>({
    url: API.getRegionQuarterly,
    method: "get",
  })
}
// 获取散点图数据
export const getScatterChartApi = () => {
  return http<{ code: number; message: string; data: ScatterChartData }>({
    url: API.getScatterChart,
    method: "get",
  })
}
