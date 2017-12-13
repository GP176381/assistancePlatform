<template>
	<div class="container">
		<div class="header">
			<el-row>
				<el-col :span="4" class="logo">
					<router-link to="/specialManagement/home" tag="a">专项管理平台</el-menu-item></router-link>
				</el-col>
				<el-col :span="16">
					<el-menu class="menu" router theme="dark" mode="horizontal" :default-active="$route.path" :active="$route.path" @select="handleSelect">
						<el-menu-item index="/distribute">受理</el-menu-item>
						<el-menu-item index="/distribute">审核</el-menu-item>
						<el-menu-item index="/distribute">支付</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</div>

		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 'detailAlleviation'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color: rgb(232, 236, 240);
	}    
	.header {
		width: 100%;
		height: 60px;
		background: #19233c;
		line-height: 60px;
		box-sizing: border-box;
	}
	
	.header .menu {
		background: #19233c;
	}
	
	.el-menu--dark .el-menu-item:hover,
	.el-menu--dark .el-submenu__title:hover {
		background: #19233c;
	}
</style>