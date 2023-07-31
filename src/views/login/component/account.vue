<template>
  <el-form size="large" class="login-content-form" ref="ruleFormRef" :rules="rules"   :model="state.ruleForm">
    <el-form-item class="login-animation1" prop="userName">
      <el-input
          text
          placeholder="请输入用户名"
          v-model="state.ruleForm.userName"
          clearable
          autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-User/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2" prop="password">
      <el-input
          :type="state.isShowPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          v-model="state.ruleForm.password"
          autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-Unlock/>
          </el-icon>
        </template>
        <template #suffix>
          <i
              class="iconfont el-input__icon login-content-password"
              :class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
              @click="state.isShowPassword = !state.isShowPassword"
          >
          </i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation3" prop="code">
      <el-col :span="15">
        <el-input
            text
            maxlength="4"
            placeholder="请输入验证码"
            v-model="state.ruleForm.code"
            clearable
            autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <ele-Position/>
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="8">
        <el-button class="login-content-code" v-waves>1234</el-button>
      </el-col>
    </el-form-item>
    <el-form-item class="login-animation4">
      <el-button
          type="primary"
          class="login-content-submit"
          round
          v-waves
          @click="onSignIn(ruleFormRef)"
          :loading="state.loading.signIn"
      >
        登 录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="loginAccount">
import {reactive, computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage, FormInstance} from "element-plus";
import Cookies from "js-cookie";
import {initBackEndControlRoutes} from "/@/router/backEnd";
import {Local} from "/@/utils/storage";
import {formatAxis} from "/@/utils/formatTime";
import {NextLoading} from "/@/utils/loading";
import {useLoginApi} from "/@/api/login";
import {checkPwd} from "/@/utils/toolsValidate";
import {Base64} from "js-base64"; //引入base64加密，用于记住密码
// 定义变量内容
const ruleFormRef = ref<FormInstance>();
const route = useRoute();
const router = useRouter();
const rules = reactive({
  userName: [{required: true, message: "请输入账号", trigger: "change"}],
  code: [{required: true, message: "请输入验证码", trigger: "change"}],
  password: [
    {required: true, message: "请输入密码", trigger: "change"},
    {validator: checkPwd, trigger: "change"},
  ],
});
const state = reactive({
  isShowPassword: false,
  ruleForm: {
    userName: "",
    password: "",
    code: "",
    rememberPassword: false
  },
  loading: {
    signIn: false,
  },
});

// 时间获取
const currentTime = computed(() => {
  return formatAxis(new Date());
});
// 登录
const onSignIn = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return false
    state.loading.signIn = true;
    // 存储 token 到浏览器缓存
    Cookies.set("saas_user_name", state.ruleForm.userName);
    const result: any = await useLoginApi().signIn(state.ruleForm);
    if (result.code === "suc") {
      // 判断是否为记住密码
      if (state.ruleForm.rememberPassword) {
        Local.set("saas_user_name", state.ruleForm.userName);
        Local.set("saas_password", Base64.encode(state.ruleForm.password));
      } else {
        Local.remove("saas_user_name");
        Local.remove("saas_password");
      }
      Cookies.set("saas_user_id", result.data.user_id);
      Local.set("userInfo", result.data);
      Local.set("token", result.data.token);
      // Local.set("user_psw_ret", result.data.user_psw_ret); // false： 没有修改过密码,首页弹出msg
      await initBackEndControlRoutes();
      signInSuccess();
      // if (result.data.user_psw_life === "false") {
      //   //密码过期，提示修改密码
      //   ElMessage.warning("密码过期！请先修改密码再登录！");
      // } else {
      //   // Session.set('userInfo', result.data);
      //   // Session.set('token', result.data.token);
      //   Local.set("userInfo", result.data);
      //   Local.set("token", result.data.token);
      //   // Local.set("user_psw_ret", result.data.user_psw_ret); // false： 没有修改过密码,首页弹出msg
      //   await initBackEndControlRoutes();
      //   signInSuccess();
      // }
    } else {
      state.loading.signIn = false;
      ElMessage.error(result.msg);
    }
  });
};
// 登录成功后的跳转
const signInSuccess = () => {
  // 初始化登录成功时间问候语
  let currentTimeInfo = currentTime.value;
  // 登录成功，跳到转首页
  // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
  if (route.query?.redirect) {
    router.push({path: "/home"});
  } else {
    router.push("/");
  }
  // 登录成功提示
  // 关闭 loading
  state.loading.signIn = true;
  // const signInText = '欢迎回来！';
  ElMessage.success(`${currentTimeInfo}，欢迎回来！`);
  // 添加 loading，防止第一次进入界面时出现短暂空白
  NextLoading.start();
};
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 20px;
  @for $i from 1 through 4 {
    .login-animation#{$i} {
      opacity: 0;
      animation-name: error-num;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-delay: calc($i/10) + s;
    }
  }

  .login-content-password {
    display: inline-block;
    width: 20px;
    cursor: pointer;

    &:hover {
      color: #909399;
    }
  }

  .login-content-code {
    width: 100%;
    padding: 0;
    font-weight: bold;
    letter-spacing: 5px;
  }

  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>
