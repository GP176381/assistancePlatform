<template>
  <div class="con_main">
    <div class="childBar">
      <div class="showChild">
        <h3>参数分类</h3>
      </div>
      <el-menu default-active="1" @select="selectItems" class="el-menu-vertical-demo">
        <el-menu-item v-for="item in parameterTypeOptionsAll" :key="item" :index="item"> {{ item }}</el-menu-item>
      </el-menu>
    </div>
    <div class="childMain">
      <div class="handle">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="参数名称" width="150">
        </el-table-column>
        <el-table-column prop="key" label="参数键" width="150">
        </el-table-column>
        <el-table-column prop="value" label="参数值">
        </el-table-column>
        <el-table-column prop="status" :formatter="statusFormat" label="状态" width="100">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="stop(scope.$index, scope.row)">停用</el-button>
            <el-button type="text" size="small" @click="start(scope.$index, scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                       :page-sizes="[10,20,30,50]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="addDivisionDialog" :close-on-click-modal="false">
      <el-form :model="addForm" ref="addForm" :rules="rules" label-width="120px">
        <el-form-item label="所属分类" prop="type">
          <el-select v-model="addForm.type" filterable allow-create placeholder="请选择">
            <el-option v-for="item in parameterTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="参数标识" prop="key">
          <el-input v-model="addForm.key"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="value">
          <el-input v-model="addForm.value"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDivisionDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getParameterTypes,
    saveAndUpdateParameter,
    getParameterPageByType,
    updateParameterStatus,
    deleteParameterById,
    validateParameterKey
  } from '../../api/api';

  export default {
    data() {
      var validateKeyUnique = (rule, value, callback) => {
        if (value) {
          let para = {
            id: this.addForm.id,
            key: value
          }
          validateParameterKey(para).then((data) => {
            if (!data) {
              callback(new Error('参数标识必须唯一，该标识已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      };
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        title: '新增',
        tableHeight: '',
        tableData: [],
        addDivisionDialog: false,
        showChild: false,
        parameterTypeOptions: [],
        parameterTypeOptionsAll: [],
        addForm: {
          id: '',
          name: '',
          key: '',
          value: '',
          type: '',
          remark: ''
        },
        rules: {
          type: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ],
          name: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ],
          key: [
            {required: true, message: '必填 ', trigger: 'hover'},
            {validator: validateKeyUnique, trigger: 'change'}
          ],
          value: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ]
        }
      };
    },
    methods: {
      statusFormat(row, column) {
        if (row.status) {
          return "启用";
        } else {
          return "停用";
        }
      },
      handleSizeChange(val) {//2.分页设置
        this.pageSize = val;
      },
      handleCurrentChange(val) {//2.分页设置
        this.page = val;
      },
      init() {
        getParameterTypes().then((data) => {
          if (data && data.length > 0) {
            if (data.length>1) data.unshift('全部');
            this.parameterTypeOptionsAll = data;
            this.selectItems(data[0]);
          }
        });
        this.getParameterTypeOptions();
      },
      getParameterTypeOptions(){
        getParameterTypes().then((data) => {
          if (data && data.length > 0) {
            this.parameterTypeOptions = data;
          }
        });
      },
      selectItems(type) {
        if (type == '全部') {
          type = '';
        }
        let para = {
          type: type,
          page: this.page,
          size: this.pageSize
        };
        getParameterPageByType(para).then((data) => {
          if (data && data.rows) {
            this.tableData = data.rows;
            this.total = data.total;
          }
        });
      },
      initAddForm() {
        this.addForm = {
          id: '',
          name: '',
          key: '',
          value: '',
          type: '',
          remark: ''
        }
      },
      handleAdd() {
        this.initAddForm();
        this.title = '新增';
        this.addDivisionDialog = true;
      },
      handleEdit(index, row) {
        this.initAddForm();
        this.title = '修改';
        this.addForm = row;
        this.addDivisionDialog = true;
      },
      saveSubmitForm() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addDivisionDialog = false;
            saveAndUpdateParameter(this.addForm).then((data) => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.init();
            });
          } else {
            this.$message('请确认表单是否填写完整！');
          }
        });
      },
      handleNodeClick(data) {
        console.log(data);
      },
      deleteRecord(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteParameterById(row.id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      stop(index, row) {
        this.$confirm('确定要停用该项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = {
            id: row.id,
            status: false,
          };
          updateParameterStatus(para).then((data) => {
            this.$message({
              type: 'success',
              message: '停用成功!'
            });
            this.init();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          });
        });
      },
      start(index, row) {
        this.$confirm('确定要启用该项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para = {
            id: row.id,
            status: true,
          };
          updateParameterStatus(para).then((data) => {
            this.$message({
              type: 'success',
              message: '启用成功!'
            });
            this.init();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });
        });
      },
    }
    ,
    mounted() {
      var childMainHeight = $('.childMain').height();
      this.tableHeight = childMainHeight - 76;
    },
    created() {
      this.init();
    }
  }

</script>

<style scoped>
  .con_main {
    height: 100%;
    position: relative;
  }

  .con_main .childBar {
    width: 20%;
    height: 100%;
    float: left;
    background: #f6f7fb;
    overflow: auto;
  }

  .childBar .el-menu {
    background: none;
  }

  .showChild {
    height: 30px;
    background: #eceff9;
    line-height: 30px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .showChild .el-checkbox {
    color: #666;
    font-size: 12px;
  }

  .dialog .showChild {
    height: 40px;
    background: #eceff9;
    line-height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .con_main .childMain {
    padding: 10px;
    box-sizing: border-box;
    float: left;
    width: 80%;
    height: 100%;
    position: relative;
  }

  .childMain .handle {
    margin-bottom: 10px;
  }

  .el-select {
    display: block;
  }

  .rolehead {
    background: #f3f3f3;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d1dbe5;
  }

  .rolehead .el-col {
    padding-left: 5px;
    box-sizing: border-box;
    display: block;
    border-right: 1px solid #d1dbe5;
  }

  .el-tree {
    background: #fff;
  }

  .page {
    position: absolute;
    bottom: 0;
    height: 35px;
    left: 10px;
    right: 10px;
    background: #eef1f6;
    padding-top: 2px;
    box-sizing: border-box;
  }

</style>
