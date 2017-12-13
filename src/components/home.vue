<template>
  <div>
    <!--<div class="head">
         <el-menu theme="dark"  router  mode="horizontal">
           <h1>平台维护系统</h1>
           <router-link to="/systemSet" tag="li" active-class="active">系统设置</router-link>
           <router-link to="/projectManagement" tag="li" active-class="active">项目管理</router-link>
           <el-menu-item index="/systemSet" active-class="active">系统设置</el-menu-item>
           <el-menu-item index="/projectManagement" active-class="active">项目管理</el-menu-item>
           <div class="admin">
             <span class="division">{{division}}</span>
             <el-dropdown trigger="click">
               <span class="el-dropdown-link">
                 <span class="name">{{admin}} <i class="el-icon-caret-bottom" style="font-size: 15px;"></i></span>
               </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>修改密码</el-dropdown-item>
                 <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
           </div>
         </el-menu>

       </div>-->
    <div class="header">
      <h1 class="logo">
        {{sysName}}
      </h1>
      <div class="menu">
        <ul>
          <router-link to="/systemSet" tag="li" active-class="active">系统设置</router-link>
          <router-link to="/projectManagement" tag="li" active-class="active">项目管理</router-link>
          <router-link to="/project" tag="li" active-class="active">补助项目  <i class="el-icon-caret-bottom"></i>
          </router-link>
        </ul>
      </div>
      <div class="admin">
        <span class="division">{{division}}</span>
        <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                <span class="name">{{admin}} <i class="el-icon-caret-bottom" style="font-size: 15px;"></i></span>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {logout, AreaInfo, PersonalInfo} from '../api/api';

  export default {
    data() {
      return {
        sysName: '平台维护系统',
        division: '',
        admin: '',
      }
    },
    methods: {
      handleCommand(command) {

        if (command == 'logout') {
          logout().then((data) => {
            this.$message({
              type: 'success',
              message: '退出成功'
            });
            this.$router.push({path: '/'});
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '退出失败'
            });
          });
        }
      }
    },
    created: function () {
      AreaInfo().then((data) => {
        this.division = data;
      });
      PersonalInfo().then((data) => {
        this.admin = data.name;
      });
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 60px;
    background: #19233c;
    line-height: 60px;
    box-sizing: border-box;
  }

  .header .logo {
    float: left;
    color: #fff;
    font-size: 22px;
    margin-left: 20px;
    margin-right: 48px;
  }

  .header .menu {
    float: left;
  }

  .menu li {
    float: left;
    height: 60px;
    line-height: 60px;
    list-style: none;
    padding: 0 15px;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    opacity: 0.8;
  }

  .menu li:hover {
    opacity: 1;
  }

  .menu li.active {
    border-bottom: 4px solid #20a0ff;
    box-sizing: border-box;
    opacity: 1;
    font-weight: bold;
  }

  .header .admin {
    float: right;
    height: 60px;
    margin-right: 20px;
  }

  .el-dropdown-menu__item a {
    display: block;
  }

  .header .admin .division {
    font-size: 13px;
    color: #fff;
    line-height: 60px;
    float: left;
    margin-right: 30px;
  }

  .header .admin .name {
    font-size: 13px;
    color: #fff;
    line-height: 60px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
  }

  .header .admin .name:hover {
    color: #bfcbd9;
  }

  .content {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
