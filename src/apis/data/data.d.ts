// 地区销售数据大屏数据
export interface RegionQuarterly {
  title: string
  regions: string[]
  quarters: string[]
  series: Array<{
    name: string
    type: string
    data: number[]
    stack?: string
  }>
  titalRevenue: number
  yoyGrowth: string
}
// 基础散点图数据格式
export interface ScatterChartData {
  title: string
  xAxisName: string
  yAxisName: string
  legend?: string[]
  series: Array<{
    name: string
    type: string
    data: number[][]
    symbolSize?: string | ((val: number[]) => number)
  }>
}
