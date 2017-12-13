<template>

	<div class="content">
		<el-row>
			<el-col :span="2">
				<el-menu :active="$route.path" router class="" mode="vertical" theme="dark">
					<el-menu-item index="/qualification"><i class="el-icon-menu"></i> 资格</el-menu-item>
					<el-menu-item index="/distribute"><i class="el-icon-menu"></i> 发放</el-menu-item>
					<el-menu-item index="3"><i class="el-icon-menu"></i> 计划</el-menu-item>
					<el-menu-item index="3"><i class="el-icon-menu"></i> 报表</el-menu-item>
					<el-menu-item index="3"><i class="el-icon-menu"></i> 文件</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="22">
				<div class="contain">
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-menu {
		width: 100px;
	}
</style>