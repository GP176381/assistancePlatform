<template>
	<div class="con_main">
		<div class="childBar">
			<div class="showChild">
				<el-checkbox v-model="showChild" @change="changeChild">显示子集</el-checkbox>
			</div>
			<el-tree :data="dataTree" highlight-current ref="tree" @node-click="handleNodeClick" :default-expand-all=true :expand-on-click-node=false node-key="id" :props="defaultProps">
			</el-tree>
		</div>
		<div class="childMain">
			<div class="handle">
				<el-button type="primary" @click="addPersonnel()">新增</el-button>
				<el-button type="primary" @click="inputDivisionDialog=true">导入</el-button>
				<el-button type="primary" :disabled="checkboxValue" @click="movePersonnel()">移动至</el-button>
			</div>
			<el-table ref="multipleTable" :data="tableData" @selection-change="changeForm" border style="width: 100%" :height='tableHeight' @sort-change="sortChange">
				<el-table-column type="selection" width="60">
				</el-table-column>
				<el-table-column type="index" width="60">
				</el-table-column>
				<!--<el-table-column prop="uuid" label="uuid" width="100">
				</el-table-column>
				<el-table-column prop="areaId" label="areaId" width="100">
				</el-table-column>-->
				<el-table-column prop="name" label="中文名" width="100">
				</el-table-column>
				<el-table-column prop="loginName" sortable="custom" label="登录名" width="120">
				</el-table-column>
				<el-table-column prop="passwordPolicy" label="密码策略" width="220" :formatter="formatterPassPolicy">
				</el-table-column>
				<el-table-column prop="mobilePhone" label="手机号" width="150">
				</el-table-column>
				<el-table-column prop="personNumber" sortable="custom" label="人员编码" width="150">
				</el-table-column>
				<el-table-column prop="status" label="可用状态" width="150" :formatter="formatterStatus">
				</el-table-column>
				<el-table-column prop="sortNo" label="排序号" width="120">
				</el-table-column>
				<el-table-column prop="unitId" label="所属单位" width="150">
				</el-table-column>
				<el-table-column prop="areaCode" label="所属行政区划" width="150">
				</el-table-column>
				<el-table-column label="操作" width="270" fixed="right">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button type="text" size="small" @click="handleUpdate(scope.$index, scope.row,false)">停用</el-button>
						<el-button type="text" size="small" @click="handleUpdate(scope.$index, scope.row,true)">启用</el-button>
						<el-button type="text" size="small" @click="connectRole(scope.$index, scope.row)">关联角色</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5,15,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog :title="title" :visible.sync="addPersonnelDialog" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
				<el-form-item label="所属行政区划">
					<el-input v-model="currentNode.text" readonly></el-input>
				</el-form-item>
				<el-form-item label="中文名" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="登录名" prop="loginName">
					<el-input v-model="addForm.loginName"></el-input>
				</el-form-item>
				<!--<el-form-item label="手机号" prop="mobilePhone">-->
				<el-form-item label="手机号" prop="mobilePhone">
					<el-input v-model="addForm.mobilePhone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="排序号">
					<!--<el-input v-model="addForm.sortNo"></el-input>-->
					<template>
						<el-input-number v-model="addForm.sortNo" :min="1" :max="10"></el-input-number>
					</template>
				</el-form-item>
				<el-form-item label="密码策略">
					<el-select v-model="addForm.passwordPolicy">
						<el-option v-for="item in passwordPolicys" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属单位">
					<el-select v-model="addForm.unitId">
						<el-option v-for="item in unitList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addPersonnelDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmitForm()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入" :visible.sync="inputDivisionDialog" size='tiny' :close-on-click-modal="false">
			<el-upload class="upload-demo" :on-success="uploadSuccess" :data="uploadData" action="http://192.168.1.86:9999/file/uploadFile" :on-change="handleChange" :file-list="fileList">
				<el-button size="small" type="primary" icon="search">选择文件</el-button>
			</el-upload>
			<a href="/static/person_import_templet.xlsx" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板</a>
			<a href="http://localhost:8004/fileMng/download/913be16f-ad0e-40ea-bb1e-4c04ff9cea2e.shtml" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板2</a>
			<div slot="footer" class="dialog-footer">
				<el-button @click="inputDivisionDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitImport">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="人员角色授权" :visible.sync="connectRoleDialog" :close-on-click-modal="false" size="full">
			<el-form :model="PersonnelForm" label-width="70px">
				<el-form-item label="人员名称">
					<el-input v-model="PersonnelForm.name"></el-input>
				</el-form-item>
			</el-form>
			<el-row class="rolehead">
				<el-col :span="4">
					<h5>角色分类</h5></el-col>
				<el-col :span="9">
					<h5>待选角色</h5></el-col>
				<el-col :span="2">
					<h5>操作</h5></el-col>
				<el-col :span="9">
					<h5>已选角色</h5></el-col>
			</el-row>
			<el-row style="background:#f5f5f5;height:391px">
				<el-col :span="4" style="height:391px;overflow:auto;">
					<el-menu default-active="1" @select="selectRoleItems" class="el-menu-vertical-demo">
						<el-menu-item v-for="item in roleTypes" :key="item" :index="item">{{item}}</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="9">
					<el-table ref="waitTable" :data="waitRole" @select="selectWaitRoleRow" @select-all="selectWaitRoleAll" border style="width: 100%" height="390">
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
						<el-button type="primary" @click="toGrant" icon="arrow-right" size="small" style="margin-left:25px;">授权</el-button>
					</div>
					<div>
						<el-button type="primary" @click="cancelGrant" icon="arrow-left" size="small" style="margin-left:25px;">移除</el-button>
					</div>

				</el-col>
				<el-col :span="9">
					<el-table ref="haveTable" :data="haveRole" @select="selectHaveRoleRow" @select-all="selectHaveRoleAll" border style="width: 100%" height="390">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="name" label="角色名称" width="180">
						</el-table-column>
						<el-table-column prop="code" label="角色标识">
						</el-table-column>
						<el-table-column label="允许转授">
							<template scope="scope">
								<el-switch v-model="haveRole[scope.$index].isTurnGrant"></el-switch>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="connectRoleDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveConnectRole">保 存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="移动" size="tiny" :visible.sync="movePersonnelDialog" :close-on-click-modal="false">
			<div class='treeSelect'>
				<el-tree :data="dataTree" highlight-current ref="tree" @node-click="selectNodeClick" :default-expand-all=true :expand-on-click-node=false node-key="id" :props="defaultProps">
				</el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="movePersonnelDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveMove()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>import { personnelPageList, personnelList, getPersonnelById, getUnitList, validateLoginName, validatePhone, savePersonnel, delPersonnelById, updatePersonnelStatus, updatePersonnelStatus2, importPersonnel } from '../../api/api';
