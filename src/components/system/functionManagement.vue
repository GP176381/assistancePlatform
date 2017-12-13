<template>
  <div class="con_main">
    <div class="childBar">
      <div class="showChild">
        <h3>行政区划</h3>
      </div>
      <el-menu default-active="1" @select="selectLevel" class="el-menu-vertical-demo">
        <el-menu-item index="1">省级</el-menu-item>
        <el-menu-item index="2">地市</el-menu-item>
        <el-menu-item index="3">区县</el-menu-item>
        <el-menu-item index="4">乡镇/街道</el-menu-item>
        <el-menu-item index="5">村社</el-menu-item>
      </el-menu>
    </div>
    <div class="childMain">
      <div class="handle">
        <el-button type="primary" @click="addDivisionDialog=true">新增</el-button>
        <el-button type="primary" @click="inputDivisionDialog=true">导入</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="code" label="职能编码" width="150">
        </el-table-column>
        <el-table-column prop="name" label="职能名称" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="status" label="可用状态" width="100" :formatter="formatterStatus">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button type="text" size="small" @click="editFunctional(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.$index, scope.row,false)">停用</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.$index, scope.row,true)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="currentPage" :page-sizes="[2, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="addDivisionDialog" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
        <el-form-item label="职能名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职能编码" prop="code">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <template>
						<el-input-number v-model="addForm.sort" :min="1" :max="10"></el-input-number>
					</template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDivisionDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="inputDivisionDialog" size='tiny' :close-on-click-modal="false">
      <el-upload class="upload-demo" action="" :file-list="fileList">
        <el-button size="small" type="primary" icon="search">选择文件</el-button>
      </el-upload>
      <a href="#" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板</a>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inputDivisionDialog = false">取 消</el-button>
        <el-button type="primary" @click="inputDivisionDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
	import {getFunctionalByLevel,saveFunctional,getFunctionalById,delFunctionalById,updateFunctionalStatus} from '../../api/api';
  export default {
    data() {
      return {
      	total:0,
      	pageSize: 10,
        currentPage:4,
        tableHeight:'',
        tableData: [],
        currentLevel:1,
        addDivisionDialog: false,
        inputDivisionDialog: false,
        fileList: [],
        addForm: {
          name: '',
          code: '',
          remark: '',
          sort: '',
          status:true
        },
        rules: {
					name: [
						{ required: true, message: '必填 ', trigger: 'change' },
						{ min: 1, max: 30, message: '长度在 1到 30个字符', trigger: 'change' }
					],
					code: [
						{ required: true, message: '必填 ', trigger: 'blur' },
						{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' }
					],
					sort: ''
				},
      };
    },
    methods: {
    	closeDialog(){
    		this.addForm ={};
    	},
    	handleUpdate(index, row, status) {
				let messageTip = "停用"
				if(status) {
					messageTip = "启用";
				}
				this.$confirm('确定要' + messageTip + '吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id,
						status: status
					};
					updateFunctionalStatus(para).then((data) => {
						this.$message({
							message: '成功' + messageTip,
							type: 'success'
						});
						this.selectLevel(this.currentLevel);
					});
				}).catch(() => {

				});
			},
    	editFunctional(index ,row){
    		getFunctionalById({id:row.id}).then((data) =>{
    			this.addForm = data;
    			this.addDivisionDialog = true;
    		});
    	},
    	addSubmit(){
    		this.$refs.addForm.validate((valid) => {
    			if(valid){
    				this.addForm.areaLevel = this.currentLevel;
		    		saveFunctional(this.addForm).then((data) =>{
		    			this.addForm = {};
		    			this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.addDivisionDialog = false;
							this.selectLevel(this.currentLevel);
		    		});
    			}
    			
    		});
    		
    	},
    	formatterStatus(row, column){
    		if(row.status){
    			return "启用";
    		}else{
    			return "停用";
    		}
    	},
    	selectLevel(index){
    		this.currentLevel = index;
    		let para = {
					administrativeAreaLevel: index,
					page: this.currentPage,
					size: this.pageSize
				};
    		getFunctionalByLevel(para).then((data) =>{
    			this.tableData=data.rows;
    			this.total = data.total;
    		});
    	},
      deleteRecord(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	delFunctionalById({id:row.id}).then((data) => {
						this.selectLevel(this.currentLevel);
					});
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
			handleSizeChange(val) { //2.分页设置
				this.pageSize = val;
				this.selectLevel(this.currentLevel);
			},
			handleCurrentChange(val) { //2.分页设置
				this.currentPage = val;
				this.selectLevel(this.currentLevel);
			}
    },
     mounted() {
     	this.selectLevel(1);
      var childMainHeight = $('.childMain').height();
      this.tableHeight = childMainHeight -76;
    }
  }
</script>

<style scoped>
  .con_main {
    height: 100%;
    position: relative;
  }
  
  .con_main .childBar {
    width:20%;
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
  
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  
  .con_main .childMain {
    padding: 10px;
    box-sizing: border-box;
    float: left;
    width: 80%;
    height:100%;
    position: relative;
  }
  
  .childMain .handle {
    margin-bottom: 10px;
  }
  .page{position: absolute;bottom: 0;height: 35px;left:10px;right:10px;background:#eef1f6;padding-top: 2px;box-sizing: border-box;}
  
</style>