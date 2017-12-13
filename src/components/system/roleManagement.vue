<template>
	<div class="con_main">
		<div class="childBar">
			<div class="showChild">
				<h3>角色分类</h3>
			</div>
			<el-menu default-active="1" @select="selectItems" class="el-menu-vertical-demo">
				<el-menu-item v-for="(item,index) in roleTypeOptionsAll" :key="index" :index="item"> {{item}}</el-menu-item>
			</el-menu>
		</div>
		<div class="childMain">
			<div class="handle">
				<el-button type="primary" @click="handleAdd">新增</el-button>
				<el-button type="primary" @click="inputRoleDialog=true">导入</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" :height='tableHeight'>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="name" label="角色名称" width="150">
				</el-table-column>
				<el-table-column prop="code" label="角色代码" width="150">
				</el-table-column>
				<el-table-column prop="type" label="所属分类">
				</el-table-column>
				<el-table-column prop="status" :formatter="formatStatus" label="可用状态" width="100">
				</el-table-column>
				<el-table-column label="操作" width="350">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
						<el-button type="text" size="small" @click="startOrStop(scope.$index, scope.row,false,'停用')">停用</el-button>
						<el-button type="text" size="small" @click="startOrStop(scope.$index, scope.row,true,'启用')">启用</el-button>
						<el-button type="text" size="small" @click="openConnectRolePersonnel(scope.$index, scope.row)">
							关联人员
						</el-button>
						<el-button type="text" size="small" @click="openConnectRolePermission(scope.$index, scope.row)">关联权限</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog :title="title" :visible.sync="addRoleDialog" :close-on-click-modal="false">
			<el-form :model="addForm" ref="addForm" :rules="rules" label-width="120px">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="角色代码" prop="code">
					<el-input v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="type">
					<el-select v-model="addForm.type" filterable allow-create placeholder="请选择">
						<el-option v-for="item in roleTypeOptions" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="addForm.describe" type="textarea" :rows="2"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addRoleDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmitForm">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入" :visible.sync="inputRoleDialog" size='tiny' :close-on-click-modal="false">
			<el-upload class="upload-demo" action="" :file-list="fileList">
				<el-button size="small" type="primary" icon="search">选择文件</el-button>
			</el-upload>
			<a href="#" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板</a>
			<div slot="footer" class="dialog-footer">
				<el-button @click="inputRoleDialog = false">取 消</el-button>
				<el-button type="primary" @click="inputRoleDialog = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="角色用户授权" :visible.sync="rolePersonnelDialog" :close-on-click-modal="false" size="full">
			<el-form :model="roleForm" label-width="70px">
				<el-form-item label="角色名称">
					<el-input v-model="roleForm.name"></el-input>
				</el-form-item>
			</el-form>
			<el-row class="rolehead">
				<el-col :span="4">
					<h5>行政区划结构</h5></el-col>
				<el-col :span="9">
					<h5>待授权账户</h5></el-col>
				<el-col :span="2">
					<h5>操作</h5></el-col>
				<el-col :span="9">
					<h5>已授权账户</h5></el-col>
			</el-row>
			<el-row class="dialog" style="background:#f5f5f5;height:391px;">
				<el-col :span="4" style="height:391px;overflow:auto;">
					<div class="showChild">
						<el-checkbox v-model="showChild" @change="selectAreaTreeNodeList">显示子集</el-checkbox>
					</div>
					<el-tree style="height:348px ;border-right: none;" :data="administrativeDataTree" ref="tree" :highlight-current=true @node-click="areaNodeClick" :default-expand-all=true :expand-on-click-node=false node-key="id" :props="defaultProps">
					</el-tree>
				</el-col>
				<el-col :span="9">
					<el-table :data="waitPerson" @select="selectWaitPersonRow" @select-all="selectWaitPersonAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="name" label="账号" width="180">
						</el-table-column>
						<el-table-column prop="areaCode" label="行政区划">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="2">
					<div style="margin:20px 0 ;">
						<el-button type="primary" icon="arrow-right" @click="toGrant" size="small" style="margin-left:25px;">授权
						</el-button>
					</div>
					<div>
						<el-button type="primary" icon="arrow-left" @click="cancelGrant" size="small" style="margin-left:25px;">移除
						</el-button>
					</div>

				</el-col>
				<el-col :span="9">
					<el-table :data="havePerson" @select="selectHavePersonRow" @select-all="selectHavePersonAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="name" label="账号" width="180">
						</el-table-column>
						<el-table-column prop="areaCode" label="行政区划">
						</el-table-column>
						<el-table-column label="允许转授">
							<template scope="scope">
								<el-switch v-model="havePerson[scope.$index].isTurnGrant"></el-switch>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="rolePersonnelDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveConnectPersonnel">保 存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="角色权限项授权" :visible.sync="rolePermissionDialog" :close-on-click-modal="false" size="full">
			<el-form :model="roleForm" label-width="70px">
				<el-form-item label="角色名称">
					<el-input v-model="roleForm.name"></el-input>
				</el-form-item>
			</el-form>
			<el-row class="rolehead">
				<el-col :span="4">
					<h5>权限组浏览</h5></el-col>
				<el-col :span="9">
					<h5>待选权限项</h5></el-col>
				<el-col :span="2">
					<h5>操作</h5></el-col>
				<el-col :span="9">
					<h5>已选权限项</h5></el-col>
			</el-row>
			<el-row style="background:#f5f5f5;height:391px">
				<el-col :span="4" style="height:391px;overflow:auto;">
					<el-menu style="height:348px ;border-right: none;" default-active="1" @select="selectPermissionItems" class="el-menu-vertical-demo">
						<el-menu-item v-for="(item,index) in permissionTypeOptions" :key="index" :index="item"> {{ item }}</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="9">
					<el-table :data="waitPower" @select="selectWaitPowerRow" @select-all="selectWaitPowerAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="id" label="权限项id" width="100">
						</el-table-column>
						<el-table-column prop="name" label="权限项名称" width="180">
						</el-table-column>
						<el-table-column prop="code" label="权限项标识">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="2">
					<div style="margin:20px 0 ;">
						<el-button type="primary" icon="arrow-right" @click="toPowerGrant" size="small" style="margin-left:25px;">
							授权
						</el-button>
					</div>
					<div>
						<el-button type="primary" icon="arrow-left" @click="cancelPowerGrant" size="small" style="margin-left:25px;">移除
						</el-button>
					</div>

				</el-col>
				<el-col :span="9">
					<el-table :data="havePower" @select="selectHavePowerRow" @select-all="selectHavePowerAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="id" label="权限项id" width="100">
						</el-table-column>
						<el-table-column prop="name" label="权限项名称" width="180">
						</el-table-column>
						<el-table-column prop="code" label="权限项标识">
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="rolePermissionDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveConnectRolePermission">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getRoleTypes,
		getPageByAreaCode,
		saveRole,
		validateRoleCode,
		deleteRoleById,
		updateRoleStatus,
		getTreeData,
		getTreeDataByConnect,
		personnelList,
		getHasConnectPerson,
		getHasNoConnectPerson,
		saveConnectRolePersonnel,
		getPermissionTypes,
		getHasNoConnectPermission,
		getPerssionTypesByConnect,
		getHasConnectPermission,
		saveRolePermissions
	} from '../../api/api';

	export default {
		data() {
			//TODO:
			var validateCodeUnique = (rule, value, callback) => {
				if(value) {
					let para = {
						id: this.addForm.id,
						code: value
					}
					validateRoleCode(para).then((data) => {
						if(!data) {
							callback(new Error('角色代码必须唯一'));
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
				rules: {
					name: [
						{ required: true, message: '必填 ', trigger: 'change' },
						{ min: 1, max: 30, message: '长度在 1到 30个字符', trigger: 'change' }
					],
					type: { required: true, message: '必填 ', trigger: 'change' },
					code: [
						{ required: true, message: '必填 ', trigger: 'change' },
						{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' },
						{ validator: validateCodeUnique, trigger: 'change' }
					]
				},
				addRoleDialog: false,
				inputRoleDialog: false,
				fileList: [],
				rolePermissionDialog: false,
				rolePersonnelDialog: false,
				showChild: false,
				roleTypeOptions: [],
				roleTypeOptionsAll: [],
				addForm: {
					name: '',
					code: '',
					type: '',
					describe:'',
					status: true
				},
				roleForm: {
					roleId: '',
					name: '',
				},
				waitPerson: [],
				havePerson: [],
				waitSelect: [],
				haveSelect: [],
				waitPower: [],
				havePower: [],
				waitPowers: [],
				havePowers: [],
				currentNode: {},
				administrativeDataTree: [],
				permissionTypeOptions: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				permissionType: '',
				roleType: ''
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
			initAddForm() {
				this.addForm = {
					name: '',
					code: '',
					type: '',
					describe:'',
					status: true
				}
			},
			handleAdd() { //新增
				this.initAddForm();
				this.title = "新增";
				this.addRoleDialog = true;
			},
			handleEdit(index, row) { //修改
				this.title = '修改';
				this.addForm = row;
				this.addRoleDialog = true;
			},
			saveSubmitForm() { //保存对象
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						saveRole(this.addForm).then((data) => {
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							this.addRoleDialog = false;
							this.initTypes();
						});
					} else {
						//						this.$message('请确认表单是否填写完整！');
					}
				});
			},
			getListByPage() { //得到分页列表
				let para = {
					type: this.roleType,
					page: this.page,
					size: this.pageSize
				};
				getPageByAreaCode(para).then((data) => {
					this.tableData = data.rows;
					this.total = data.total;
				});
			},
			handleSizeChange(val) { //2.分页设置
				this.pageSize = val;
				this.getListByPage();
			},
			handleCurrentChange(val) { //2.分页设置
				this.page = val;
				this.getListByPage();
			},
			deleteRecord(index, row) {
				if(row.id == 1) { //平台管理员
					this.alertDialog('平台管理员角色不能删除', '提示');
				} else {
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let para = {
							id: row.id,
						};
						deleteRoleById(para).then((data) => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.initTypes();
						});
					}).catch(() => {});
				}

			},
			startOrStop(index, row, status, message) {
				this.$confirm('确定要' + message + '该项吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id,
						status: status,
					};
					updateRoleStatus(para).then((data) => {
						this.$message({
							type: 'success',
							message: '启用成功!'
						});
						this.getListByPage();
					});
				}).catch(() => {});
			},
			openConnectRolePersonnel(index, row) { //打开关联人员
				//TODO:dd
				this.roleForm = {};
				this.roleForm.roleId = row.id;
				this.roleForm.name = row.name;
				getTreeDataByConnect().then((data) => {
					this.administrativeDataTree = data;
					this.currentNode = data[0];
					this.selectAreaTreeNodeList(this.currentNode.attributes.code);
					this.rolePersonnelDialog = true;
				});
			},
			areaNodeClick(data) {
				this.currentNode = data;
				this.selectAreaTreeNodeList(this.currentNode.attributes.code);
			},
			selectAreaTreeNodeList() {
				var waitPerson = [];
				var havePerson = [];
				let NoConnectPara = {
					roleId: this.roleForm.roleId,
					areaCode: this.currentNode.attributes.code,
					isCascade: this.showChild,
				};
				getHasNoConnectPerson(NoConnectPara).then((data) => { //查询未授权的
					waitPerson = data;
					getHasConnectPerson(NoConnectPara).then((data) => { //查询已经授权的 //必须放在这里，否则有时候会错乱
						havePerson = data;
						//this.havePower = data;
						if(havePerson && havePerson.length > 0) {
							for(var i = waitPerson.length - 1; i >= 0; i--) {
								for(var j = 0; j < havePerson.length; j++) {
									if(waitPerson[i].id == havePerson[j].id) {
										waitPerson.splice(i, 1);
										break;
									}
								}
							};
						}
						this.waitPerson = waitPerson; //这样避免左边的列表先显示，然后不显示，导致有时候会错乱
						this.havePerson = havePerson;
					});
				});

			},
			saveConnectPersonnel() { //保存关联人员
				var params = new Set();
				if(this.havePerson && this.havePerson.length > 0) {
					for(let person of this.havePerson) {
						let para = {
							roleId: this.roleForm.roleId,
							personnelId: person.id,
							isTurnGrant: person.isTurnGrant,
							areaCode: this.currentNode.attributes.code,
							isCascade: this.showChild
						};
						params.add(para);
					}
				} else { //当为空的时候，就只删除，不用保存
					var obj = {
						roleId: this.roleForm.roleId,
						areaCode: this.currentNode.attributes.code,
						isCascade: this.showChild
					};
					params.add(obj);
				}
				saveConnectRolePersonnel(params).then((data) => {
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
				});
			},
			selectWaitPersonAll(selection) {
				this.waitSelect = selection;
			},
			selectHavePersonAll(selection) {
				this.haveSelect = selection;
			},
			selectWaitPersonRow(selection, row) {
				this.waitSelect = selection;
			},
			selectHavePersonRow(selection, row) {
				this.haveSelect = selection;
			},
			toGrant() {
				if(!this.waitSelect || this.waitSelect.length == 0) {
					this.alertDialog('请选择需要授权的人员!', '提示');
				}
				for(var obj in this.waitSelect) {
					this.havePerson.push(this.waitSelect[obj]);
				}
				for(var i = this.waitPerson.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.waitSelect.length; j++) {
						if(this.waitPerson[i].id == this.waitSelect[j].id) {
							this.waitPerson.splice(i, 1);
							break;
						}

					}
				}
				this.waitSelect = [];
			},
			cancelGrant() { //取消
				if(!this.haveSelect || this.haveSelect.length == 0) {
					this.alertDialog('请选择需要取消的人员!', '提示');
				}
				for(var obj in this.haveSelect) {
					this.waitPerson.push(this.haveSelect[obj]);
				}
				//删除
				for(var i = this.havePerson.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.haveSelect.length; j++) {
						if(this.havePerson[i].id == this.haveSelect[j].id) {
							this.havePerson.splice(i, 1);
							break;
						}

					}
				}
				this.haveSelect = [];
			},
			openConnectRolePermission(index, row) { //打开关联权限
				//TODO:
				this.roleForm = {};
				this.roleForm.roleId = row.id;
				this.roleForm.name = row.name;
				getPerssionTypesByConnect().then((data) => {
					if(!data || data.length == 0) {
						this.rolePermissionDialog = true;
						return false;
					}
					if(data.length > 1) {
						data.unshift('全部');
					}
					this.permissionTypeOptions = data;
					//查询未授权的
					//查询已经授权的
					this.selectPermissionItems(data[0]);
					this.rolePermissionDialog = true;
				});
			},
			selectPermissionItems(type) {
				if(type == '全部') {
					type = '';
				};
				let para = {
					type: type,
					roleId: this.roleForm.roleId,
				};
				this.permissionType = type;
				var waitPower = [];
				var havePower = [];
				getHasNoConnectPermission(para).then((data) => { //查询未授权的
					waitPower = data;
					//his.waitPower = data;
					getHasConnectPermission(para).then((data) => { //查询已经授权的 //必须放在这里，否则有时候会错乱
						havePower = data;
						//this.havePower = data;
						if(havePower && havePower.length > 0) {
							for(var i = waitPower.length - 1; i >= 0; i--) {
								for(var j = 0; j < havePower.length; j++) {
									if(waitPower[i].id == havePower[j].id) {
										waitPower.splice(i, 1);
										break;
									}
								}
							};
						}
						this.waitPower = waitPower; //这样避免左边的列表先显示，然后不显示，导致有时候会错乱
						this.havePower = havePower;
					});
				});
			},
			saveConnectRolePermission() { //保存
				var params = new Set();
				if(this.havePower && this.havePower.length > 0) {
					for(var power of this.havePower) {
						var obj = {
							roleId: this.roleForm.roleId,
							type: this.permissionType,
							permissionId: power.id
						};
						params.add(obj);
					}
				} else { //当为空的时候，就只删除，不用保存
					var obj = {
						roleId: this.roleForm.roleId,
						type: this.permissionType
					};
					params.add(obj);
				}
				saveRolePermissions(params).then((data) => {
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
				});
			},
			//			saveConnectRolePermission() { //保存
			//				//this.rolePermissionDialog = false;
			//				var params = [];
			//				var obj = {};
			//				if(this.havePower && this.havePower.length > 0) {
			//					for(var power of this.havePower) {
			//						obj.roleId = this.roleForm.roleId;
			//						obj.type = this.permissionType;
			//						obj.permissionId = power.id;
			//						params.push(obj);
			//					}
			//				} else { //当为空的时候，就只删除，不用保存
			//					obj.roleId = this.roleForm.roleId;
			//					obj.type = this.permissionType;
			//					params.push(obj);
			//				}
			//
			//				var para = {
			//					rolePermissionList: JSON.stringify(params)
			//				}
			//				saveRolePermissions(para).then((data) => {
			//					this.$message({
			//						type: 'success',
			//						message: '保存成功!'
			//					});
			//				});
			//			},
			selectWaitPowerAll(selection) {
				this.waitPowers = selection;
			},
			selectHavePowerAll(selection) {
				this.havePowers = selection;
			},
			selectWaitPowerRow(selection, row) {
				this.waitPowers = selection;
			},
			selectHavePowerRow(selection, row) {
				this.havePowers = selection;
			},
			toPowerGrant() {
				if(!this.waitPowers || this.waitPowers.length == 0) {
					this.alertDialog('请选择需要关联的权限!', '提示');
				}
				for(var obj in this.waitPowers) {
					this.havePower.push(this.waitPowers[obj]);
				}
				for(var i = this.waitPower.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.waitPowers.length; j++) {
						if(this.waitPower[i].id == this.waitPowers[j].id) {
							this.waitPower.splice(i, 1);
							break;
						}
					}
				}
				this.waitPowers = [];
			},
			cancelPowerGrant() { //取消
				if(!this.havePowers || this.havePowers.length == 0) {
					this.alertDialog('请选择需要取消的权限!', '提示');
				}
				for(var obj in this.havePowers) {
					this.waitPower.push(this.havePowers[obj]);
				}
				//删除
				for(var i = this.havePower.length - 1; i >= 0; i--) {
					for(var j = 0; j < this.havePowers.length; j++) {
						if(this.havePower[i].id == this.havePowers[j].id) {
							this.havePower.splice(i, 1);
							break;
						}
					}
				}
				this.havePowers = [];
			},
			alertDialog(message, title) { //抽出公共的提示弹出框
				this.$alert(message, title, {
					confirmButtonText: '确定',
					type: 'info',
					callback: action => {}
				});
			},
			selectItems(type) { //点击角色类型
				if(type == '全部') {
					type = '';
				}
				this.roleType = type;
				this.getListByPage();
			},
			getRoleTypeOptions() {
				getRoleTypes().then((data) => {
					console.info(data);
					if(data && data.length > 0) {
						this.roleTypeOptions = data;
						//这个下拉框的值不需要全部，需要分开，不能直接到下面的方法里面赋值，否则会互相影响,
						//返回的data赋值给两个变量，其中一个变量多添加一个值，另一个变量也随着多了一个值，所以这里就分开了
					}
				});
			},
			initTypes() {
				getRoleTypes().then((data) => {
					if(data && data.length > 0) {
						if(data.length > 1) {
							data.unshift('全部');
						}
						this.roleTypeOptionsAll = data;
						this.selectItems(data[0]);
					}
				});
				this.getRoleTypeOptions(); //初始化下拉框的值
			}
		},
		mounted() {
			//TODO:
			this.initTypes();
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