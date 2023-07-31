<template>
	<div class="system-user-container">
		<el-card shadow="hover"  class="layout-padding-auto">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户组
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">

				<el-table-column prop="groupName" label="用户登录名称/显示名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
				
				<el-table-column prop="userNum" label="用户数量" show-overflow-tooltip></el-table-column>
				

				<el-table-column label="操作" >
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text style="color: var(--main-color)"
							@click="onOpenEditUser('edit', scope.row)">管理用户</el-button>
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text style="color: var(--main-color)"
							@click="onRowDel(scope.row)">删除用户组</el-button>
					</template>
				</el-table-column>
			</el-table>
			<my-pagination
          @paginationChange="paginationChange"
				:total="state.tableData.total">
			</my-pagination>
		</el-card>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="identityUserGroup">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/identity/group/dialog.vue'));
const MyPagination = defineAsyncComponent(() => import('/@/components/MyPagination.vue'));

// 定义变量内容
const userDialogRef = ref();
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		loading: false,
	},
});
const paginationChange = (pagination:object)=>{
  console.log(pagination)
}
// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	const data = [];

	const obj = { "groupName": "189111379937", "remark": "子账户1", "userNum": 5 };

	for (let i = 0; i < 2; i++) {
		data.push(obj);
	}
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
	userDialogRef.value.openDialog(type);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
	userDialogRef.value.openDialog(type, row);
};
// 删除用户
const onRowDel = (row: RowUserType) => {
	ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => { });
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;

		.el-table {
			flex: 1;
		}
	}
}
</style>
