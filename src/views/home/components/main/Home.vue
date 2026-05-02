<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <h1 class="title">运营工作台</h1>
      <div class="tabs">
        <button class="tab active">本周</button>
        <button class="tab">本月</button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-cards">
      <div class="card">
        <div class="card-icon blue">
          <SvgIcon name="cart" width="35px" height="35px" />
          <p class="card-label">本周完成交单量</p>
          <p class="card-value">{{ dashboardData?.stats?.todayOrderCount }}</p>
        </div>
        <div class="card-content">
          <span class="card-trend" style="color: #22c597">{{
            dashboardData?.trend?.weekly?.orderGrowth
          }}</span>
        </div>
      </div>
      <div class="card">
        <div class="card-icon blue">
          <SvgIcon name="dollar" width="35px" height="35px" />
          <p class="card-label">本周营收总额</p>
          <p class="card-value">{{ dashboardData?.stats?.todayRevenue }}</p>
        </div>
        <div class="card-content">
          <span class="card-trend" style="color: #22c597">{{
            dashboardData?.trend?.weekly?.revenueGrowth
          }}</span>
        </div>
      </div>
      <div class="card">
        <div class="card-icon blue">
          <SvgIcon name="car" width="35px" height="35px" />
          <p class="card-label">在线司机/车辆</p>
          <p class="card-value">
            {{ dashboardData?.stats?.todayOnlineDriver }}/
            {{ dashboardData?.stats?.todayOnlineVehicle }}
          </p>
        </div>
        <div class="card-content">
          <span class="card-trend" style="color: #409eff"
            >{{ dashboardData?.trend?.weekly?.capacityRate }}占空</span
          >
        </div>
      </div>
      <div class="card">
        <div class="card-icon blue">
          <SvgIcon name="warning" width="35px" height="35px" />
          <p class="card-label">异常/风险订单</p>
          <p class="card-value">{{ dashboardData?.stats?.todayAbnormalOrder }}</p>
        </div>
        <div class="card-content">
          <span class="card-trend" style="color: #f56c6c">待处理</span>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 业务趋势图表 -->
      <div class="chart-section">
        <h3 class="section-title">业务趋势(营收与完单量)</h3>
        <div ref="chartRef" style="height: 400px"></div>
      </div>

      <!-- 紧急呼救监控 -->
      <div class="sos-section">
        <div class="sos-header">
          <div class="sos-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 9v4M12 17h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h3 class="section-title">紧急呼救监控(SOS)</h3>
        </div>
        <div>
          <div class="sos-card" v-for="item in EmergencyList" :key="item.id">
            <div class="sos-item">
              <div class="sos-info">
                <p class="sos-name">{{ item.passengerName }}</p>
                <span class="sos-status">{{ item.status }}</span>
                <p class="sos-detail">订单: {{ item.orderId }}</p>
                <p class="sos-detail">位置: {{ item.location }}</p>
                <p class="sos-detail">时间: {{ item.timestamp }}</p>
                <p class="sos-detail">等级: {{ item.level }}</p>
              </div>
            </div>
            <div class="sos-actions">
              <button class="action-btn primary">立即接入</button>
              <button class="action-btn secondary">地图定位</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单分布图表 -->
    <div class="order-section">
      <h3 class="order-title">订单分布</h3>
      <div ref="OrderchartRef" style="height: 250px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDashboardDataApi, type DashboardData } from "@/apis/home/home"
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
type EmergencyItem = {
  id: string
  passengerName: string
  status: string
  location: string
  timestamp: string
  orderId: string
  level: string
}
const dashboardData = ref<DashboardData>()
const EmergencyList = ref<EmergencyItem[]>([])
const chartRef = ref<HTMLDivElement>()
const OrderchartRef = ref<HTMLDivElement>()
// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  const myChart = echarts.init(chartRef.value)
  const option: echarts.EChartsOption = {
    color: ["#409eff", "#67c23a"],
    title: {
      text: "业务趋势(营收与完单量)",
      left: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
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
      data: ["完单量", "营收(%)"],
      bottom: 10,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "完单量",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#409eff",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        itemStyle: {
          color: "#409eff",
        },
        data: [1200, 1504, 1009, 1278, 968, 858, 992],
      },
      {
        name: "营收(%)",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#67c23a",
          type: "dashed",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        itemStyle: {
          color: "#67c23a",
        },
        data: [300.2, 405.6, 305.8, 436, 411, 399, 388.6],
      },
    ],
  }
  myChart.setOption(option)

  window.addEventListener("resize", () => {
    myChart.resize()
  })
}
// 初始化订单分布图表
const initOrderChart = () => {
  if (!OrderchartRef.value) return
  const myChart = echarts.init(OrderchartRef.value)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      // left: "",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "已完成订单" },
          { value: 735, name: "进行中订单" },
          { value: 580, name: "待出行订单" },
        ],
      },
    ],
  }
  myChart.setOption(option)
  window.addEventListener("resize", () => {
    myChart.resize()
  })
}
onMounted(() => {
  getDashboardDataApi().then((res) => {
    dashboardData.value = res.data
    EmergencyList.value = res.data.chartData.emergency.active
  })
  initChart()
  initOrderChart()
})
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
  }

  .tabs {
    display: flex;
    background: #fff;
    border-radius: 4px;
    padding: 4px;

    .tab {
      padding: 8px 20px;
      border: none;
      background: transparent;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #606266;
      transition: all 0.3s;

      &.active {
        background: #409eff;
        color: #fff;
      }

      &:hover:not(.active) {
        background: #ecf5ff;
      }
    }
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  .card {
    width: 100%;
    background: #fff;
    border-radius: 8px;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .card-icon {
      border-radius: 12px;
      display: flex;
      flex-direction: column;

      .card-label {
        margin-bottom: -15px;
        font-size: 14px;
        color: #606266;
      }

      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }
    }

    .card-trend {
      font-size: 14px;
      color: #606266;
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  .chart-section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #303133;
      margin-bottom: 20px;
    }
  }

  .sos-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    .sos-header {
      display: flex;
      align-items: center;
      gap: 8px;

      .sos-icon {
        width: 24px;
        height: 24px;
        color: #f56c6c;
      }

      .section-title {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
    }

    .sos-card {
      background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
      border: 1px solid #ffccc7;
      border-radius: 8px;
      padding: 15px;

      .sos-item {
        padding: 12px;
        background: rgba(245, 108, 108, 0.08);
        border-radius: 6px;
        margin-bottom: 12px;

        &:last-of-type {
          background: rgba(245, 108, 108, 0.15);
        }

        .sos-info {
          .sos-name {
            font-size: 14px;
            font-weight: bold;
            color: #303133;
            margin-bottom: 4px;
          }

          .sos-status {
            font-size: 12px;
            color: #f56c6c;
            background: rgba(245, 108, 108, 0.2);
            padding: 2px 8px;
            border-radius: 4px;
          }

          .sos-detail {
            font-size: 12px;
            color: #606266;
            margin-top: 4px;
          }
        }
      }

      .sos-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;

        .action-btn {
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;

          &.primary {
            background: #f56c6c;
            color: #fff;
          }

          &.secondary {
            background: #fff;
            color: #606266;
            border: 1px solid #dcdfe6;
          }
        }
      }

      .sos-empty {
        text-align: center;
        padding: 15px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 6px;
        margin-bottom: 15px;

        p {
          font-size: 13px;
          color: #909399;
        }
      }

      .sos-history {
        width: 100%;
        padding: 10px;
        border: none;
        background: transparent;
        color: #409eff;
        font-size: 13px;
        cursor: pointer;
        border-radius: 6px;

        &:hover {
          background: rgba(64, 158, 255, 0.1);
        }
      }
    }
  }
}
.order-section {
  background: #fff;
  width: 40%;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-top: 30px;
  .order-title {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 20px;
  }
}
</style>
