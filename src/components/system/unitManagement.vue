<template>
  <div class="con_main">
    <div class="childBar">
      <div class="showChild">
        <el-checkbox v-model="showChild" @change="changeChild">显示子集</el-checkbox>
      </div>
      <el-tree :data="dataTree" :highlight-current=true node-key="id" @node-click="handleNodeClick" :expand-on-click-node=false :default-expand-all=true :props="defaultProps">
      </el-tree>
    </div>
    <div class="childMain" >  
      <div class="handle">
        <el-button type="primary" @click="addDialog">新增</el-button>
        <el-button type="primary" @click="inputDivisionDialog=true">导入</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="单位名称" width="180">
        </el-table-column>
        <el-table-column prop="code" label="单位编码" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200">
        </el-table-column>
        <el-table-column prop="status" label="可用状态" width="100" :formatter="formatterStatus">
        </el-table-column>
        <el-table-column prop="sort" label="排序号" width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="functionalName" label="所属职能" width="180">
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template scope="scope">
            <el-button type="text" size="small" @click="editDialog(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="updateStatus(scope.$index, scope.row,false)">停用</el-button>
            <el-button type="text" size="small" @click="updateStatus(scope.$index, scope.row,true)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="addDivisionDialog" :close-on-click-modal="false" @close="closeDialog">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
        <el-form-item label="所在行政区划" >
          <el-input v-model="addForm.areaName" readonly></el-input>
        </el-form-item>
        <el-form-item label="所属职能"  prop="functionalId">
          <el-select v-model="addForm.functionalId" placeholder="请选择" @change="changeFunctional">
            <el-option v-for="item in functionalOpts" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="addForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="单位简称"  prop="easyName">
          <el-input v-model="addForm.easyName" ></el-input>
        </el-form-item>
         <el-form-item label="单位编码"  prop="code">
          <el-input v-model="addForm.code" ></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="address">
          <el-input v-model="addForm.address" ></el-input>   
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="addForm.remark"  type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="排序号">
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
      <el-upload
        class="upload-demo"
        action=""
        :file-list="fileList">
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
import {getFunctionalById,getTreeData,getUnitListByCode,saveUnit,getUnitById,delUnitById,updateUnitStatus,getFunctionalByLevel} from '../../api/api';
  export default {
    data() {
      return {
      	pageSize:10,
      	page:1,
      	total:0,
      	currentNode:{},
        tableHeight:'',
        showChild: false,
        childMainWidth: '',
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        functionalOpts:[],
        tableData: [],
        addDivisionDialog: false,
        inputDivisionDialog: false,
        fileList:[],
        addForm: {functionalId:null,name:''},
        rules: {
					code: [
						{ required: true, message: '必填 ', trigger: 'blur' },
						{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' }
					],
					functionalId: [
						{ required: true, message: '必填 '},
					],
					sort: ''
				},
      };
    },
    methods: {
    	changeChild(){
				this.getUnitList();
			},
    	changeFunctional(value){
    		let obj = {};
	      obj = this.functionalOpts.find((item)=>{
	          return item.id === value;
	      });
	      if(typeof(obj) != 'undefined'){
	      	var endStr = '';
		      if(typeof(obj.areaLevel) != 'undefined' && obj.areaLevel==1){
		      	endStr='厅';
		      }else{
		      	endStr='局';
		      }
	    		this.addForm.name = this.currentNode.text + obj.name + endStr;
	      }
    	},
    	closeDialog(){
    		this.addForm ={functionalId:null,name:''};
    	},
    	updateStatus(index, row, status) {
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
					updateUnitStatus(para).then((data) => {
						this.$message({
							message: '成功' + messageTip,
							type: 'success'
						});
						this.getUnitList();
					});
				}).catch(() => {

				});
			},
    	editDialog(index, row){
    		getUnitById({id:row.id}).then((data) => {
					this.addForm = data;
					this.addForm.areaName = this.currentNode.text;
					this.addDivisionDialog = true;
				});
    	},
    	addSubmit(){
    		this.$refs.addForm.validate((valid) => {
					if(valid){
						saveUnit(this.addForm).then((data) =>{
		    			this.addForm = {};
		    			this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.addDivisionDialog = false;
							this.getUnitList();
		    		}).catch((err) => {
							this.$message({
								type: 'error',
								message: err.response.data.message
							});
						});
					}
				});
    		
    	},
    	addDialog(){
    		this.addForm.areaCode = this.currentNode.attributes.code;
    		this.addForm.areaName = this.currentNode.text;
    		this.addForm.areaCascade = this.currentNode.attributes.cascade + this.currentNode.attributes.code + '/';
    		this.addDivisionDialog=true;
    	},
    	formatterStatus(row, column){
    		if(row.status){
    			return "启用";
    		}else{
    			return "停用";
    		}
    	},
    	getUnitList(code) {
				if(typeof(code) == "undefined") {
					code = this.currentNode.attributes.code;
				}
				let para = {
					administrativeAreaCode: code,
					isCascade: this.showChild,
					page: this.page,
					size: this.pageSize
				};
				this.Loading = true;
				getUnitListByCode(para).then((data) => {
					this.tableData = data.rows;
					this.total = data.total;
				});
			},
    	loadTree(){
    		getTreeData().then((data) => {
					this.dataTree = data;
					this.currentNode = data[0];
					this.getUnitList();
				});
    	},
      handleNodeClick(data) {
        this.currentNode = data;
        let para = {
					administrativeAreaLevel: this.currentNode.attributes.level,
					page: 1,
					size: 100
				};
    		getFunctionalByLevel(para).then((data) =>{
    			this.functionalOpts=data.rows;
    		});
				this.getUnitList();
      },
      deleteRecord(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	delUnitById({id:row.id}).then((data) => {
						this.getUnitList();
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
				this.getUnitList();
			},
			handleCurrentChange(val) { //2.分页设置
				this.page = val;
				this.getUnitList();
			}
    },

    mounted() {
    	this.loadTree();
      var childMainHeight = $('.childMain').height();
      this.tableHeight = childMainHeight -76;
    },
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
  
  .childBar .el-tree {
    border: none;
    background: #f6f7fb;
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
  
  .con_main .childMain {
    padding: 10px;
    box-sizing: border-box;
    float: left;
    width:80%;
    height:100%;
    position: relative;
  }
  
  .childMain .handle {
    margin-bottom: 10px;
  }
  .page{position: absolute;bottom: 0;height: 35px;left:10px;right:10px;background:#eef1f6;padding-top: 2px;box-sizing: border-box;}
</style>