<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="医生" count="18人">
            <template #echarts>
              <span>月入职 1人<svg t="1685106954319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14908" width="16" height="16">
                  <path d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 85.333334 0v725.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#0B70DD" p-id="14909"></path>
                  <path d="M512 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v181.333333h85.333334V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#0B66B7" p-id="14910"></path>
                  <path d="M848.213333 416H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="#3395FF" p-id="14911"></path>
                </svg> 年入职 5人<svg t="1685106982337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16689" width="16" height="16">
                  <path d="M864 643.413333l-336.213333 373.333334a21.333333 21.333333 0 0 1-31.573334 0L160 643.413333a21.333333 21.333333 0 0 1 15.786667-35.413333h272.213333a21.333333 21.333333 0 0 0 21.333333-21.333333V42.666667a42.666667 42.666667 0 1 1 85.333334 0v544a21.333333 21.333333 0 0 0 21.333333 21.333333h272.213333a21.333333 21.333333 0 0 1 15.786667 35.413333z" fill="#3E2AD1" p-id="16690"></path>
                </svg></span>
            </template>
            <template #footer>
              <span>日销售额 ￥12,423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="科室" count="20个">
            <template #echarts>
              <lineChart></lineChart>
            </template>
            <template #footer>
              <span>科室就诊数 20</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="诊室" count="20个">
            <template #echarts>
              <barChart></barChart>
            </template>
            <template #footer>
              <span>诊室就诊数 20</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="出诊" count="20次">
            <template #echarts>
              <progressChart></progressChart>
            </template>
            <template #footer>
              <span>周同比 56.67%<svg t="1685106954319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14908" width="16" height="16">
                  <path d="M512 1024a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 85.333334 0v725.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#0B70DD" p-id="14909"></path>
                  <path d="M512 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v181.333333h85.333334V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#0B66B7" p-id="14910"></path>
                  <path d="M848.213333 416H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="#3395FF" p-id="14911"></path>
                </svg> 日同比 19.96%<svg t="1685106982337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16689" width="16" height="16">
                  <path d="M864 643.413333l-336.213333 373.333334a21.333333 21.333333 0 0 1-31.573334 0L160 643.413333a21.333333 21.333333 0 0 1 15.786667-35.413333h272.213333a21.333333 21.333333 0 0 0 21.333333-21.333333V42.666667a42.666667 42.666667 0 1 1 85.333334 0v544a21.333333 21.333333 0 0 0 21.333333 21.333333h272.213333a21.333333 21.333333 0 0 1 15.786667 35.413333z" fill="#3E2AD1" p-id="16690"></path>
                </svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
  name: 'Card',
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  },
}
</script>

<style>
</style>