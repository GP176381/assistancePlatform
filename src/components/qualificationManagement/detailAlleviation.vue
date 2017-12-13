<template>

	<div class="container">

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>基本信息</span>
				<!--<el-button type="primary">操作按钮</el-button>-->
			</div>
			<el-row :gutter="30" type="flex">
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="14" :lg="14">
						<span>户主身份证</span>：
					</el-col>

					<span>512532197203060612</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="14" :lg="14">
						<span>户主姓名</span>：
					</el-col>
					<span>黄胜兵</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>户籍性质</span>：
					</el-col>
					<span>农村</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>贫困属性</span>：
					</el-col>
					<span>一般贫困户</span>
				</el-col>

				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>脱贫标识</span>：
					</el-col>
					<span>预脱贫</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>(预)脱贫年度</span>：
					</el-col>
					<span>2016</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>主要致贫原因</span>：
					</el-col>
					<span>缺技术</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>家庭全年收入 (元)</span>：
					</el-col>
					<span>6,310.00</span>
				</el-col>

				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>联系方式</span>：
					</el-col>
					<span>13890434035</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>产业就业发展(人)</span>：
					</el-col>
					<span>1</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>低保政策兜底(人)</span>：
					</el-col>
					<span>0</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>医疗救助扶持(人)</span>：
					</el-col>
					<span>0</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>灾后重建帮扶(人)</span>：
					</el-col>
					<span>0</span>
				</el-col>
				<el-col class="text item" :xs="24" :sm="12" :md="8" :lg="8" >
					<el-col class="title" :xs="12" :sm="12" :md="12" :lg="14">
						<span>户籍地址</span>：
					</el-col>
					<span>0</span>
				</el-col>
			</el-row>
			
	
		</el-card>

	</div>

</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style>
	.el-row {
		flex-wrap: wrap;
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.text {
		white-space: nowrap;
		font-size: 18px;
		padding: 18px 0;
	}
	
	.title {
		text-align: right;
	}
	/*.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}*/
	
	.box-card {
		/*width: 480px;*/
	}
</style>