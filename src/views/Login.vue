<template>
  <div class="login_container">
    <div class="login_box">
      <div class="img_box">
        <img src="@/assets/logo.png" />
      </div>
      <el-form :model="loginForm"
               status-icon
               label-width="100px"
               ref="loginFormRef"
               class="login_form"
               :rules="loginRules">
        <el-form-item label="账号"
                      prop="username">
          <el-input type="text"
                    v-model="loginForm.username"
                    autocomplete="off"
                    prefix-icon="el-icon-user-solid"
                    placeholder="请输入登陆账号"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="loginForm.password"
                    autocomplete="off"
                    prefix-icon="el-icon-lock"
                    placeholder="请输入登陆密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="login">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { require: true, message: '请输入登陆账号', trigger: 'blur' },
          { min: 3, max: 8, message: '登陆账号的长度应在3到8个字符', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 18, message: '登陆密码的长度应在6到18个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      const _this = this// 将代表vue的this对象重新封装
      // 在发送登陆请求之前 必须通过验证规则 validated就是校验结果
      this.$refs.loginFormRef.validate(async function (validated, object) {
        if (!validated) { // 校验不通过 则直接退出 不执行后续代码
          return
        }
        const { data: res } = await _this.$http.post('/api/private/v1/login', _this.loginForm)
        if (res.meta.status === 200) { // 请求成功
          _this.$msg({
            message: '恭喜您，登陆成功',
            type: 'success'
          })
          // 保存token
          window.sessionStorage.setItem('token', res.data.token)
          _this.$router.push('/home')
        } else {
          _this.$msg({
            message: '很遗憾，登陆失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .img_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
