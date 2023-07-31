<template>
  <div>
    <div class="system-user-container">
      <el-card shadow="hover" class="layout-padding-auto">
        <div class="system-user-search mb15">
          <el-input size="default" placeholder="请输入用户名称" style="max-width: 180px" v-model="inputUserName"></el-input>
          <el-button size="default" type="primary" class="ml10">
            <el-icon>
              <ele-Search/>
            </el-icon>
            查询
          </el-button>
          <el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
            <el-icon>
              <ele-FolderAdd/>
            </el-icon>
            新增子账号
          </el-button>
        </div>
        <el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">

          <el-table-column prop="userName" label="用户登录名称/显示名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column prop="product" label="已授权产品" show-overflow-tooltip width="120">
            <template #default="scope">
              <el-tag type="success">{{ scope.row.product }}</el-tag>
            </template>

          </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastLoginTime" label="最后登录时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.status">启用中</el-tag>
              <el-tag type="info" v-else>已删除</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button :disabled="scope.row.userName === 'admin'" size="small" text
                         style="color: var(--main-color)" @click="drawer = true">授权
              </el-button>
              <el-button :disabled="scope.row.userName === 'admin'" size="small" text
                         style="color: var(--main-color)" @click="onRowDel(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <my-pagination  :total="state.tableData.total" @paginationChange="paginationChange">
        </my-pagination>
      </el-card>
      <UserDialog ref="userDialogRef" @refresh="getTableData()"/>
    </div>
    <el-drawer v-model="drawer" :direction="direction" size="50%">
      <template #header>
        <h4>产品权限授权</h4>
      </template>
      <template #default>


        <el-row>
          <el-col :span="12">

            <el-tabs v-model="activeName" class="demo-tabs" style="margin-left:20px;" @tab-click="handleClick">
              <el-tab-pane label="Dynames" name="dynames">
                <el-row :gutter="12">
                  <el-col :span="24">
                    <el-table :data="state.dynamesData.data" border stripe style="height: 400px;">
                      <el-table-column prop="permission" label="权限"/>
                      <el-table-column prop="remark" label="备注"/>

                    </el-table>

                    <my-pagination layout="prev, pager, next" :total="50"/>
                  </el-col>
                </el-row>


              </el-tab-pane>
              <el-tab-pane label="Exia" name="exia">

                <el-table :data="state.dynamesData.data" stripe style="width: 100%">
                  <el-table-column prop="permission" label="权限"/>
                  <el-table-column prop="remark" label="备注"/>

                </el-table>
                <div class="example-pagination-block">
<!--                  <div class="example-demonstration">When you have few pages</div>-->
                  <my-pagination layout="prev, pager, next" :total="50"/>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Impulse" name="impulse">
                <el-table :data="state.dynamesData.data" stripe style="width: 100%">
                  <el-table-column prop="permission" label="权限"/>
                  <el-table-column prop="remark" label="备注"/>
                </el-table>
                <div class="example-pagination-block">
<!--                  <div class="example-demonstration">When you have few pages</div>-->
                  <my-pagination layout="prev, pager, next" :total="50"/>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="10">


            <el-card class="box-card" style="height:400px;margin-top: 54px;margin-left: 10px;" shadow="never">
              <template #header>
                <div class="card-header">
                  <span>已授权产品权限</span>

                </div>
              </template>
              <div class="text item">
                <el-tag class="ml-2" closable type="success">人群看板</el-tag>&nbsp;
                <el-tag class="ml-2" closable type="success">投放策略</el-tag>
              </div>

            </el-card>
            <my-pagination layout="prev, pager, next" :total="50"/>
          </el-col>
        </el-row>


      </template>
      <template #footer>
        <div style="flex: auto;padding: 10px !important;">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="identityUser">
import {defineAsyncComponent, reactive, onMounted, ref} from 'vue';
import {ElMessageBox, ElMessage, TabsPaneContext} from 'element-plus';
// 这里是定义响应式变量，ref括号内的值为变量初始值，如果该变量用于各组件的v-model属性，一般初始值和该组件的默认值一致
const activeName = ref('dynames')
const drawer = ref(false)
const direction = ref('rtl')

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/identity/user/dialog.vue'));
const MyPagination = defineAsyncComponent(() => import('/@/components/MyPagination.vue'));
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // Vue3 使用ref定义的变量，在js中需要用.value读取和赋值，在html标签中不需要.value
  console.log(activeName.value)
  // 这里获取name用tab.props.name,因为v-model绑定的activeName也是由点击事件触发，所以这里用activeName.value读取的话会读取到上一次的值，
  console.log(tab.props.name)
  getProductAuthData(tab.props.name);
}
const inputUserName = ref()

// 定义变量内容
const userDialogRef = ref();
const state = reactive({
  tableData: {
    data: [],
    total: 0,
    loading: false,
  },
  dynamesData: {
    data: [],
    total: 0,
    loading: false,
  },
  exiaData: {
    data: [],
    total: 0,
    loading: false,
  },
  impulseData: {
    data: [],
    total: 0,
    loading: false,
  }
});

const paginationChange = (pagination:object)=>{
  // pagination:当前分页数据  {current:x,pageSize:x}
  console.log(pagination)
}

function cancelClick() {
  drawer.value = false
}

function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ?`)
      .then(() => {
        drawer.value = false
      })
      .catch(() => {
        // catch error
      })
}

// 初始化表格数据
const getTableData = () => {
  state.tableData.loading = true;
  const data = [];

  const obj = {
    "userName": "189111379937",
    "remark": "子账户1",
    "product": "Dynames",
    "phone": "18911379937",
    "email": "bin.e@163.com",
    "lastLoginTime": "2023-04-23 14:22:19",
    "createTime": "2023-04-23 14:22:19",
    "status": "1"
  };

  for (let i = 0; i < 2; i++) {
    data.push(obj);
  }
  state.tableData.data = data;
  state.tableData.total = state.tableData.data.length;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

const getProductAuthData = (product: any) => {
  if (product === 'dynames') {
    state.dynamesData.loading = true;
    const data = [];

    const obj1 = {"permission": "人群看板", "remark": "人群看板功能"};
    const obj2 = {"permission": "投放策略", "remark": "投放策略功能"};
    data.push(obj1);
    data.push(obj2);
    state.dynamesData.data = data;
    state.dynamesData.total = state.tableData.data.length;
    setTimeout(() => {
      state.dynamesData.loading = false;
    }, 500);
  } else if (product === 'exia') {
    state.exiaData.loading = true;
    const data = [];

    const obj1 = {"permission": "人群看板", "remark": "人群看板功能"};
    const obj2 = {"permission": "投放策略", "remark": "投放策略功能"};
    data.push(obj1);
    data.push(obj2);
    state.exiaData.data = data;
    state.exiaData.total = state.tableData.data.length;
    setTimeout(() => {
      state.exiaData.loading = false;
    }, 500);
  } else if (product === 'impulse') {
    state.impulseData.loading = true;
    const data = [];

    const obj1 = {"permission": "人群看板", "remark": "人群看板功能"};
    const obj2 = {"permission": "投放策略", "remark": "投放策略功能"};
    data.push(obj1);
    data.push(obj2);
    state.impulseData.data = data;
    state.impulseData.total = state.tableData.data.length;
    setTimeout(() => {
      state.impulseData.loading = false;
    }, 500);
  }

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
      .catch(() => {
      });
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

.demo-tabs > .el-tabs__content {
  padding: 32px;

  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>
