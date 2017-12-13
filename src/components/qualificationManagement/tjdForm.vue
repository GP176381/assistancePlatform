<style>
	#app {
		margin: 10px;
	}
	
	.el-card__header {
		padding: 10px 20px;
	}
	
	.el-select,
	.el-cascader,
	.el-date-editor.el-input {
		display: block;
		width: 100%;
	}
	
	.card_title {
		color: #000;
		font-size: 14px;
	}
	
	.box-card {
		margin: 20px 0;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	/*.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 171px;
		height: 108px;
		line-height: 108px;
		text-align: center;
	}*/
	
	.avatar {
		width: 171px;
		height: 108px;
		display: block;
	}
</style>
<template>
	<div id="app" v-cloak>
		<div class="handle">
			<el-button type="primary" icon="circle-check ">保存</el-button>
			<el-button type="primary" icon="upload2 ">提交</el-button>
			<el-button type="primary" icon="circle-close ">取消</el-button>
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 20px;"><b class="card_title">易地搬迁统建点信息</b></span>
			</div>
			<el-form :model="tjdQualification" label-width="120px">
				<el-row :gutter="30">
					<el-col :span="6">
						<el-form-item label="统建点名称" :rules="{ required: true}">
							<el-input v-model="tjdQualification.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="计划实施年度" :rules="{ required: true}">
							<el-input v-model="tjdQualification.planYear"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="住房建设状态" :rules="{ required: true}">
							<el-select v-model="tjdQualification.constructStatus">
								<el-option label="尚未开始" value="尚未开始"></el-option>
								<el-option label="在建中" value="在建中"></el-option>
								<el-option label="已建成" value="已建成"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="6">
						<el-form-item label="补助总额(元)" :rules="{ required: true}">
							<el-input v-model="tjdQualification.totalMoney"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发放比例" :rules="{ required: true}">
							<el-input v-model="tjdQualification.grantRatio"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="负责人手机" :rules="{ required: true}">
							<el-input v-model="tjdQualification.liablePhone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="6">
						<el-form-item label="联系电话">
							<el-input v-model="tjdQualification.telephone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="16">
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="户籍地址">
									<el-cascader :options="addressOptions" v-model="tjdQualification.relocatePlace">
									</el-cascader>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="" label-width="0px">
									<el-input v-model="tjdQualification.relocatePlace"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 20px;"><b class="card_title">申请材料</b></span>
			</div>
			<el-form :model="tjdQualification" label-width="80px">
				<el-row :gutter="30">
					<el-col :span="4">
						<el-form-item label="预算方案" :rules="{ required: true}">
							<el-upload class="avatar-uploader" list-type="picture-card" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="财评报告" :rules="{ required: true}">
							<el-upload class="avatar-uploader" list-type="picture-card" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="招标文件" :rules="{ required: true}">
							<el-upload class="avatar-uploader" list-type="picture-card" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="中标通知书" label-width='120px' :rules="{ required: true}">
							<el-upload class="avatar-uploader" list-type="picture-card" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="统建合同书" label-width='140px' :rules="{ required: true}">
							<el-upload class="avatar-uploader" list-type="picture-card" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 20px;"><b class="card_title">账户信息</b></span>
			</div>
			<el-form :model="tjdQualification" label-width="120px">
				<el-row :gutter="30">
					<el-col :span="6">
						<el-form-item label="持卡人/机构" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountOwner"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="收款人手机" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountPhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="证件号" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountIdcard"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="6">
						<el-form-item label="开户银行" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountBank"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="银行卡号" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountCardnumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="确认卡号" :rules="{ required: true}">
							<el-input v-model="tjdQualification.accountCardnumber"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="line-height: 20px;"><b class="card_title">易地贫困搬迁户</b></span>
			</div>
			<el-table highlight-current-row :data="relocate_member" border tooltip-effect="dark" style="width: 100%" @cell-click="memberBisicInfo">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="identityCard" label="户主身份证">
				</el-table-column>
				<el-table-column prop="name" label="户主姓名">
				</el-table-column>
				<el-table-column prop="members" label="易地扶贫搬迁成员(人)">
				</el-table-column>
				<el-table-column prop="totalMoney" label="补助总额(元)">
				</el-table-column>
				<el-table-column prop="" label="已发放">
				</el-table-column>
				<el-table-column prop="oldAddress" label="老宅地址">
				</el-table-column>
				<el-table-column prop="c_reimbursement_status" label="操作" width="150">
					<template scope="scope">
						<el-button type="text" size="small" @click="familyInfoDialog = true">修改</el-button>
						<el-button type="text" size="small">删除</el-button>
						<el-button type="text" size="small">注销</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 10px">
				<el-button type="primary" icon="plus " @click="familyInfoDialog = true" size="small">添加成员</el-button>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				familyInfoDialog: false,
				imageUrl: '',
				tjdQualification: {
					name: '',
					planYear: '',
					constructStatus: '',
					totalMoney: '',
					birthday: '',
					grantRatio: '',
					liablePhone: '',
					telephone: '',
					relocatePlace: '',
					ysfaImg: '',
					cpbgImg: '',
					zbwjImg: '',
					zbtzsImg: '',
					tjhtsImg: '',
					accountOwner: '',
					accountPhone: '',
					accountIdcard: '',
					accountBank: '',
					accountCardnumber: '',

				},
				relocate_member: [],
				addressOptions: [{
						value: '筠连镇',
						label: '筠连镇',
						children: [{
								value: '大塘村',
								label: '大塘村'
							},
							{
								value: '乐意乡',
								label: '乐意乡'
							},
							{
								value: '大坝村',
								label: '大坝村'
							}
						]
					},
					{
						value: '木艾村',
						label: '木艾村',
						children: [{
								value: '大塘村',
								label: '大塘村'
							},
							{
								value: '乐意乡',
								label: '乐意乡'
							},
							{
								value: '大坝村',
								label: '大坝村'
							}
						]
					}
				]
			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			memberBisicInfo(row, column, cell, event) {
				this.familyInfoDialog = true
			}
		}

	}
</script>