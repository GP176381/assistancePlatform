<template>
  <div>
    <div class="sidebar" >
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" theme="dark">
        <el-menu-item index="/systemSet/administrativeDivision"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="行政区划" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 行政区划</el-menu-item>
        <el-menu-item index="/systemSet/personManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="人员管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 人员管理</el-menu-item>
        <el-menu-item index="/systemSet/functionManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="职能管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 职能管理</el-menu-item>
        <el-menu-item index="/systemSet/roleManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="角色管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 角色管理</el-menu-item>
        <el-menu-item index="/systemSet/privilegeManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="权限管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 权限管理</el-menu-item>
        <el-menu-item index="/systemSet/unitManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="单位管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 单位管理</el-menu-item>
        <el-menu-item index="/systemSet/processManage"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="流程管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 流程管理</el-menu-item>
        <el-menu-item index="8"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="银行管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 银行管理</el-menu-item>
        <el-menu-item index="/systemSet/parameterManagement"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="参数管理" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 参数管理</el-menu-item>
        <el-menu-item index="/systemSet/dataDictionary"><el-tooltip v-if="isCollapse==true" class="item" effect="dark" content="数据字典" placement="right"><i class="el-icon-menu"></i></el-tooltip><i v-else class="el-icon-menu"></i> 数据字典</el-menu-item>
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