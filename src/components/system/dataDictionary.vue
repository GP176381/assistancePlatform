<template>
  <div class="con_main">
    <div class="childBar">
      <div class="showChild">
        <h3>数据字典分类</h3>
      </div>
      <el-menu default-active="1" @select="selectItems" class="el-menu-vertical-demo">
        <el-menu-item v-for="item in dictionaryTypeOptionsAll" :key="item"  :index="item"> {{ item }}</el-menu-item>
      </el-menu>
    </div>
    <div class="childMain">
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="handle" style="background:#f6f7fb;padding: 5px;box-sizing: border-box;">
            <el-button type="primary" size="small" @click="handleAddDictionary">新增</el-button>
            <el-button type="primary" size="small" @click="handleUpdateDictionary1">修改</el-button>
            <el-button type="primary" size="small" @click="deleteRecord1">删除</el-button>
            <el-input style="float: right;margin-top:0;width:150px" size="small" placeholder="请输入关键字" icon="search"
                      v-model="search1" :on-icon-click="handleIconClick1"></el-input>
          </div>
          <el-table :data="tableData1" @current-change="handleCurrentChange1" highlight-current-row border
                    style="width: 100%" :height='tableHeight'>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="key" label="字典标识">
            </el-table-column>
            <el-table-column prop="name" label="字典名称">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="14">
          <div class="handle" style="background: #f6f7fb;padding: 5px;box-sizing: border-box;">
            <el-button type="primary " size="small " @click="addDicItem2">新增</el-button>
            <el-button type="primary " size="small " @click="handleUpdateDictionary2">修改</el-button>
            <el-button type="primary " size="small " @click="deleteRecord2">删除</el-button>
            <el-input style="float: right;width:150px" size="small" placeholder="请输入关键字" icon="search" v-model="search2"
                      :on-icon-click="handleIconClick2"></el-input>
          </div>
          <el-table :data="tableData2" @current-change="handleCurrentChange2" highlight-current-row border
                    style="width: 100%" :height='tableHeight'>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="value" label="字典对照码">
            </el-table-column>
            <el-table-column prop="text" label="字典对照值">
            </el-table-column>
            <el-table-column prop="sortNo" label="排序号 " width="80">
            </el-table-column>
            <el-table-column prop="status" :formatter="formatStatus" label="当前状态 " width="100 ">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="title1" :visible.sync="addDataDialog1" :close-on-click-modal="false">
      <el-form :model="addForm1" ref="addForm1" :rules="rules1" label-width="120px">
        <el-form-item label="所属分类" prop="type">
          <el-select v-model="addForm1.type" filterable allow-create placeholder="请选择">
            <el-option v-for="item in dictionaryTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="addForm1.name"></el-input>
        </el-form-item>
        <el-form-item label="字典标识" prop="key">
          <el-input v-model="addForm1.key"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm1.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDataDialog1 = false">取 消</el-button>
        <el-button type="primary" @click="addDataDictionary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title2" :visible.sync="addDataDialog2" :close-on-click-modal="false">
      <el-form :model="addForm2" ref="addForm2" :rules="rules2" label-width="120px">
        <el-form-item label="字典标识" prop="dicKey">
          <el-input v-model="addForm2.dicKey"></el-input>
        </el-form-item>
        <el-form-item label="字典对照码" prop="value">
          <el-input v-model="addForm2.value"></el-input>
        </el-form-item>
        <el-form-item label="字典对照值">
          <el-input v-model="addForm2.text"></el-input>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-select v-model="addForm2.status" placeholder="请选择">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号">
          <template>
            <el-input-number v-model="addForm2.sortNo" :min="1" :max="10"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm2.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDataDialog2 = false">取 消</el-button>
        <el-button type="primary" @click="addDataDictionaryItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDictionaryTypes,
    getDictionaryListByType,
    saveDictionary,
    destroyDictionary,
    getDictionaryListByName,
    getDicItemListByDicKey,
    saveDictionaryItem,
    destoryDictionaryItem,
    getDicItemByValue,
    validateDictionaryKey,
    validaDictionaryItemValue
  } from '../../api/api';

  export default {
    data() {
      var validateKeyUnique = (rule, value, callback) => {
        if (value) {
          let para = {
            id: this.addForm1.id,
            key: value
          }
          validateDictionaryKey(para).then((data) => {
            if (!data) {
              callback(new Error('字典标识必须唯一，该标识已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      };
      var validateItemKeyUnique = (rule, value, callback) => {
        if (value) {
          let para = {
            id: this.addForm2.id,
            dicKey: this.addForm2.dicKey,
            value: value
          }
          validaDictionaryItemValue(para).then((data) => {
            if (!data) {
              callback(new Error('字典项标识必须唯一，该标识已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      };
      return {
        title1: '',
        title2: '',
        search1: '',
        search2: '',
        tableHeight: '',
        currentRow1: '',
        currentRow2: '',
        tableData1: [],
        tableData2: [],
        addDataDialog1: false,
        editDataDialog1: false,
        addDataDialog2: false,
        editDataDialog2: false,
        showChild: false,
        dictionaryTypeOptions: [],
        dictionaryTypeOptionsAll: [],
        addForm1: {
          id: '',
          name: '',
          key: '',
          type: '',
          remark: ''

        },
        addForm2: {
          id: '',
          dicId: '',
          dicKey: '',
          value: '',
          status: '',
          text: '',
          sortNo: '',
          remark: ''
        },
        rules1: {
          name: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ],
          key: [
            {required: true, message: '必填 ', trigger: 'hover'},
            {validator: validateKeyUnique, trigger: 'change'}
          ],
          type: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ]
        },
        rules2: {
          dicKey: [
            {required: true, message: '必填 ', trigger: 'hover'}
          ],
          value: [
            {required: true, message: '必填 ', trigger: 'hover'},
            {validator: validateItemKeyUnique, trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      formatStatus(row, column) {
        if(row.status) {
          return "启用";
        } else {
          return "停用";
        }
      },
      initAddForm1() {
        this.addForm1 = {
          id: '',
          name: '',
          key: '',
          type: '',
          remark: ''
        }
      },
      initAddForm2() {
        this.addForm2 = {
          id: '',
          dicId: '',
          dicKey: '',
          value: '',
          status: '',
          text: '',
          sortNo: '',
          remark: ''
        }
      },
      addDataDictionary() {
        this.$refs.addForm1.validate((valid) => {
          if (valid) {
            this.addDataDialog1 = false;
            saveDictionary(this.addForm1).then((data) => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.init();
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '保存失败!'
              });
            });
          } else {
            this.$message('请确认表单是否填写完整！');
          }
        });
      },
      addDicItem2() {
        if (this.currentRow1 == '' || this.currentRow1 == null) {
          this.$message({
            type: 'info',
            message: '请选择'
          });
        } else {
          this.initAddForm2();
          this.title2 = '新增';
          this.addForm2.dicId = this.currentRow1.id;
          this.addForm2.dicKey = this.currentRow1.key;
          this.addForm2.status = "1";
          this.addDataDialog2 = true;
        }
      },
      addDataDictionaryItem() {
        this.addDataDialog2 = false;
        saveDictionaryItem(this.addForm2).then((data) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.handleCurrentChange1(this.currentRow1)
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '保存失败!'
          });
        });
        this.initAddForm2();
      },
      handleCurrentChange1(val) {
        this.currentRow1 = val;
        if (val != null) {
          let para = {
            dicKey: val.key
          }
          getDicItemListByDicKey(para).then((data) => {
            this.tableData2 = data;
          });
        }
      },
      handleCurrentChange2(val) {
        this.currentRow2 = val;
      },
      handleAddDictionary() {
        this.initAddForm1();
        this.title1 = '新增';
        this.addDataDialog1 = true;
      },
      handleUpdateDictionary1() {
        if (this.currentRow1 == '' || this.currentRow1 == null) {
          this.$message({
            type: 'info',
            message: '请选择'
          });
        } else {
          this.initAddForm1();
          this.title1 = '修改';
          this.addForm1 = this.currentRow1;
          this.addDataDialog1 = true;
        }
      },
      handleUpdateDictionary2() {
        if (this.currentRow2 == '' || this.currentRow2 == null) {
          this.$message({
            type: 'info',
            message: '请选择'
          });
        } else {
          this.initAddForm2();
          this.title2 = '修改';
          this.addForm2 = this.currentRow2;
          this.addForm2.status = this.currentRow2.status.toString();
          this.addDataDialog2 = true;
        }
      },
      handleIconClick1(ev) {
        let para = {
          name: this.search1
        }
        getDictionaryListByName(para).then((data) => {
          this.tableData1 = data;
        });
      },
      handleIconClick2(ev) {
        let para = {
          value: this.search2
        };
        getDicItemByValue(para).then((data) => {
          this.tableData2 = data;
        });
      },
      deleteRecord1() {
        if (this.currentRow1 == '' || this.currentRow1 == null) {
          this.$message({
            type: 'info',
            message: '请选择'
          });
        } else {
          this.$confirm('此操作将永久删除该字典及其下所有的数据项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            destroyDictionary(this.currentRow1.id).then((data) => {
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
        }
      },
      deleteRecord2() {
        if (this.currentRow2 == '') {
          this.$message({
            type: 'info',
            message: '请选择'
          });
        } else {
          this.$confirm('此操作将永久删除该字典数据项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            destoryDictionaryItem(this.currentRow2.id).then((data) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.handleCurrentChange1(this.currentRow1);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      init() {
        getDictionaryTypes().then((data) => {
          if (data && data.length > 0) {
            if (data.length>1) data.unshift('全部');
            this.dictionaryTypeOptionsAll = data;
            this.selectItems(data[0]);
          }
        });
        this.getDictionaryTypeOptions();
      },
      getDictionaryTypeOptions(){
        getDictionaryTypes().then((data) => {
          if (data && data.length > 0) {
            this.dictionaryTypeOptions = data;
          }
        });
      },
      selectItems(type) {
        if (type == '全部') {
          type = '';
        }
        let para = {
          type: type,
        };
        getDictionaryListByType(para).then((data) => {
          this.tableData1 = data;
        });
      },
    },
    mounted() {
      var childMainHeight = $('.childMain').height();
      this.tableHeight = childMainHeight - 45;
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
