<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <!-- <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span> -->
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputVale"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        // 输入的内容
        inputVale: ''
      }
    },
    methods: {
      toResult() {
        // 非空判断
        if(this.inputVale == '') {
          this.$message.worning('请输入内容')
        }else {
          // 去搜索页
          this.$router.push('/result?q='+this.inputVale)
        }
      }
    },
  }
</script>

<style scoped></style>
