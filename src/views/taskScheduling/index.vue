<template>
  <el-card style="margin-top: 10px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="当前任务" name="current">
        <my-table :flag="activeName"></my-table>
      </el-tab-pane>
      <el-tab-pane label="历史任务" name="history"
        ><my-table :flag="activeName"></my-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import type { TabsPaneContext } from "element-plus";

//  引入组件
const myTable = defineAsyncComponent(() => import("./components/myTable.vue"));
const activeName = ref("current");
</script>

<style scoped lang="scss"></style>
