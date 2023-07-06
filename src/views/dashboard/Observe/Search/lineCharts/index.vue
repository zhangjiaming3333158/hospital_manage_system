<template>
  <div>
    <div class="card-head">
      <span>科室问诊数</span>
      <svg t="1685105863107" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2402" width="19" height="19">
        <path d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m42.666667 597.333334a42.666667 42.666667 0 0 1-85.333334 0v-213.333334a42.666667 42.666667 0 0 1 85.333334 0z m-42.666667-298.666667a42.666667 42.666667 0 1 1 42.666667-42.666667 42.666667 42.666667 0 0 1-42.666667 42.666667z" p-id="2403"></path>
      </svg>
    </div>
    <div class="card-content">
      <span class="main-title">{{ total }}</span>
      <!-- <span class="main-content">17.1</span> -->
      <svg t="1685106954319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14908" width="16" height="16">
        <path d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 85.333334 0v725.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#0B70DD" p-id="14909"></path>
        <path d="M512 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v181.333333h85.333334V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#0B66B7" p-id="14910"></path>
        <path d="M848.213333 416H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="#3395FF" p-id="14911"></path>
      </svg> <svg t="1685106982337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16689" width="16" height="16">
        <path d="M864 643.413333l-336.213333 373.333334a21.333333 21.333333 0 0 1-31.573334 0L160 643.413333a21.333333 21.333333 0 0 1 15.786667-35.413333h272.213333a21.333333 21.333333 0 0 0 21.333333-21.333333V42.666667a42.666667 42.666667 0 1 1 85.333334 0v544a21.333333 21.333333 0 0 0 21.333333 21.333333h272.213333a21.333333 21.333333 0 0 1 15.786667 35.413333z" fill="#3E2AD1" p-id="16690"></path>
      </svg>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  props: ['total'],
  // data() {
  //   return {
  //     data: [0, 10, 0, 5, 0],
  //   }
  // },
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: 'category',
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      //系列
      series: [
        {
          type: 'line',
          data: [0, 10, 0, 6, 0],
          smooth: true,
          //拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: 'purple',
          },
          //填充颜色设置
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    })
  },
}
</script>

<style scoped lang="less">
.card-head {
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #ebeef5;
  span {
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
  }
}
.card-content {
  display: flex;
  align-items: center;
  height: 60px;
  .main-title {
    margin-right: 30px;
  }
  .main-content {
    margin-right: 30px;
  }
}
.charts {
  width: 100%;
  height: 80px;
}
</style>