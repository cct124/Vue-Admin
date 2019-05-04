<template>
  <el-container>
    <div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <div class="admintitle">
          <span v-show="!isCollapse">
            <span class="adminspan">
              Ad<span>min</span>
            </span>
            <i class="el-icon-arrow-left" @click=" isCollapse = !isCollapse"></i>
          </span>
          <span v-show="isCollapse">
            <i class="el-icon-arrow-right" @click=" isCollapse = !isCollapse"></i>
          </span>
        </div>
        <el-menu-item class="menu" index="1" @click="jump('/Admin/PageOne')">
          <svg-icon class="icon" icon-class="dataBoard"/>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="jump('/Admin/tabularData')">
          <i class="el-icon-tickets"></i>
          <span slot="title">商品列表</span>
        </el-menu-item>
        <el-menu-item index="3" @click="jump('/Admin/addCommodity')">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加商品</span>
        </el-menu-item>
        <el-menu-item index="4" @click="jump('/Admin/addSort')">
          <i class="el-icon-setting"></i>
          <span slot="title">添加分类</span>
        </el-menu-item>
        <el-menu-item index="5" @click="jump('/Admin/ordersComputing')">
          <i class="el-icon-setting"></i>
          <span slot="title">订单处理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-container>
      <el-header class="header">
        <div class="usermessage">
          <el-button class="message" type="info" icon="el-icon-message" circle></el-button>
          <el-dropdown class="user" @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="avatar" src="../image/Avatar.png" alt>
              <span>Godzilla</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit-outline">帮助与反馈</el-dropdown-item>
              <el-dropdown-item icon="el-icon-back" command="/login">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
import { sessionremove } from "./../api/access.js";
import { constantRouterMap } from "./../router/index.js";

export default {
  name: "Admin",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    jump(value) {
      this.$router.push({ path: value, replace: true });
    },
    handleCommand(command) {
      if (command == "/login") {
        sessionremove("Logininformation");
        sessionremove("addRoutes");
        this.$router.addRoutes(constantRouterMap);
        window.location.reload()
        this.$router.replace({ path: command });
        
      }
    }
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
  height: 100%;
}
html {
  height: 100%;
}
.el-main {
  padding: 8px 0 0 5px;
  height: 100%;
}
.icon {
  width: 1.8em !important;
  height: 1.2em !important;
  vertical-align: -0.35em !important;
  padding-right: 3px;
}
.admintitle {
  height: 70px;
}
.el-icon-arrow-left {
  line-height: 70px;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.el-icon-arrow-right {
  line-height: 70px;
  cursor: pointer;
  text-align: center;
  width: 100%;
}
.adminspan span {
  color: #e43aa7;
}
.adminspan {
  color: #0d61b7;
  display: inline;
  color: #0d61b7;
  line-height: 70px;
  font-size: 1.8em;
  margin-left: 30px;
  cursor: pointer;
}
.el-container {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-menu {
  height: 100%;
  box-shadow: 4px 0px 5px #2929291c;
  border-right: 0 !important;
  box-shadow: 4px 0px 5px #2929291c;
}

.header {
  line-height: 60px;
  color: #0a475e;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.28);
}
.usermessage {
  position: absolute;
  right: 20px;
  width: 300px;
}

.message {
  margin: 0 30px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #303133;
  display: block;
  width: 110px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 8% 8px 0 0;
  float: left;
}
</style>