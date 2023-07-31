<template>
	<div class="system-dept-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-dept-search mb15">
				<el-input size="default" placeholder="请输入策略名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddDept('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增自定义策略组
				</el-button>
			</div>
			<el-table :data="state.tableData.data" :border="parentBorder" style="width: 100%">
				<el-table-column type="expand">

					<div m="4">
						<el-table :data="state.permissionData.data" :border="childBorder" >
							<el-table-column label="权限名称" prop="permissionName" />
							<el-table-column label="权限备注" prop="remark" />
							<el-table-column label="产品" prop="product" />
							<el-table-column label="引用数量" prop="refNum" />
							<el-table-column label="操作" width="150">
								<template #default="scope">
									<el-button :disabled="scope.row.userName === 'admin'" size="small" text
										style="color: var(--main-color)">删除</el-button>

								</template>
							</el-table-column>
						</el-table>
					</div>

				</el-table-column>
				<el-table-column label="策略名称" prop="strategyName" />
				<el-table-column label="引用数量" prop="refNum" />
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text
							style="color: var(--main-color)">删除</el-button>

					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<DeptDialog ref="deptDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="perStrategy">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const parentBorder = ref(false)
const childBorder = ref(false)

// 定义变量内容
const deptDialogRef = ref();
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		}
	},
	permissionData: {
		data: [],
		total: 0,
		loading: false,
	},
});

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	const obj = { "strategyName": "自定义策略权限组", "refNum": 2 };
	const data = [];
	for (let i = 0; i < 4; i++) {
		let newObj = JSON.parse(JSON.stringify(obj))
		newObj.refNum = i
		data.push(newObj);
	}
	state.tableData.data = data;

	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);




	const objp = { "permissionName": "人群看板", "remark": "", "product": "dynames", "refNum": 2 };;
	const datap = [];
	for (let i = 0; i < 2; i++) {
		datap.push(objp);
	}
	state.permissionData.data = datap;

	state.permissionData.total = state.permissionData.data.length;
	setTimeout(() => {
		state.permissionData.loading = false;
	}, 500);
};
// 打开新增菜单弹窗
const onOpenAddDept = (type: string) => {
	deptDialogRef.value.openDialog(type);
};
// 打开编辑菜单弹窗
const onOpenEditDept = (type: string, row: DeptTreeType) => {
	deptDialogRef.value.openDialog(type, row);
};
// 删除当前行
const onTabelRowDel = (row: DeptTreeType) => {
	ElMessageBox.confirm(`此操作将永久删除部门：${row.deptName}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
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
