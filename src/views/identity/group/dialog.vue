<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-table :data="state.userData.data" border stripe style="height: 400px;">
						<el-table-column prop="userName" label="权限" />
						<el-table-column prop="remark" label="备注" />
						<el-table-column prop="email" label="邮箱" />
						<el-table-column label="操作">
							<template #default="scope">
								
								<el-button :disabled="scope.row.userName === 'admin'" size="small" text
									style="color: var(--main-color)" @click="onRowDel(scope.row)">删除用户组</el-button>
							</template>
						</el-table-column>
					</el-table>


					<my-pagination layout="prev, pager, next" :total="50" />
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemUserDialog">
import { reactive, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({

	userData: {

		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		}
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	}
});
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
// 打开弹窗
const openDialog = (type: string, row: RowUserType) => {
	if (type === 'edit') {

		state.dialog.title = '修改用户';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
		getTableData();
	}
	state.dialog.isShowDialog = true;

};
const getTableData = () => {
	state.userData.loading = true;
	const data = [];

	const obj = { "userName": "189111379937", "remark": "子账户1", "email": "ebin1983@163.com" };

	for (let i = 0; i < 2; i++) {
		data.push(obj);
	}
	state.userData.data = data;
	state.userData.total = state.userData.data.length;
	setTimeout(() => {
		state.userData.loading = false;
	}, 500);
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
	emit('refresh');
	// if (state.dialog.type === 'add') { }
};
// 初始化部门数据


// 暴露变量
defineExpose({
	openDialog,
});
</script>
