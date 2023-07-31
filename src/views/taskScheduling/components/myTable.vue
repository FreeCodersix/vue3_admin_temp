<template>
  <el-table :data="tableData" style="min-height: 400px; overflow-y: auto" border>
    <template v-for="n in tableHeader" :key="n.value">
      <el-table-column
        :prop="n.value"
        :label="n.label"
        :columns="tableHeader"
        align="center"
        :show-overflow-tooltip="Array.of('tag_id', 'tag_name', 'desc').includes(n.value)"
        :width="n.width"
        v-show="n.value !== 'operation' && !isHistory"
      >
        <template v-slot="{ row, $index }">
          <template v-if="n.value === 'operation'" style="text-align: left">
            <el-button size="small" text type="success">重刷畅销榜单</el-button>
            <el-button size="small" text type="success">重刷产品榜单</el-button>
            <el-button size="small" text type="success">重刷人群</el-button>
            <el-button size="small" text type="success">重新上传人群</el-button>
            <el-button size="small" text type="success">重新同步产销榜单</el-button>
            <el-button size="small" text type="success">重新同步产品榜单</el-button>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts" name="myTable">
import { ref, reactive, watch } from "vue";

const props = defineProps({
  flag: {
    type: String,
    required: true,
  },
});
const tableHeader = reactive([
  { label: "执行日期", value: "tag_name", width: 220 },
  { label: "上游任务", value: "desc", width: "auto" },
  { label: "日刷畅销榜单", value: "parent_name", width: "auto" },
  { label: "日刷产品榜单", value: "p_parent_name", width: "auto" },
  { label: "周刷人群", value: "create_user", width: 100 },
  { label: "人群上传", value: "update_time", width: 180 },
  { label: "同步产销榜单", value: "use_count", width: 150 },
  { label: "同步产品榜单", value: "orderby", width: 130 },
  { label: "操作", value: "operation", width: 300 },
]);
const tableData = reactive([
  {
    create_time: "2023-06-13 21:50:58",
    create_user: "system",
    desc: null,
    id: 1094,
    orderby: 38,
    p_parent_name: "linkio",
    parent_id: "139",
    parent_name: "linkio",
    priority: 0,
    status: 1,
    tag_id: "31c721d96da7b0251695a584b066c0e6",
    tag_name: "06-29测试1",
    type: 1,
    update_time: null,
    update_user: null,
    use_count: 11,
  },
  {
    create_time: "2023-06-13 21:50:58",
    create_user: "system",
    desc: null,
    id: 1095,
    orderby: 38,
    p_parent_name: "linkio123",
    parent_id: "139",
    parent_name: "linkio123",
    priority: 0,
    status: 1,
    tag_id: "31c721d96da7b0251695a584b066c0e6",
    tag_name: "06-29测试1",
    type: 1,
    update_time: null,
    update_user: null,
    use_count: 11,
  },
]);
const isHistory = ref(false);
watch(
  () => props.flag,
  (value, oldValue) => {
    if (value === "current") {
      if (!tableHeader.some((i) => i.value === "operation")) {
        tableHeader.push({ label: "操作", value: "operation", width: 300 });
      }
    } else {
      if (tableHeader.some((i) => i.value === "operation")) {
        tableHeader.pop();
      }
    }
    console.log(value, oldValue);
  }
);
</script>

<style scoped lang="scss"></style>
