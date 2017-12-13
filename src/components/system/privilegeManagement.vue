<template>
	<div class="con_main">
		<div class="childBar">
			<div class="showChild">
				<h3>权限分类</h3>
			</div>
			<el-menu default-active="0" @select="selectItems" class="el-menu-vertical-demo">
				<el-menu-item v-for="(item,index) in permissionTypeOptionsAll" :key="index" :index="item"> {{ item }}</el-menu-item>
			</el-menu>
		</div>
		<div class="childMain">
			<div class="handle">
				<el-button type="primary" @click="addPermission">新增</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="code" label="权限代码" width="100">
				</el-table-column>
				<el-table-column prop="name" label="权限名称" width="100">
				</el-table-column>
				<el-table-column prop="includeResourceRul" label="包含资源" width="150">
				</el-table-column>
				<el-table-column prop="excludeResourceRul" label="不包含资源" width="150">
				</el-table-column>
				<el-table-column prop="describe" label="备注">
				</el-table-column>
				<el-table-column prop="type" label="所属分类" width="100">
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
						<el-button type="text" size="small" @click="associationRoleDialog=true">关联角色</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="新增" :visible.sync="addPermissionDialog" :close-on-click-modal="false">
			<el-form :model="addForm" ref="addForm" :rules="rules" label-width="120px">
				<el-form-item label="权限名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="权限代码" prop="code">
					<el-input v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="type">
					<el-select v-model="addForm.type" filterable allow-create placeholder="请选择">
						<el-option v-for="item in permissionTypeOptions" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="addForm.describe" type="textarea" :rows="2"></el-input>
				</el-form-item>
				<el-form-item label="包含资源" prop="includeResourceRul">
					<el-select v-model="includeResourceRuls" @change="changeResource" multiple filterable allow-create placeholder="请选择">
						<el-option v-for="item in includeResourceAll" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排斥资源">
					<el-select v-model="excludeResourceRuls" multiple filterable allow-create placeholder="请选择">
						<el-option v-for="item in excludeResourceAll" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addPermissionDialog = false">取 消</el-button>
				<el-button type="primary" @click="savePermission">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="权限关联角色" :visible.sync="associationRoleDialog" :close-on-click-modal="false" size="full">
			<el-form :model="roleForm" label-width="70px">
				<el-form-item label="当前权限项">
					<el-input v-model="roleForm.name"></el-input>
				</el-form-item>
			</el-form>
			<el-row class="rolehead">
				<el-col :span="4">
					<h5>角色组浏览</h5></el-col>
				<el-col :span="9">
					<h5>待授权角色</h5></el-col>
				<el-col :span="2">
					<h5>操作</h5></el-col>
				<el-col :span="9">
					<h5>已授权角色</h5></el-col>
			</el-row>
			<el-row style="background:#f5f5f5;height:391px">
				<el-col :span="4" style="height:391px;overflow:auto;">
					<el-tree style="height:388px ;border-right: none;" :data="powerKind" default-expand-all show-checkbox :default-checked-keys="[1-1]" node-key="id" @node-click="handleNodeClick"></el-tree>
				</el-col>
				<el-col :span="9">
					<el-table :data="waitPower" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="name" label="角色名称" width="180">
						</el-table-column>
						<el-table-column prop="code" label="角色标识">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="2">
					<div style="margin:20px 0 ;">
						<el-button type="primary" icon="arrow-right" size="small" style="margin-left:25px;">授权</el-button>
					</div>
					<div>
						<el-button type="primary" icon="arrow-left" size="small" style="margin-left:25px;">移除</el-button>
					</div>

				</el-col>
				<el-col :span="9">
					<el-table :data="havePower" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="name" label="角色名称" width="180">
						</el-table-column>
						<el-table-column prop="code" label="角色标识">
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="associationRoleDialog = false">取 消</el-button>
				<el-button type="primary" @click="associationRoleDialog = false">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getPermissionTypes,
		getPermissionPageByType,
		savePermission,
		deletePermissionById,
		validatePermissionCode
	} from '../../api/api';

	export default {
		data() {
			var validateCodeUnique = (rule, value, callback) => {
				if(value) {
					let para = {
						id: this.addForm.id,
						code: value
					}
					console.info(value);
					validatePermissionCode(para).then((data) => {
						if(!data) {
							callback(new Error('权限代码必须唯一'));
						} else {
							callback();
						}
					});
				} else {
					callback();
				}
			};
			//TODO:
			return {
				page: 1,
				pageSize: 10,
				total: 0,
				tableHeight: '',
				tableData: [],
				addPermissionDialog: false,
				editPermissionDialog: false,
				associationRoleDialog: false,
				rules: {
					name: [
						{ required: true, message: '必填 ', trigger: 'change' }
					],
					code: [
						{ required: true, message: '必填 ', trigger: 'change' },
						{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' },
						{ validator: validateCodeUnique, trigger: 'change' }
					],
					type: [
						{ required: true, message: '必填 ', trigger: 'change' }
					],
					includeResourceRul: [
						{ required: true, message: '必填 ', trigger: 'change' }
					]
				},
				addForm: {
					id: '',
					name: '',
					code: '',
					type: '',
					describe: '',
					includeResourceRul: '',
					excludeResourceRul: '',
				},
				includeResourceRuls: [],
				excludeResourceRuls: [],
				includeResourceAll: [],
				excludeResourceAll: [],
				permissionTypeOptions: [],
				permissionTypeOptionsAll:[],
				roleForm: {
					name: '',
				},
				powerKind: [],
				waitPower: [],
				havePower: []
			};
		},
		methods: {
			initAddForm() {
				this.addForm = {
					id: '',
					name: '',
					code: '',
					type: '',
					describe: '',
					includeResourceRul: '',
					excludeResourceRul: ''
				};
				this.includeResourceRuls = [];
				this.excludeResourceRuls = [];
			},
			handleSizeChange(val) { //2.分页设置
				this.pageSize = val;
				this.getPermissionList();
			},
			handleCurrentChange(val) { //2.分页设置
				this.page = val;
				this.getPermissionList();
			},
			getPermissionList() {
				let para = {
					page: this.page,
					size: this.pageSize
				};
				getPermissionPage(para).then((data) => {
					this.tableData = data.rows;
					this.total = data.total;
				});
			},
			handleNodeClick(data) {
				console.log(data);
			},
			addPermission() {
				this.initAddForm(); //初始化表格
				this.addPermissionDialog = true;
			},
			handleEdit(index, row) {
				this.addForm = row;
				if(row.includeResourceRul) {
					this.includeResourceRuls = row.includeResourceRul.split(",");
				}
				if(row.excludeResourceRul) {
					this.excludeResourceRuls = row.excludeResourceRul.split(",");
				}
				this.addPermissionDialog = true;
			},
			savePermission() {
				if(this.includeResourceRuls) {
					this.addForm.includeResourceRul = this.includeResourceRuls.join(",");
				}
				if(this.excludeResourceRuls) {
					this.addForm.excludeResourceRul = this.excludeResourceRuls.join(",");
				}
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						savePermission(this.addForm).then((data) => {
							this.addPermissionDialog = false;
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							this.init();
						});
					} else {

					}
				});
			},
			deleteRecord(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id,
					};
					deletePermissionById(para).then((data) => {
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
			changeResource(value){
				if(value) {
					this.addForm.includeResourceRul = value.join(",");
				}
			},
			selectItems(type) {
				if(type == '全部') {
					type = '';
				}
				let para = {
					type: type,
					page: this.page,
					size: this.pageSize
				};
				getPermissionPageByType(para).then((data) => {
					if(data&&data.rows){
						this.tableData = data.rows;
						this.total = data.total;
					}

				});
			},
			getPermissionTypeOptions(){
				getPermissionTypes().then((data) => {
					if(data && data.length > 0) {
						this.permissionTypeOptions = data;
					}
				});
			},
			init() {
				getPermissionTypes().then((data) => {
					if(data && data.length > 0) {
						if(data.length>1){
							data.unshift('全部');
						}
						this.permissionTypeOptionsAll = data;
						this.selectItems(data[0]);
					}
				});
				this.getPermissionTypeOptions(); //初始化下拉框的值
			}
		},
		mounted() {
			//TODO:
			this.init();
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
		height: 100%;
		position: relative;
	}

	.childMain .handle {
		margin-bottom: 10px;
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
