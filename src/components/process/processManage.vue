<template>
	<div class="con_main">
		<div class="childBar">
			<el-tree :data="dataTree" ref="tree" @node-click="handleNodeClick" :default-expand-all=true :expand-on-click-node=false node-key="id" :props="defaultProps">
			</el-tree>
		</div>
		<div class="childMain">
			<div class="handle">
				<el-button type="primary" @click="openAddProcessDialog">新增</el-button>
				<el-button type="primary" @click="">导入</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="180"></el-table-column>
				<el-table-column prop="code" label="编码"></el-table-column>
				<el-table-column prop="mode" label="类型" width="180" :formatter="formatterMode"></el-table-column>
				<el-table-column label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
						<el-button type="text" size="small" @click="openProcessDesignDialog(scope.$index, scope.row)">设计</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[2,10,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="新增" :visible.sync="addProcessDialog" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px">
				<el-form-item label="名称">
					<el-input v-model="addForm.name" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="编码">
					<el-input v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-input v-model="addForm.mode"></el-input>
				</el-form-item>
				<el-form-item label="说明">
					<el-input v-model="addForm.description" :readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addProcessDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入" :visible.sync="importProcessDialog" size='tiny' :close-on-click-modal="false">
			<el-upload class="upload-demo" action="" :file-list="fileList">
				<el-button size="small" type="primary" icon="search">选择文件</el-button>
			</el-upload>
			<a href="#" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板</a>
			<div slot="footer" class="dialog-footer">
				<el-button @click="importProcessDialog = false">取 消</el-button>
				<el-button type="primary" @click="importProcessDialog = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="editProcessDialog" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px">
				<el-form-item label="名称" :readonly="true">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="编码">
					<el-input v-model="editForm.code"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-input v-model="editForm.mode"></el-input>
				</el-form-item>
				<el-form-item label="说明" :readonly="true">
					<el-input v-model="editForm.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editProcessDialog = false">取 消</el-button>
				<el-button type="primary" @click="editSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="流程设计" :visible.sync="processDesignDialog" :close-on-click-modal="false" size="full">
			<div v-bind:class="{height:divHeight}">
				<el-row >
				  <el-col :span="24">
				  	<div style="height:50px;background: #D1DBE5;"></div>
				  </el-col>
				</el-row>
				<el-row >
				  <el-col :span="2"><div style="height: 480px;background: #20A0FF;"></div></el-col>
				  <el-col :span="11"><div style="height: 400px;background: #EAEAEA;"></div></el-col>
				  <el-col :span="11"><div style="height: 400px;background: #FF0000;"></div></el-col>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				total: 0,
				tableHeight: '',
				showChild: false,
				childMainWidth: '',
				currentNode: {},
				dataTree: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				tableData: [],
				addProcessDialog: false,
				importProcessDialog: false,
				editProcessDialog: false,
				processDesignDialog: false,
				fileList: [],
				addForm: {
					id: '',
					name: '',
					code: '',
					mode: '',
					description: ''
				},
				editForm: {},
				divHeight:'0px'
			};
		},
		created: function() {
			this.tableData = [{'id':1,'name':'测试','code':'test','mode':1,'description':'这是个演示！'}];
			this.total = 1;
		},
		methods: {
			openAddProcessDialog() {
				this.addForm.id = '';
				this.addForm.name = '';
				this.addForm.code = '';
				this.addForm.mode = '';
				this.addForm.description = '';

				this.addProcessDialog = true;
			},
			openProcessDesignDialog() {
				this.divHeight = '500px';
				this.processDesignDialog = true;
			},
			formatterMode(row,cloumn){
				var ret = '';
				if(row.mode == '1'){
					ret = '三级';
				}
				if(row.mode == '1'){
					ret = '两级';
				}
				return ret;
			}
		},
		mounted() {
			var childMainHeight = $('.childMain').height();
			this.tableHeight = childMainHeight - 76;
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
		width: 80%;
		height: 100%;
		position: relative;
	}
	
	.childMain .handle {
		margin-bottom: 10px;
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
	.design{
		background: #eef1f6;
		border: 1px #20A0FF solid;
		height: 450px;
	}
</style>