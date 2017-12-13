<template>
	<div class="demo-ruleForm login-container">
		  <h3 class="title">系统登录</h3>
		  <span class="tip">{{errorMsg}}</span>
		  <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules" @keyup.enter.native="handleSubmit2">
		    <el-form-item prop="account">
		      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
		    </el-form-item>
		    <el-form-item prop="checkPass">
		      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
		    </el-form-item>
		    <el-checkbox class="remember" v-model="ruleForm2.remember">记住密码</el-checkbox>
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click="handleSubmit2" >登录</el-button>
		    </el-form-item>
		  </el-form>
	</div>
</template>

<script>
  import { login } from '../api/api';
  export default {
    data() {
      return {
      	errorMsg:'',
        ruleForm2: {
          account: '',
          checkPass: '',
          remember: false
        },
        rules: {
        	account:{ required: true, message: '请输入登录账号', trigger: 'change' },
        	checkPass:{ required: true, message: '请输入登录密码', trigger: 'change' }
        }
      };
    },
    methods: {
      handleSubmit2() {
        let para={
          username:this.ruleForm2.account,
          password:this.ruleForm2.checkPass,
          loginType:'node'
        };
        login(para).then((data) => {
          this.$message({
            type: 'success',
            message: '登陆成功'
          });
          this.$router.push({ path: '/systemSet' });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '登陆失败'
          });
        });
      }
	   }
  }

</script>

<style  scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    }
    .title {
      margin: 0px auto 20px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .tip{display: block;color:red;font-size: 12px;line-height: 24px;margin-bottom:20px ;}
</style>
