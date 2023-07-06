<template>
  <div class="sale-container">
    <el-card class="box-card">
      <el-carousel trigger="click" :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in this.imgList" :key="index">
          <img :src="item" alt="">
          {{ item }}
          {{ index  }}
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      imgList: ['/img/1.png', '/img/2.png', '/img/3.png', '/img/4.png'],
    }
  },
}
</script>

<style scoped lang="less">
.sale-container {
  margin-top: 20px;
  .box-card {
    position: relative;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .is-active {
      margin-left: -120px;
      width: 800px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>