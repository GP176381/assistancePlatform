<template>
  <div>
    <div class="sidebar" >
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" theme="dark">
        <el-menu-item index="1"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="资格管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 资格管理</el-menu-item>
        <el-menu-item index="2"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="发放管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 发放管理</el-menu-item>
        <el-menu-item index="3"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="支付管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 支付管理</el-menu-item>
      </el-menu>
      <div class="on-off" @click="hide"><i v-if="isCollapse==false" class="el-icon-d-arrow-left"></i><i v-else class="el-icon-d-arrow-right"></i></div>
      </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      hide(){
        if(this.isCollapse==false){
           $('.sidebar').animate({'width':'49px'},100);
           $('.main').animate({'left':'49px'},100);
           this.isCollapse=true
        }else{
          $('.sidebar').animate({'width':'200px'},100);
           $('.main').animate({'left':'200px'},100);
           this.isCollapse=false
        }
      },
    }
  }
</script>

<style scoped>
  .sidebar {
    width: 200px;
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    background: #324157;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y:auto ;
  }
  .on-off{height: 30px;color: #fff;text-align: center;line-height: 30px;background:#19233c;position: absolute;bottom: 0;right:0;padding: 0 10px;cursor: pointer;}
  .main {
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-menu-item{height: 45px;line-height: 45px;}
</style>