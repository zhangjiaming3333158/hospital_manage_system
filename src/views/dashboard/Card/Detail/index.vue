<template>
  <div>
    <div class="card-head">
      <span>{{ title }}</span>
      <svg t="1685105863107" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2402" width="16" height="16">
        <path d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m42.666667 597.333334a42.666667 42.666667 0 0 1-85.333334 0v-213.333334a42.666667 42.666667 0 0 1 85.333334 0z m-42.666667-298.666667a42.666667 42.666667 0 1 1 42.666667-42.666667 42.666667 42.666667 0 0 1-42.666667 42.666667z" p-id="2403"></path>
      </svg>
    </div>
    <div class="card-content">
      {{ count }}
    </div>
    <div class="card-echart">
      <slot name="echarts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['title','count'],
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #ebeef5;
}
.card-head span {
  font-size: 14px;
  font-weight: 600;
}
.card-head .icon {
  cursor: pointer;
}
.card-content {
  font-size: 30px;
  padding: 10px 0px;
}
.card-echart {
  height: 50px;
  border-bottom: 1px solid #ebeef5;
}
.card-footer {
  padding: 10px;
}
</style>