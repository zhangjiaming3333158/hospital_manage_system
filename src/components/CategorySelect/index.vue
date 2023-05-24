<template>
  <div>
    <el-card class="box-card" style="margin: 20px 0;">
      <el-form :inline="true" class="demo-form-inline" :model="cForm">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" v-model="cForm.id1" @change="handler1" :disabled="show">
            <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" v-model="cForm.id2" @change="handler2" :disabled="show">
            <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" v-model="cForm.id3" @change="handler3" :disabled="show">
            <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ["show"],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        id1: '',
        id2: '',
        id3: '',
      },
    }
  },
  mounted() {
    this.getList1()
  },
  methods: {
    async getList1() {
      let res = await this.$API.attr.reqCategoryList1()
      if (res.code == 200) {
        this.list1 = res.data
      }
    },
    async handler1() {
      this.list2 = []
      this.list3 = []
      this.cForm.id2=''
      this.cForm.id3=''
      const { id1 } = this.cForm
      this.$emit("getId", { Id: id1, level: 1 });
      let res = await this.$API.attr.reqCategoryList2(id1)
      if (res.code == 200) {
        this.list2 = res.data
      }
    },
    async handler2() {
      this.list3 = []
      this.cForm.id3=''
      const { id2 } = this.cForm
      this.$emit("getId", { Id: id2, level: 2 });
      let res = await this.$API.attr.reqCategoryList3(id2)
      if (res.code == 200) {
        this.list3 = res.data
      }
    },
    handler3(){
      const { id3 } = this.cForm
      this.$emit("getId", { Id: id3, level: 3 });
    },
  },
}
</script>

<style>
</style>