<template>
  <div class="sale-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick"-->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- :picker-options="pickerOptions"-->
          <el-date-picker v-model="date" class="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-mm-dd">
          </el-date-picker>
        </div>
      </div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{title}}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'Card',
  data() {
    return {
      mycharts: null,
      activeName: 'sale',
      date: [],
    }
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts)
    this.mycharts.setOption({
      title: {
        text: '销售额趋势',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    })
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
  },
  watch: {
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + '趋势',
        },
      })
    },
  },
  methods: {
    setDay() {
      this.date = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
    },
    setWeek() {
      this.date = [dayjs().startOf('week').format('YYYY-MM-DD'), dayjs().endOf('week').format('YYYY-MM-DD')]
    },
    setMonth() {
      this.date = [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')]
    },
    setYear() {
      this.date = [dayjs().startOf('year').format('YYYY-MM-DD'), dayjs().endOf('year').format('YYYY-MM-DD')]
    },
  },
}
</script>

<style scoped lang="less">
.sale-container {
  margin-top: 20px;
  .box-card {
    position: relative;
    .clearfix {
      position: relative;
      display: flex;
      justify-content: space-between;
      .tab {
        width: 100%;
      }
      .right {
        position: absolute;
        right: 20px;

        span {
          margin-right: 10px;
          cursor: pointer;
        }
        .date {
          width: 300px;
        }
      }
    }
    .charts {
      width: 100%;
      height: 400px;
    }
    ul {
      list-style: none;
      li {
        height: 50px;
        line-height: 30px;
        span {
          margin-right: 10px;
        }
        .rindex {
          float: left;
          width: 20px;
          height: 20px;
          color: #fff;
          text-align: center;
          line-height: 20px;
          background-color: #000;
          border-radius: 50%;
        }
        .rvalue {
          float: right;
        }
      }
    }
  }
}
</style>