import { getTreeData, saveRolePersonnel, getHasNoConnectRoleTypes, getHasNoConnectRole, getHasConnectRole } from '../../api/api';
import { getPageByAreaCodeAndType } from '../../api/api';
import { movePersonnel } from '../../api/apiHlx';
export default {
	data() {
		var validatePhoneUnique = (rule, value, callback) => {
			if(value) {
				let para = {
					id: this.addForm.id,
					phone: value
				}
				validatePhone(para).then((data) => {
					if(!data) {
						callback(new Error('手机号必须唯一，此手机号已存在'));
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
			value6: '',
			page: 1,
			pageSize: 5,
			total: 0,
			sortProp: 'id',
			order: 'descending',
			title: '新增',
			showChild: false,
			tableHeight: '',
			currentNode: {},
			dataTree: [],
			rules: {
				name: [
					{ required: true, message: '必填 ', trigger: 'change' },
					{ min: 1, max: 30, message: '长度在 1到 30个字符', trigger: 'change' }
				],
				loginName: [
					{ required: true, message: '必填 ', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' }
				],
				sort: '',
				mobilePhone: { validator: validatePhoneUnique, trigger: 'change' }
			},
			dataTree: [],
			defaultProps: {
				children: 'children',
				label: 'text'
			},
			tableData: [],
			passwordPolicys: [{
				value: 1,
				label: '默认初始密码'
			}, {
				value: 2,
				label: '使用随机密码并发短信至手机'
			}],
			addPersonnelDialog: false,
			inputDivisionDialog: false,
			movePersonnelDialog: false,
			fileList: [],
			connectRoleDialog: false,
			addForm: {},
			unitList: [],
			PersonnelForm: {},
			roleTypes: [],
			waitRole: [],
			haveRole: [],
			waitRoles: [],
			haveRoles: [],
			roleType: '',
			fileList: [],
			importFiles: {},
			uploadData: {
				appId: '2',
			},
			checkFormData: [],
			selectMoveNode: {},
			checkboxValue: false
		};
	},
	methods: {
		submitImport() {
			importPersonnel(this.importFiles).then((data) => {
				this.$message({
					message: '导入成功',
					type: 'success'
				});
				this.inputDivisionDialog = false;
			});
		},
		uploadSuccess(response, file, fileList) {
			console.info(file);
			console.info(response);
			this.importFiles = response;
		},
		handleChange(file, fileList) {
			this.fileList = fileList.slice(-3);
		},
		initPersonnelDto() {
			this.addForm = {
				id: '',
				name: '',
				loginName: '',
				mobilePhone: '',
				email: '',
				sortNo: 1,
				passwordPolicy: 1,
				status: true,
				isMobileAccess: true,
				areaCode: '',
				areaCascade: '',
				unitId: ''
				//					createTime:new Date(),
				//					updateTime:new Date()
			};
		},
		addPersonnel() { //新增
			this.initPersonnelDto(); //初始化表单，重置表单
			this.title = "新增";
			this.getUnitList();
			this.addPersonnelDialog = true;
		},
		handleEdit(index, row) {
			getPersonnelById({ id: row.id }).then((data) => { //这里必须要查，因为row的值不能保证全部
				this.addForm = data;
				this.title = "修改";
				this.getUnitList();
				this.addPersonnelDialog = true;
			});
		},
		saveSubmitForm() { //保存对象
			this.addForm.areaId = this.currentNode.id;
			this.addForm.areaCode = this.currentNode.attributes.code;
			this.addForm.areaCascade = this.currentNode.attributes.cascade + this.currentNode.attributes.code + "/";
			this.$refs.addForm.validate((valid) => {
				if(valid) {
					savePersonnel(this.addForm).then((data) => {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.addPersonnelDialog = false;
						this.getPersonnelList();
					});
				} else {
					//						this.$message('请确认表单是否填写完整！');
				}
			});
		},
		handleNodeClick(data) { //点击树节点
			this.currentNode = data;
			this.getPersonnelList(this.currentNode.attributes.code);
		},
		changeChild() {
			this.getPersonnelList();
			//禁用移动按钮
			this.checkboxValue = !this.checkboxValue;
		},
		sortChange(column) {
			console.info(column);
			if(column.prop) {
				if(column.order == 'descending') {
					this.order = "DESC"
				} else {
					this.order = "ASC"
				}
				this.sortProp = column.prop;
				//		    		this.order=column.order;
				this.getPersonnelList();
			}
		},
		getPersonnelList(code) {
			if(!code) {
				code = this.currentNode.attributes.code;
			}
			let para = {
				areaCode: code,
				isCascade: this.showChild,
				page: this.page,
				size: this.pageSize,
				sortProp: this.sortProp,
				order: this.order
			};
			this.Loading = true;
			personnelPageList(para).then((data) => {
				this.tableData = data.rows;
				this.total = data.total;
			});
		},
		selectRoleItems(type) { //选中分类
			if(type == '全部') {
				type = '';
			};
			this.roleType = type; //保存的时候用
			var waitRole = [];
			var haveRole = [];
			getHasNoConnectRole({ type: type }).then((data) => {
				waitRole = data;
				getHasConnectRole({ type: type, personnelId: this.PersonnelForm.id }).then((data) => { //必须放在这里，否则有时候会错乱
					haveRole = data;
					if(haveRole && haveRole.length > 0) {
						for(var i = waitRole.length - 1; i >= 0; i--) {
							for(var j = 0; j < haveRole.length; j++) {
								if(waitRole[i]) {
									if(waitRole[i].id == haveRole[j].id) {
										waitRole.splice(i, 1);
									}
								}
							}
						};
					}
					this.waitRole = waitRole; //这样避免左边的列表先显示，然后不显示，导致有时候会错乱
					this.haveRole = haveRole;
				});
			});
		},
		connectRole(index, row) { //打开关联角色dialog
			//TODO
			this.PersonnelForm = row;
			getHasNoConnectRoleTypes().then((data) => {
				if(!data || data.length == 0) {
					this.connectRoleDialog = true;
					return false;
				}
				this.roleTypes = data;
				this.selectRoleItems(data[0]);
				this.connectRoleDialog = true;
			});
		},
		saveConnectRole() { //保存关联角色
			//this.associationRoleDialog = false;
			var params = new Set();
			if(this.haveRole && this.haveRole.length > 0) {
				for(var role of this.haveRole) {
					var obj = {
						personnelId: this.PersonnelForm.id,
						roleId: role.id,
						type: this.roleType,
						isTurnGrant: role.isTurnGrant
					};
					params.add(obj);
				}
			} else { //当为空的时候，就只删除，不用保存
				var obj = {
					personnelId: this.PersonnelForm.id,
					type: this.roleType
				};
				params.add(obj);
			}
			saveRolePersonnel(params).then((data) => {
				this.$message({
					type: 'success',
					message: '保存成功!'
				});
			});
		},
		selectWaitRoleAll(selection) {
			this.waitRoles = selection;
		},
		selectHaveRoleAll(selection) {
			this.haveRoles = selection;
		},
		selectWaitRoleRow(selection, row) {
			this.waitRoles = selection;
		},
		selectHaveRoleRow(selection, row) {
			this.haveRoles = selection
			//				this.haveRoles.push(row);
		},
		toGrant() {
			if(!this.waitRoles || this.waitRoles.length == 0) {
				this.alertDialog('请选择需要授权的角色!', '提示');
			}
			for(var obj in this.waitRoles) {
				console.info(this.waitRoles[obj]);
				this.haveRole.push(this.waitRoles[obj]);
			}
			//删除
			for(var i = this.waitRole.length - 1; i >= 0; i--) {
				for(var j = 0; j < this.waitRoles.length; j++) {
					if(this.waitRole[i].id == this.waitRoles[j].id) {
						this.waitRole.splice(i, 1);
						break;
					}
				}
			}
			this.waitRoles = [];
		},
		cancelGrant() { //取消
			if(!this.haveRoles || this.haveRoles.length == 0) {
				this.alertDialog('请选择需要取消的角色!', '提示');
			}
			for(var obj in this.haveRoles) {
				console.info(obj);
				this.waitRole.push(this.haveRoles[obj]);
			}
			//删除
			for(var i = this.haveRole.length - 1; i >= 0; i--) {
				for(var j = 0; j < this.haveRoles.length; j++) {
					if(this.haveRole[i].id == this.haveRoles[j].id) {
						this.haveRole.splice(i, 1);
						break;
					}
				}
			}
			this.haveRoles = [];
		},
		alertDialog(message, title) { //抽出公共的提示弹出框
			this.$alert(message, title, {
				confirmButtonText: '确定',
				type: 'info',
				callback: action => {}
			});
		},
		handleDelete(index, row) {
			this.$confirm('确定要删除吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let para = {
					id: row.id
				};
				delPersonnelById(para).then((data) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getPersonnelList();
				});
			}).catch(() => {

			});
		},
		handleUpdate(index, row, status) { //停用或启用
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
				updatePersonnelStatus2(para).then((data) => {
					this.$message({
						message: '成功' + messageTip,
						type: 'success'
					});
					this.getPersonnelList();
				});
			}).catch(() => {

			});
		},
		handleSizeChange(val) { //2.分页设置
			this.pageSize = val;
			this.getPersonnelList();
		},
		handleCurrentChange(val) { //2.分页设置
			this.page = val;
			this.getPersonnelList();
		},
		changeForm(val) { //选中多条数据，--进行移动
			//TODO : 人的行政区划必须相同才能一起移动，
			//这里有几个方案，一种是在级联的时候移动按钮不能点击，一种是控制只有行政区划形同的人员才能点击,还有一种就是不控制
			//加确认对话框
			//暂时采用第一种方案，级联的时候禁用移动按钮
			this.checkFormData = val; //选中数据
		},
		movePersonnel() { //移动至
			if(!this.checkFormData || this.checkFormData.length == 0) {
				this.alertDialog('您还没有选择要移动的人员!', '提示');
				return;
			}
			this.movePersonnelDialog = true;
		},
		selectNodeClick(data) { //选中移动的树节点
			//不能选中的是这批人的树节点
			this.selectMoveNode = data;
			if(data.attributes.code == this.currentNode.attributes.code) {
				this.alertDialog('新行政区划与原行政区划不能相同!', '提示');
				return;
			}
			//得到人的ids,和树节点的code
		},
		saveMove() { //保存移动
			//data.attributes.code
			//ids
			//ids.join(",");
			var ids = [];
			for(let i in this.checkFormData) {
				console.info("----------");
				console.info(this.checkFormData[i].id);
				ids.push(this.checkFormData[i].id);
			}
			var param = {
				ids: ids.join(","),
				areaCode: this.selectMoveNode.attributes.code
			}
			movePersonnel(param).then((data) => {
				this.$alert("移动成功,请重新给移动的这批人员赋予权限!", "提示", {
					confirmButtonText: '确定',
					type: 'info',
					callback: action => {
						this.movePersonnelDialog = false;
						//刷新列表
						this.getPersonnelList();
					}
				});
				//this.alertDialog('移动成功,请重新给移动的这批人员赋予权限!', '提示');
			});
		},
		formatterPassPolicy(row, column) {
			if(row.passwordPolicy == '2') {
				return "短信密码";
			} else {
				return "默认初始化秘密";
			}
		},
		formatterStatus(row, column) {
			if(row.status) {
				return "启用";
			} else {
				return "停用";
			}
		},
		getUnitList() {
			let para = {
				areaCode: this.currentNode.attributes.code
			};
			this.Loading = true;
			console.info(this.currentNode.attributes.code);
			getUnitList(para).then((data) => {
				this.unitList = data;
			});
		},
		init() {
			getTreeData(1).then((data) => {
				this.dataTree = data;
				this.currentNode = data[0];
				this.getPersonnelList(this.currentNode.attributes.code);
			});
		}
	},
	mounted() {
		//TODO:
		this.init();
		var childMainHeight = $('.childMain').height();
		this.tableHeight = childMainHeight - 76;
	}
}</script>

<style scoped>
	.con_main {
		height: 100%;
		position: relative;
	}
	
	.el-select {
		display: block;
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
	
	.treeSelect {
		width: 100%;
		height: 300px;
		border: 1px solid #EAEAEA;
		/*float: left;*/
		/*background: #f6f7fb;*/
		overflow: auto;
	}
	
	.el-tree {
		border: 0px solid #d1dbe5;
		/* border: 1px solid #d1dbe5; */
	}
</style>