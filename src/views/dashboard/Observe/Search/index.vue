<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>热门科室</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="24">
          <lineCharts :total="total" v-if="total==16"></lineCharts>
          <lineCharts2 :total="total" v-else></lineCharts2>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100% ;margin-top: 20px;" border>
      <el-table-column prop="name" label="科室名称" width="80"> </el-table-column>
      <el-table-column label="排名" width="80" type="index">
      </el-table-column>
      <el-table-column prop="roomName" label="诊室名称" width="100"> </el-table-column>
      <el-table-column prop="roomNum" label="诊室问诊次数" sortable> </el-table-column>
      <el-table-column prop="week" label="周涨幅" sortable> </el-table-column>
    </el-table>
    <!-- 分页去 -->
    <el-pagination layout="prev, pager, next" :total="3" class="pagination"> </el-pagination>
  </el-card>
</template>

<script>
import lineCharts from './lineCharts'
import lineCharts2 from './lineCharts2'
export default {
  name: 'Search',
  data() {
    return {
      tableData: [],
      options: [
        {
          value: '儿科',
          label: '儿科',
        },
        {
          value: '呼吸科',
          label: '呼吸科',
        },
        {},
      ],
      value: '儿科',
    }
  },
  components: {
    lineCharts,
    lineCharts2,
  },
  methods: {
    computeValue() {
      if (this.value == '儿科') {
        this.tableData = [
          {
            name: '儿科',
            roomName: '111',
            roomNum: 10,
            week: '60.00%',
          },
          {
            name: '儿科',
            roomName: '110',
            roomNum: 6,
            week: '33.33%',
          },
        ]
      } else {
        this.tableData = [
          {
            name: '呼吸科',
            roomName: '211',
            roomNum: 5,
            week: '60.00%',
          },
          {
            name: '呼吸科',
            roomName: '210',
            roomNum: 3,
            week: '33.33%',
          },
        ]
      }
    },
  },
  watch: {
    // 每当 question 改变时，这个函数就会执行
    value() {
      this.computeValue()
    },
  },
  computed: {
    // 计算属性的 getter
    total() {
      // `this` 指向 vm 实例
      let total = 0
      this.tableData.forEach((item) => {
        total += item.roomNum
      })
      return total
    },
  },
  mounted() {
    this.tableData = [
      {
        name: '儿科',
        roomName: '111',
        roomNum: 10,
        week: '60.00%',
      },
      {
        name: '儿科',
        roomName: '110',
        roomNum: 6,
        week: '33.33%',
      },
    ]
  },
}
</script>

<style lang="less" scoped>
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

.pagination {
  float: right;
}
</style>