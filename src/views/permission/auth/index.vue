<template>
	<div class="system-dept-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-dept-search mb15">
				<el-input size="default" placeholder="请输入部门名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>

			</div>
			<el-tabs v-model="activeName" class="demo-tabs" style="margin-left:20px;" @tab-click="handleClick">
				<el-tab-pane label="Dynames" name="dynames">
					<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">

						<el-table-column prop="permissionName" label="权限名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

						<el-table-column prop="refNum" label="引用" show-overflow-tooltip></el-table-column>


						<el-table-column label="操作" width="150">
							<template #default="scope">
								<el-button :disabled="scope.row.userName === 'admin'" size="small" text
									style="color: var(--main-color)" @click="drawer = true">授权</el-button>

							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="Exia" name="exia">
					<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">

						<el-table-column prop="permissionName" label="权限名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

						<el-table-column prop="refNum" label="引用" show-overflow-tooltip></el-table-column>


						<el-table-column label="操作" width="150">
							<template #default="scope">
								<el-button :disabled="scope.row.userName === 'admin'" size="small" text
									style="color: var(--main-color)" @click="drawer = true">授权</el-button>

							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="Impulse" name="impulse">
					<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">

						<el-table-column prop="permissionName" label="权限名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

						<el-table-column prop="refNum" label="引用" show-overflow-tooltip></el-table-column>


						<el-table-column label="操作" width="150">
							<template #default="scope">
								<el-button :disabled="scope.row.userName === 'admin'" size="small" text
									style="color: var(--main-color)" @click="drawer = true">授权</el-button>

							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>


			</el-tabs>

			<el-drawer v-model="drawer" :direction="direction" size="50%">
				<template #header>
					<h4>产品权限授权</h4>
				</template>
				<template #default>


					<el-row>
						<el-col :span="24">
							<el-table :data="state.userData.data" v-loading="state.userData.loading" style="width: 100%">

								<el-table-column prop="userName" label="权限名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

							


								<el-table-column label="操作" width="150">
									<template #default="scope">
										<el-button :disabled="scope.row.userName === 'admin'" size="small" text
											style="color: var(--main-color)" @click="drawer = true">解绑</el-button>

									</template>
								</el-table-column>
								</el-table>
						</el-col>
					</el-row>
				</template>
				
			</el-drawer>


		</el-card>

	</div>
</template>

<script setup lang="ts" name="perAuth">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage, TabsPaneContext } from 'element-plus';

const drawer = ref(false)
const direction = ref('rtl')


const activeName = ref('dynames')
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
		},
	},
	userData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	}
});
const handleClick = (tab: TabsPaneContext, event: Event) => {
	// Vue3 使用ref定义的变量，在js中需要用.value读取和赋值，在html标签中不需要.value
	console.log(activeName.value)
	// 这里获取name用tab.props.name,因为v-model绑定的activeName也是由点击事件触发，所以这里用activeName.value读取的话会读取到上一次的值，
	console.log(tab.props.name)
	getTableData(tab.props.name);
}

// 初始化表格数据
const getTableData = (product: any) => {
	state.tableData.loading = true;

	const data = [];

	const obj = { "permissionName": "人群看板权限", "remark": "子账户1" };

	for (let i = 0; i < 2; i++) {
		data.push(obj);
	}
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);


	const udata = [];

	const uobj = { "userName": "18911379937", "remark": "子账户1"};

	for (let i = 0; i < 2; i++) {
		udata.push(uobj);
	}
	state.userData.data = data;
	state.userData.total = state.userData.data.length;
	setTimeout(() => {
		state.userData.loading = false;
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
