<template>
	<div class="container">
		<ul class="btn-toolGroup">
			<el-button-group>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="edit" disabled>导出</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="share">新增</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="delete" disabled>提交</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="edit" disabled>撤回</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="share" disabled>修改</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="delete" disabled>删除</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="delete" disabled>注销</el-button>
				</router-link>
				<router-link to="/addAlleviation"  active-class="active">
					<el-button type="primary" icon="delete" disabled>重启</el-button>
				</router-link>
			</el-button-group>
		</ul>
		<div class="table">
			<el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="日期" width="120">
					<template scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="address" label="地址" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
				<el-button @click="toggleSelection()">取消选择</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData3: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				multipleSelection: []
			}
		},

		methods: {
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>

<style scoped>
.btn-toolGroup li{
	padding: 0 5px;
	display: inline-block;
}
</style>