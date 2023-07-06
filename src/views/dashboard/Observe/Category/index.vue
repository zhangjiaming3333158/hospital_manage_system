<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>热门就诊科室占比</span>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="前三"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      radio1: '全部',
      data: [],
    }
  },
  methods: {
    computeValue() {
      if (this.radio1 === '全部') {
        this.data = [
          { value: 16, name: '儿科' },
          { value: 8, name: '呼吸科' },
          { value: 2, name: '骨科' },
          { value: 1, name: '内科' },
          { value: 1, name: '外科' },
        ]
      } else {
        this.data = [
          { value: 16, name: '儿科' },
          { value: 8, name: '呼吸科' },
          { value: 2, name: '骨科' },
        ]
      }
    },
  },
  mounted() {
    this.computeValue()
    let myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
      title: {
        text: '视频',
        subtext: 1048,
        left: 'center',
        top: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
          },
          labelLine: {
            show: true,
          },
          // data: [
          //   { value: 16, name: '儿科' },
          //   { value: 8, name: '呼吸科' },
          //   { value: 2, name: '骨科' },
          //   { value: 1, name: '内科' },
          //   { value: 1, name: '外科' },
          // ],
          data: this.data,
        },
      ],
    })
    myChart.on('mouseover', (params) => {
      //获取鼠标移上去那条数据
      const { name, value } = params.data
      //重新设置标题
      myChart.setOption({
        title: {
          text: name,
          subtext: 'value',
        },
      })
    })
  },
  watch: {
    radio1() {
      this.computeValue()
      let myChart = echarts.init(this.$refs.charts)
      myChart.setOption({
        title: {
          text: '视频',
          subtext: 1048,
          left: 'center',
          top: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: true,
              position: 'outside',
            },
            labelLine: {
              show: true,
            },
            // data: [
            //   { value: 16, name: '儿科' },
            //   { value: 8, name: '呼吸科' },
            //   { value: 2, name: '骨科' },
            //   { value: 1, name: '内科' },
            //   { value: 1, name: '外科' },
            // ],
            data: this.data,
          },
        ],
      })
      myChart.on('mouseover', (params) => {
        //获取鼠标移上去那条数据
        const { name, value } = params.data
        //重新设置标题
        myChart.setOption({
          title: {
            text: name,
            subtext: 'value',
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 300px;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0px;
  .search-header {
    display: flex;
    justify-content: space-between;
    span {
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>