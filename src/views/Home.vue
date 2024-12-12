<script setup lang="ts">
import TaskTracker from "../components/TaskTracker.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <TaskTracker></TaskTracker>
        <div class="bg-image"></div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
@import "../assets/main";
main.el-main {
  position: relative;
  border-radius: 10px;
  min-height: 100vh;
}
.bg-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: beige;
  background-image: url(../assets/img/bg-cold.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  -webkit-filter: blur(10px);
}
</style>
