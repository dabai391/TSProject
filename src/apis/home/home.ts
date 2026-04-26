import http from "@/util/http"

export interface DashboardData {
  stats: {
    todayOrderCount: number // 今日订单数
    todayRevenue: number // 今日订单金额
    todayOnlineDriver: number // 今日在线司机数
    todayOnlineVehicle: number // 今日在线车辆数
    todayAbnormalOrder: number // 今日异常订单数
  }
  trend: {
    weekly: {
      orderGrowth: string
      revenueGrowth: string
      capacityRate: string
      pendingCount: number
    }
    monthly: {
      orderGrowth: string
      revenueGrowth: string
      capacityRate: string
      pendingCount: number
    }
    periodStats: {
      completedOrders: number
      totalRevenue: number
      onlineDriverVehicle: string
      abnormalRiskOrder: number
    }
  }
  chartData: {
    businessTrend: Array<{
      day: string
      weekday: string
      completedOrders: number
      revenue: number
    }>
    emergency: {
      active: Array<{
        id: string
        passengerName: string
        title: string
        orderId: string
        location: string
        status: string
        timestamp: string
        level: string
      }>
      historyCount: number
    }
  }
}

// 获取运营工作台全部数据
export const getDashboardDataApi = () => {
  return http({
    url: "/dashboard/overview",
    method: "GET",
  })
}
