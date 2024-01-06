<template>
  <div class="tradingHistory">
    <div class="tradingHistory_header">
      <h2 class="font18">收入记录</h2>
      <p class="rowBC">
        <a-space>
          <span>最近7天收入：</span>
          <span class="font14_blue">{{ total }}</span>
        </a-space>
        <span>最近七天</span>
      </p>
    </div>
    <a-card :bordered="false" :loading="loading" :body-style="{ padding: 0 }" class="tradingHistory_chart">
      <div class="chart-box" ref="chartRef" id="myChart"></div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { get } from '@/utils/request';
import echarts from '@/utils/echarts';
import {formatToDateTime, formatToDate} from '@/utils/dateUtils'

interface RecentStatic{
    revenue: number;
    date: Date;
};

defineProps({
  loading: Boolean,
});
const total = ref(0);


const init = async () => {
    const res = await get<Array<RecentStatic>>("/api/recentStatic");
    const data = res.data
        .sort((a, b) => Number(a.date) - Number(b.date));
    const dom = document.getElementById('myChart');
    total.value = res.data.map((n) => n.revenue)
        .reduce((acc, val) => acc + val, 0);
  const myChart = echarts.init(dom);
  const options = {
    title: {
      text: "收入统计",
    },
    grid: {
        left: 0,
        right: 10,
        top: 10,
        bottom: 0,
        containLabel: true,
    },
    tooltip: {
        type: 'axis',
      },
      xAxis: {
        type: 'category',
        data: data.map((n) => formatToDate(n.date)),
        axisLabel: {
            rotate: 40,
            margin: 16,
            color: '#999999',
          },
    },
    yAxis: {
        type: 'value',
    },
    series: [
    {
        data: data.map((n) => n.revenue),
            type: 'line',
            // symbolSize: 0,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(56, 96, 244, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 1)',
                },
              ]),
            },
          },
    ],
  };
  myChart.setOption(options);
};

// 格式化日期数据
const formatDate = (val: string, type: 'date' | 'time' = 'date') => {
    const formatFn = type === 'date' ? formatToDate : formatToDateTime;
    return val.length === 10 ? formatFn(Number(val) * 1000) : formatFn(val);
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.tradingHistory {
  background: #ffffff;
  &_chart {
    .chart-box {
      width: 100%;
      height: 160px;
    }
  }
}
</style>
