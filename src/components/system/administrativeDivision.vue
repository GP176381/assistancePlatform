<template>
	<div class="con_main">
		<div class="childBar">
			<div class="showChild">
				<el-checkbox v-model="showChild" @change="changeChild">显示子集</el-checkbox>
			</div>
			<el-tree :data="dataTree" highlight-current ref="tree" @node-click="handleNodeClick" :expand-on-click-node=false node-key="id" :props="defaultProps"  default-expand-all>
			</el-tree>
		</div>
		<div class="childMain">
			<div class="handle">
				<el-button type="primary" @click="openAddDivisionDialog">新增</el-button>
				<el-button type="primary" @click="inputDivisionDialog=true">导入</el-button>
				 <el-button type="primary" @click="download">下载</el-button>
			</div>
			<el-table v-loading.fullscreen.lock="loading2" element-loading-text="请稍等，导入中..." :data="tableData" border style="width: 100%" :height='tableHeight'>
				<el-table-column type="index" width="55">
				</el-table-column>
				<el-table-column prop="code" label="行政区划编码" width="180">
				</el-table-column>
				<el-table-column prop="name" label="行政区划名称">
				</el-table-column>
				<el-table-column prop="level" label="级别" width="180" :formatter="formatterLevel">
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="deleteRecord(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="新增" :visible.sync="addDivisionDialog" :close-on-click-modal="false" @close="closeDialog">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="130px">
				<el-form-item label="上级行政区划">
					<el-input v-model="addForm.topName" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="上级行政区划编码 ">
					<el-input v-model="addForm.topCode" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="行政区划名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="行政区划编码" prop="code">
					<el-input v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="行政区划级别">
					<el-input v-model="addForm.levelName" :readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDivisionDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导入" :visible.sync="inputDivisionDialog" size='tiny' :close-on-click-modal="false">
			<el-upload class="upload-demo" :on-success="uploadSuccess" :data="uploadData" action="http://192.168.1.86:9999/file/uploadFile" :on-change="handleChange" :file-list="fileList">
				<el-button size="small" type="primary" icon="search">选择文件</el-button>
			</el-upload>
			<a href="/static/area_import_templet.xlsx" style="margin-top: 20px;text-decoration: underline;display: block;">下载模板</a>
			<div slot="footer" class="dialog-footer">
				<el-button @click="inputDivisionDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitImport">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="editDivisionDialog" :close-on-click-modal="false" @close="closeDialog">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px">
				<el-form-item label="上级行政区划">
					<el-input v-model="editForm.topName" readonly></el-input>
				</el-form-item>
				<el-form-item label="行政区划名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="行政区划编码" >
					<el-input v-model="editForm.code" readonly></el-input>
				</el-form-item>
				<el-form-item label="行政区划级别">
					<el-input v-model="editForm.levelName" readonly></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDivisionDialog = false">取 消</el-button>
				<el-button type="primary" @click="editSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { isexitCode, getAdministrativeDivision, getTreeData, saveAdministrativeDivision, getAreaById, delAreaById, importArea } from '../../api/api';

	export default {
		data() {
			var validateCodeUnique = (rule, value, callback) => {
				if(value) {
					var pLevel = this.currentNode.attributes.level;
					var pCode = this.currentNode.attributes.code;
					var flag = false;
					if(pLevel == "1") {
						if(value.length != 6) {
							callback(new Error('地市行政区划代码长度为6位数字！'));
							return;
						}
						if(pCode.substring(0, 2) != value.substring(0, 2)) {
							callback(new Error("编码格式错误，前两位需与上级相同！"));
						}
						if("00" != value.substring(4, 6)) {
							callback(new Error("编码格式错误，后两位需为0！"));
						}
						flag = true;
					} else if(pLevel == "2") {
						if(value.length != 6) {
							callback(new Error('区县行政区划代码长度为6位数字！'));
						}
						if(pCode.substring(0, 4) != value.substring(0, 4)) {
							callback(new Error("编码格式错误，前4位需与上级相同！"));
						}
						flag = true;
					} else if(pLevel == "3") {
						if(value.length != 9) {
							callback(new Error('乡镇/街道行政区划代码长度为9位数字！'));
						}
						if(pCode.substring(0, 6) != value.substring(0, 6)) {
							callback(new Error("编码格式错误，前6位需与上级相同！"));
						}
						flag = true;
					} else if(pLevel == "4") {
						if(value.length != 12) {
							callback(new Error('村社行政区划代码长度为12位数字！'));
						}
						if(pCode.substring(0, 9) != value.substring(0, 9)) {
							callback(new Error("编码格式错误，前9位需与上级相同！"));
						}
						flag = true;
					}
					if(flag) {
						isexitCode({ "code": value }).then((data) => {
							if(data) {
								callback(new Error('行政区划编码已存在！'));
							} else {
								callback();
							}
						});
					}

				} else {
					callback();
				}
			};
			//TODO
			return {
				loading2: false,
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
				addDivisionDialog: false,
				inputDivisionDialog: false,
				fileList: [],
				importFiles: {},
				editDivisionDialog: false,
				addForm: {
					parentId: '',
					cascade: '',
					topName: '',
					topCode:'',
					name: '',
					addName: '',
					code: '',
					level: '',
					levelName: ''
				},
				uploadData: {
					appId: 1,
				},
				rules: {
					name: [
						{ required: true, message: '必填 ', trigger: 'change' },
						{ min: 1, max: 30, message: '长度在 1到 30个字符', trigger: 'change' }
					],
					code: [
						{ required: true, message: '必填 ', trigger: 'blur' },
						{ min: 1, max: 20, message: '长度在 1到 20个字符', trigger: 'change' },
						{ validator: validateCodeUnique, trigger: 'change' }
					],
					sort: ''
				},
				editForm: {},
			};
		},
		methods: {
			submitImport() {
				this.loading2 = true;
				importArea(this.importFiles).then((data) => {
					this.loading2 = false;
					this.$message({
						message: data.title,
						type: 'success'
					});
					if(!data.success) {
						console.log(data.data);
					}
					this.inputDivisionDialog = false;
					this.getTree();
				}).catch((err) => {
					this.loading2 = false;
					this.$message({
						type: 'error',
						message: "导入失败"
					});
				});
			},
			uploadSuccess(response, file, fileList) {
				fileList.splice(0, fileList.length);
				fileList.push(file);
				this.importFiles = response.data;
			},
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			initAddForm() {
				this.addForm = {
					parentId: '',
					cascade: '',
					topName: '',
					name: '',
					addName: '',
					code: '',
					level: '',
					levelName: ''
				}
			},
			changeChild() {
				this.getDivisionList();
			},
			closeDialog() {
				this.initAddForm();
				this.editForm = {};
			},
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						delete this.editForm.formatCreateTime;
						delete this.editForm.formatUpdateTime;
						saveAdministrativeDivision(this.editForm).then((data) => {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.editDivisionDialog = false;
							this.editForm = {};
							getTreeData().then((datatree) => {
								this.dataTree = datatree;
								this.getDivisionList(this.currentNode.attributes.code);
							});
						});
					}
				});

			},
			handleEdit(index, row) {
				getAreaById({ id: row.id }).then((data) => {
					this.editForm = data;
					this.editForm.levelName = trancLevel(data.level);
					getAreaById({ id: data.parentId }).then((pdata) => {
						this.editForm.topName = pdata.name;
						this.editDivisionDialog = true;
					});
				});
			},
			/**
			 * 转换行政区划级别
			 */
			formatterLevel(row, column) {
				return trancLevel(row.level);
			},
			/**
			 * 新增行政区划
			 */
			openAddDivisionDialog() {
				this.initAddForm();
				var node = this.currentNode;
				this.addForm.parentId = node.id;
				this.addForm.topName = node.text;
				this.addForm.topCode=node.attributes.code;
				this.addForm.level = Number(node.attributes.level) + 1;
				this.addForm.levelName = trancLevel(Number(node.attributes.level) + 1);
				this.addForm.cascade = node.attributes.cascade + node.attributes.code + '/';
				this.addDivisionDialog = true;
			},
			saveSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						saveAdministrativeDivision(this.addForm).then((data) => {
							this.initAddForm();
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.addDivisionDialog = false;
							getTreeData().then((datatree) => {
								this.dataTree = datatree;
								if(typeof(this.currentNode.attributes.code) != 'undefined') {
									this.getDivisionList(this.currentNode.attributes.code);
								}
							});
						}).catch((err) => {
							this.$message({
								type: 'error',
								message: err.response.data.message
							});
						});
					}
				});

			},
			/**
			 * 点击树结构行政区划
			 */
			handleNodeClick(data) {
				this.currentNode = data;
				this.getDivisionList(this.currentNode.attributes.code);
			},
			deleteRecord(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delAreaById({ id: row.id, code: row.code }).then((data) => {
						getTreeData().then((datatree) => {
							this.dataTree = datatree;
							if(this.currentNode.attributes.code == row.code) {
								this.tableData = [];
								this.total = 0;
							} else {
								this.getDivisionList(this.currentNode.attributes.code);
							}
						});
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch((err) => {
						this.$message({
							type: 'error',
							message: err.response.data.message
						});
					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getDivisionList(code) {
				if(typeof(code) == "undefined") {
					code = this.currentNode.attributes.code;
				}
				let para = {
					code: code,
					isCascade: this.showChild,
					id: this.currentNode.id,
					page: this.page,
					size: this.pageSize
				};
				this.Loading = true;
				getAdministrativeDivision(para).then((data) => {
					this.tableData = data.rows;
					this.total = data.total;
				});
			},
			handleSizeChange(val) { //2.分页设置
				this.pageSize = val;
				this.getDivisionList();
			},
			handleCurrentChange(val) { //2.分页设置
				this.page = val;
				this.getDivisionList();
			},
			getTree() {
				getTreeData().then((data) => {
					this.dataTree = data;
					if(typeof(data[0]) != 'undefined') {
						this.currentNode = data[0];
						this.getDivisionList(this.currentNode.attributes.code);
					}
				});
			},
			download: function () {
                window.location.href='http://192.168.1.86:9999/file/download/4965a33e-6944-4996-bd6e-04c1a12e73cc';
            },
		},
		mounted() {
			//TODO
			this.getTree();
			var childMainHeight = $('.childMain').height();
			this.tableHeight = childMainHeight - 76;
		},
	}
	var trancLevel = function(level) {
		if(level == 1) {
			return "省";
		} else if(level == 2) {
			return "地市";
		} else if(level == 3) {
			return "区县";
		} else if(level == 4) {
			return "乡镇";
		} else if(level == 5) {
			return "村舍";
		}
		return "";
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
</style>