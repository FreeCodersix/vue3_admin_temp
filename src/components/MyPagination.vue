<template>
  <div style="width:100%;display: flex;justify-content: flex-end;padding: 10px">
    <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        layout="total,prev, pager, next,sizes, jumper"
        background
        v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts" name="MyPagination">

/*
* 封装的分页组件，支持原el-pagination所有属性
* 正常使用需先引入组件，组件中传入total属性和paginationChange事件,并在下方实现paginationChange事件对应的方法，此方法必须接收至少一个参数，第一个为当前组件传过去的分页信息
* demo可参考identity/user/index.vue文件的52行，方法参照该文件的paginationChange
* */

import {watch, reactive, onMounted} from "vue";
import {defineProps, readonly} from "vue-demi";
import _ from 'lodash'
onMounted(()=>{
  pagination.pageSize = props.pageSizes[0] as number
})
const props = defineProps({
  pageSizes:{
    type:Array,
    default: ()=>[10, 20, 50, 100]
  }
})
const emit = defineEmits(['paginationChange'])
const pagination = reactive({current: 1, pageSize: 10})
const debounce = _.debounce((value) => {
  emit('paginationChange', value)
}, 500)
watch(
    () => pagination,
    (value) => {
      debounce(value)
    }, {deep: true, immediate: true}
)

defineExpose({
  pagination: readonly(pagination)
})
</script>

<style scoped>

</style>