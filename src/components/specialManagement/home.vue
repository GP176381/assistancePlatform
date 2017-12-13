<template>

	<div class="content">
		<el-row class="row-card" :gutter="20">
			<el-col :span="18">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<i class="el-icon-document"></i>
						<span>项目</span>
						<el-button icon="menu" style="float: right;" size="mini"></el-button>
					</div>
					<el-row :gutter="20">
						<el-col :span="8" class="card-project">
							<el-row :gutter="20" >
								<el-col :span="8">
									 <router-link to="/qualification" tag="a"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT780Wg2womG8fqSTqnW-NNFquZYdjQZ9tQ1i1rbIkAvLgWu-1f" width="100%" height="100%" /></router-link>
								</el-col>
								<el-col :span="16">
									<div class="card-project-title">
										易地扶贫搬迁户
									</div>
									<div class="card-project-text">
										进度计划：<span>6/12</span>
									</div>
									<div class="card-project-text">
										已申请金额：<span>23700.00元</span>
									</div>
									<div class="card-project-text">
										拨付金额：<span>546000.00元</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">资格待审批 <span class="project-zgsp-count">10</span></el-col>
								<el-col :span="12">发放待审批 <span class="project-zgsp-count">10</span></el-col>
							</el-row>

						</el-col>
						<el-col :span="8" class="card-project">
							<el-row :gutter="20">
								<el-col :span="8">
									<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT780Wg2womG8fqSTqnW-NNFquZYdjQZ9tQ1i1rbIkAvLgWu-1f" width="100%" height="100%" />
								</el-col>
								<el-col :span="16">
									<div class="card-project-title">
										易地扶贫搬迁户
									</div>
									<div class="card-project-text">
										进度计划：<span>6/12</span>
									</div>
									<div class="card-project-text">
										已申请金额：<span>23700.00元</span>
									</div>
									<div class="card-project-text">
										拨付金额：<span>546000.00元</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">资格待审批 <span class="project-zgsp-count">10</span></el-col>
								<el-col :span="12">发放待审批 <span class="project-zgsp-count">10</span></el-col>
							</el-row>

						</el-col>

						<el-col :span="8" class="card-project">
							<el-row :gutter="20">
								<el-col :span="8">
									<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT780Wg2womG8fqSTqnW-NNFquZYdjQZ9tQ1i1rbIkAvLgWu-1f" width="100%" height="100%" />
								</el-col>
								<el-col :span="16">
									<div class="card-project-title">
										易地扶贫搬迁户
									</div>
									<div class="card-project-text">
										进度计划：<span>6/12</span>
									</div>
									<div class="card-project-text">
										已申请金额：<span>23700.00元</span>
									</div>
									<div class="card-project-text">
										拨付金额：<span>546000.00元</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">资格待审批 <span class="project-zgsp-count">10</span></el-col>
								<el-col :span="12">发放待审批 <span class="project-zgsp-count">10</span></el-col>
							</el-row>

						</el-col>
					</el-row>
				</el-card>

				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<i class="el-icon-edit"></i>
						<span>快捷办理</span>
						<el-button icon="menu" style="float: right;" size="mini"></el-button>
					</div>
					<div v-for="o in 4" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>

				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<i class="el-icon-document"></i>
						<span>信息库</span>
						<el-button icon="menu" style="float: right;" size="mini"></el-button>
					</div>
					<div v-for="o in 4" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>

			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<i class="el-icon-time"></i>
						<span>待办事项（历史）</span>
						<el-button icon="menu" style="float: right;" size="mini"></el-button>
					</div>
					<div v-for="o in 25" :key="o" class="text item">
						{{'列表内容 ' + o }}
					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>

</template>

<script>
</script>

<style>
	.content {
		font-size: 14px;
	}
	
	.row-card {
		padding: 15px;
	}
	
	.box-card {
		margin-bottom: 15px;
	}
	
	.card-project {
		padding: 8px 0;
		border-radius: 8px;
		border: 1px solid #eee;
		background-color: rgba(245, 245, 246, 1);
	}
	
	.project-zgsp-count {
		color: red;
	}
</style>