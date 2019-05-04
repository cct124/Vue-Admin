<template>
  <div>
    <div class="login-container">
      <div class="switch">
        <a class="buttonlogin" @click="logincondition = true">Login</a>
        <a class="buttonsignup" @click="logincondition = false ">Sign up</a>
      </div>
      <transition name="fade">
        <div class="login" v-if="logincondition">
          <div class="login-left">
            <el-form class="demo-form-inline" :model="loginForm">
              <h1>
                <span>Ad</span>min
              </h1>
              <el-form-item label="账号">
                <el-input placeholder="username" v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" placeholder="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <span class="loginspan">先注册</span>
              <el-form-item class="primary">
                <el-button type="primary" @click="login">登陆</el-button>
              </el-form-item>
            </el-form>
          </div>
          <img class="login-right" src="../image/login20190304.png">
        </div>
      </transition>
      <transition name="fade">
        <div class="signup" v-if="!logincondition">
          <div class="signup-left">
            <el-form :model="signupForm" class="demo-form-inline">
              <h1>
                <span>Sign</span>Up
              </h1>
              <el-form-item label="账号">
                <el-input v-model="signupForm.username" placeholder="Pack a username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  v-model="signupForm.password"
                  placeholder="Create a password"
                ></el-input>
              </el-form-item>
              <el-form-item class="primary">
                <el-button type="primary" @click="registered">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <img class="signup-right" src="../image/signup20190304.png">
        </div>
      </transition>
    </div>
    <div class="garden"></div>
    <div class="garden2"></div>
  </div>
</template>



<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { localfetch, sessionfetch } from "./../api/access.js";
export default {
  name: "login",
  data() {
    return {
      signupForm: {
        username: "",
        password: ""
      },
      loginForm: {
        username: "",
        password: ""
      },
      logincondition: true
    };
  },
  watch: {
    "loginForm.username": "input",
    "loginForm.password": "input"
  },
  methods: {
    login(value) {
      this.verification();
      if (sessionfetch("Logininformation")) {
        this.$router.replace({
          path: "/Admin"
        });
        this.defaultPass();
        return;
      }
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        this.$message({
          message: "账号和密码不能为空！",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "用户不存在或密码错误！",
        type: "warning"
      });
    },
    ...mapMutations(["defaultPass"]),
    ...mapActions(["verification", "inputuser", "localSave"]),
    input() {
      this.inputuser(this.loginForm);
    },
    registered() {
      if (this.signupForm.username == "" || this.signupForm.password == "") {
        this.$message({
          message: "账号和密码不能为空！",
          type: "warning"
        });
        return;
      }
      var date = localfetch("userInfo") || [];
      if (
        !!date.find(item => {
          if (item.username == this.signupForm.username) {
            return true;
          } else {
            return false;
          }
        })
      ) {
        this.$message({
          message: "账号已存在！",
          type: "warning"
        });
        return;
      }
      this.localSave({
        username: this.signupForm.username,
        password: this.signupForm.password
      });
      this.$message({
          message: "注册成功",
          type: "success"
        });
    }
  },
  computed: {
    ...mapGetters(["pass"])
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #ffffff;
}
/* .el-form-item{
  margin: 0 0 5px 0 !important;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.switch {
  z-index: 2;
  position: absolute;
  right: 10px;
  top: 10px;
  color: #234269;
}
a.buttonlogin:hover,
a.buttonsignup:hover {
  color: #eeeeee;
  cursor: pointer;
}
.loginspan {
  font-size: 0.5em;
  margin: 10px;
}
.buttonlogin,
.buttonsignup {
  margin: 0 5px;
}
.demo-form-inline {
  height: 100%;
}
.demo-form-inline h1 {
  color: #e43aa7;
  line-height: 55px;
  font-weight: lighter;
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.demo-form-inline h1 span {
  color: #0d61b7;
  display: inline;
}
.login-left,
.signup-left {
  position: absolute;
  width: 320px;
  height: 300px;
  padding: 30px 0 30px 30px;
}
.login-right,
.signup-right {
  width: 350px;
  height: 360px;
  position: absolute;
  right: 0;
  border-radius: 0 10px 10px 0;
}
.login-container {
  z-index: 3;
  width: 700px;
  height: 360px;
  margin: auto;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
}
.login,
.signup {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: absolute;
}
.el-input__inner {
  width: 280px !important;
  border-style: solid;
  border-width: 0 0 1px 0 !important;
  border-radius: 0 !important;
  padding: 0 !important;
  margin-left: 10px;
}
.primary {
  position: absolute;
  right: 60px;
  margin-top: 20px;
}
.garden {
  z-index: 2;
  background-color: #1fa2d2;
  width: 1920px;
  height: 1920px;
  margin: auto;
  position: fixed;
  border-radius: 50%;
  top: 0;
  left: -1900px;
  right: 0;
  bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.garden2 {
  z-index: 1;
  background-color: #ff63c7;
  width: 1920px;
  height: 1920px;
  margin: auto;
  position: fixed;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: -900px;
  bottom: -2120px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
</style>