<template>
	<div class="container">
		<router-link to="/detailAlleviation" active-class="active">
			<el-button type="success" >查看详情</el-button>
		</router-link>
		<div class="pannel">
			<el-form ref="form" :rules="formRules" :model="form" :label-width="formLabelWidth" :label-position="labelPosition">
				<el-row :xs="24" :sm="24" :md="24" :lg="24">
					<el-button type="primary" @click="submitForm('form')" size="large">保存</el-button>
					<el-button @click="resetForm('form')" size="large">重置</el-button>
				</el-row>
				<el-collapse v-model="activeNames">
					<el-collapse-item name="1">

						<template slot="title">
							基本信息<i class="header-icon el-icon-information"></i>
						</template>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户主身份证" prop="identityCard">
									<el-input type="text" v-model="form.identityCard" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户主姓名" prop="name">
									<el-input type="text" v-model="form.name" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户籍性质" prop="householdNatures">
									<el-select v-model="form.householdNatures" filterable placeholder="请选择">
										<el-option v-for="item in form.householdNature" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="贫困属性" prop="povertyAttributes">
									<el-select v-model="form.povertyAttributes" filterable placeholder="请选择">
										<el-option v-for="item in form.povertyAttribute" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="脱贫标识" prop="povertyFlags">
									<el-select v-model="form.povertyFlags" filterable placeholder="请选择">
										<el-option v-for="item in form.povertyFlag" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="(预)脱贫年度" prop="antiPovertyYears">
									<el-select v-model="form.antiPovertyYears" filterable placeholder="请选择">
										<el-option v-for="item in form.antiPovertyYear" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="主要致贫原因" prop="mainPovertyReasons">
									<el-select v-model="form.mainPovertyReasons" filterable placeholder="请选择">
										<el-option v-for="item in form.mainPovertyReason" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="家庭全年收入 (元)" prop="annualIncome">
									<el-input type="text" v-model="form.annualIncome" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系方式" prop="telephone">
									<el-input type="text" v-model="form.telephone" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="产业就业发展(人)" prop="cyjyfz">
									<el-input type="text" v-model="form.cyjyfz" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="低保政策兜底(人)" prop="dbzcdd">
									<el-input type="text" v-model="form.dbzcdd" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="医疗救助扶持(人)" prop="yljzfc">
									<el-input type="text" v-model="form.yljzfc" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="灾后重建帮扶(人)" prop="zhcjbf">
									<el-input type="text" v-model="form.zhcjbf" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户籍地址" prop="householdAddresss">
									<el-select v-model="form.householdAddresss" filterable placeholder="请选择">
										<el-option v-for="item in form.householdAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="form.householdAddresss" auto-complete="off"></el-input>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="2">
						<template slot="title">
							易地扶贫搬迁补助资格信息<i class="header-icon el-icon-information"></i>
						</template>
						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="计划实施年度" prop="planYears">
									<el-select v-model="form.planYears" filterable placeholder="请选择">
										<el-option v-for="item in form.planYear" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="安置形式" prop="relocateTypes">
									<el-select v-model="form.relocateTypes" filterable placeholder="请选择">
										<el-option v-for="item in form.relocateType" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="安置方式" prop="relocateModes">
									<el-col :xs="24" :sm="12" :md="8" :lg="12">
										<el-select v-model="form.relocateModes" filterable placeholder="请选择">
											<el-option v-for="item in form.relocateMode" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="12">
										<el-select v-model="form.relocateModes" filterable placeholder="请选择">
											<el-option v-for="item in form.relocateMode" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-col>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-form-item label="">
									<el-checkbox v-model="form.noHouse">是否无房户</el-checkbox>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="稳定脱贫措施" prop="measures">
									<el-select v-model="form.measures" filterable placeholder="请选择">
										<el-option v-for="item in form.measure" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="老宅地址" prop="oldAddresss">
									<el-select v-model="form.oldAddresss" filterable placeholder="请选择">
										<el-option v-for="item in form.oldAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="form.oldAddresss" auto-complete="off"></el-input>
							</el-col>
						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="新宅地址" prop="newAddresss">
									<el-select v-model="form.newAddresss" filterable placeholder="请选择">
										<el-option v-for="item in form.newAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="form.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in form.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="form.newAddresss" auto-complete="off"></el-input>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="3">
						<template slot="title">
							申请材料<i class="header-icon el-icon-information"></i>
						</template>
						<el-row :gutter="15" type="flex">

							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :drag="drag" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.idcardImg" :src="form.idcardImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">身份证正面</i>
									</el-upload>
									<span class="el-upload-list__item-actions" v-show="sqclUploadEnlarge">
										<span @click="handleEnlargeImg"><i class="el-icon-view"></i></span>
									<span @click="handleDeleteImg"><i class="el-icon-delete2"></i></span>
									</span>
									<el-dialog v-model="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.idcardBehindImg" :src="idcardBehindImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">身份证反面</i>
									</el-upload>
									<span class="el-upload-list__item-actions" v-show="sqclUploadEnlarge">
										<span @click="handleEnlargeImg"><i class="el-icon-view"></i></span>
									<span @click="handleDeleteImg"><i class="el-icon-delete2"></i></span>
									</span>
									<el-dialog v-model="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.hkbImg" :src="hkbImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">户口本</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.bqsqzsImg" :src="bqsqzsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">搬迁申请证书</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.bqsqzsImg" :src="bqsqzsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">搬迁申请证书</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.chyjyImg" :src="chyjyImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村会议纪要</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.chyImg" :src="chyImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村会议照片</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.cgsImg" :src="cgsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村公示照片</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.cgsclImg" :src="cgsclImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村公示材料</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="4">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.bqdxqrbImg" :src="bqdxqrbImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">搬迁对象确认表</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="4">
						<template slot="title">
							账户信息<i class="header-icon el-icon-information"></i>
						</template>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="持卡人/机构" prop="accountOwner">
									<el-input type="text" v-model="form.accountOwner" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="收款人手机" prop="accountPhone">
									<el-input type="text" v-model="form.accountPhone" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="证件号" prop="accountIdcard">
									<el-input type="text" v-model="form.accountIdcard" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="开户银行" prop="accountBanks">
									<el-select v-model="form.accountBanks" filterable placeholder="请选择">
										<el-option v-for="item in form.accountBank" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="银行卡号" prop="accountCardnumber">
									<el-input type="text" v-model="form.accountCardnumber" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="确认卡号" prop="accountCardnumber">
									<el-input type="text" v-model="form.accountCardnumber" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="与户主关系" prop="accountRelations">
									<el-select v-model="form.accountRelations" filterable placeholder="请选择">
										<el-option v-for="item in form.accountRelation" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="5">
						<template slot="title">
							帮扶责任人<i class="header-icon el-icon-information"></i>
						</template>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系部门" prop="contactLeader">
									<el-input type="text" v-model="form.contactLeader" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系人员" prop="contactDepartment">
									<el-input type="text" v-model="form.contactDepartment" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系电话" prop="contactPerson">
									<el-input type="text" v-model="form.contactPerson" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="5">
						<template slot="title">
							易地扶贫搬迁成员<i class="header-icon el-icon-information"></i>
						</template>

						<el-row>
							<el-button type="primary" icon="plus" @click="dialogFormVisible = true">添加</el-button>
							<el-button type="primary" icon="edit" :disabled="disabled" @click="dialogFormVisible = true">修改</el-button>
							<el-button type="primary" icon="delete" :disabled="disabled">删除</el-button>
						</el-row>

						<el-row>
							<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
								<el-form ref="form.ydfpbqcyForm" :rules="form.ydfpbqcyRules" :model="form.ydfpbqcyForm" :label-width="formLabelWidth" :label-position="labelPosition">
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="姓名" prop="name">
											<el-input type="text" v-model="form.ydfpbqcyForm.name" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="与户主关系" prop="relationships">
											<el-select v-model="form.ydfpbqcyForm.relationships" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.relationship" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="家庭成员" prop="familys">
											<el-select v-model="form.ydfpbqcyForm.familys" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.family" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="性别" prop="sexs">
											<el-select v-model="form.ydfpbqcyForm.sexs" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.sex" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="出生日期" prop="birthday">
											<el-date-picker v-model="form.ydfpbqcyForm.birthday" align="right" type="date" placeholder="选择日期" :picker-options="form.ydfpbqcyForm.pickerBirthday" @change="formatBirthday">
											</el-date-picker>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="名族" prop="ethnicitys">
											<el-select v-model="form.ydfpbqcyForm.ethnicitys" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.ethnicity" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="健康状况" prop="healthConditions">
											<el-select v-model="form.ydfpbqcyForm.healthConditions" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.healthCondition" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="身份证号" prop="name">
											<el-input type="text" v-model="form.ydfpbqcyForm.identityCard" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="联系方式" prop="telephone">
											<el-input type="text" v-model="form.ydfpbqcyForm.telephone" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="文化程度" prop="educations">
											<el-select v-model="form.ydfpbqcyForm.educations" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.education" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="政治面貌" prop="politicals">
											<el-select v-model="form.ydfpbqcyForm.politicals" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.political" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="务工状况" prop="workStatuss">
											<el-select v-model="form.ydfpbqcyForm.workStatuss" filterable placeholder="请选择">
												<el-option v-for="item in form.ydfpbqcyForm.workStatus" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="24" :lg="24">
										<el-form-item label="工作单位" prop="wordCompany">
											<el-input type="text" v-model="form.ydfpbqcyForm.wordCompany" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="24" :lg="24">
										<el-form-item label="个人证明照片" prop="personalProve">
											<div class="up-file">
												<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
													<img v-if="form.ydfpbqcyForm.personalProve" :src="personalProve" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon">个人证明照片</i>
												</el-upload>
											</div>
										</el-form-item>
									</el-col>

								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="dialogFormVisible = false">取 消</el-button>
									<el-button type="primary" @click="saveYDFPBQCYInfo('form.ydfpbqcyForm')">确 定</el-button>
								</div>
							</el-dialog>
						</el-row>

						<el-row>
							<template>
								<el-table ref="multipleTable" :data="form.ydfpbqcyTable" border tooltip-effect="dark" style="width: 100%" @selection-change="handleYDFPBQCYTable">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="name" label="姓名">
									</el-table-column>
									<el-table-column prop="sex" label="性别">
									</el-table-column>
									<el-table-column prop="identityCard" label="身份证">
									</el-table-column>
									<el-table-column prop="relationship" label="与户主关系" show-overflow-tooltip>
									</el-table-column>
									<el-table-column prop="family" label="家庭成员">
									</el-table-column>
									<el-table-column prop="birthday" label="出生日期">
									</el-table-column>
									<el-table-column prop="ethnicity" label="民族">
									</el-table-column>
									<el-table-column prop="workStatus" label="务工状况">
									</el-table-column>
									<el-table-column prop="healthCondition" label="健康状况">
									</el-table-column>
									<el-table-column prop="telephone" label="联系方式">
									</el-table-column>
								</el-table>
							</template>
						</el-row>

					</el-collapse-item>

				</el-collapse>
			</el-form>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				dialogImageUrl: '',
				sqclUploadEnlarge: false,
				dialogVisible: false,
				activeNames: ['1', '2', '3', '4', '5', '6'],
				dialogFormVisible: false,
				formLabelWidth: '150px',
				labelPosition: 'right',
				disabled: true,
				drag: true,
				form: {
					id: '',
					identityCard: '',
					name: '',
					householdNatures: '',
					povertyAttributes: '',
					povertyFlags: '',
					antiPovertyYears: '',
					mainPovertyReasons: '',
					annualIncome: '',
					telephone: '',
					cyjyfz: '',
					dbzcdd: '',
					yljzfc: '',
					zhcjbf: '',
					householdAddresss: '',
					householdNature: [],
					povertyAttribute: [],
					povertyFlag: [],
					antiPovertyYear: [],
					mainPovertyReason: [],
					householdAddress: [],
					planYears: '',
					relocateTypes: '',
					relocateModes: '',
					noHouse: '',
					measures: '',
					planYear: [],
					relocateType: [],
					relocateMode: [],
					measure: [],
					oldAddresss: '',
					newAddresss: '',
					oldAddress: [],
					newAddress: [],
					idcardImg: '',
					idcardBehindImg: '',
					hkbImg: '',
					bqsqzsImg: '',
					chyjyImg: '',
					chyImg: '',
					cgsImg: '',
					cgsclImg: '',
					bqdxqrbImg: '',
					accountOwner: '',
					accountPhone: '',
					accountIdcard: '',
					accountBanks: '',
					accountBank: [],
					accountCardnumber: '',
					accountRelations: '',
					accountRelation: [],
					contactLeader: '',
					contactDepartment: '',
					contactPerson: '',
					ydfpbqcyTable: [],
					ydfpbqcyForm: {
						id: '',
						name: '',
						relationships: '',
						familys: '',
						sexs: '',
						ethnicitys: '',
						healthConditions: '',
						educations: '',
						politicals: '',
						workStatuss: '',
						relationship: [],
						family: [],
						sex: [],
						birthday: '',
						pickerBirthday: {
							shortcuts: [{
								text: '今天',
								onClick(picker) {
									picker.$emit('pick', new Date());
								}
							}, {
								text: '昨天',
								onClick(picker) {
									const date = new Date();
									date.setTime(date.getTime() - 3600 * 1000 * 24);
									picker.$emit('pick', date);
								}
							}, {
								text: '一周前',
								onClick(picker) {
									const date = new Date();
									date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
									picker.$emit('pick', date);
								}
							}]
						},
						ethnicity: [],
						healthCondition: [],
						identityCard: '',
						telephone: '',
						education: [],
						political: [],
						workStatus: [],
						wordCompany: '',
						personalProve: '',
						householdId: ''
					},
					ydfpbqcyRules: {
						name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}],
						relationships: [{
							required: true,
							message: '请选择与户主关系',
							trigger: 'blur'
						}],
						familys: [{
							required: true,
							message: '请选择家庭成员',
							trigger: 'blur'
						}],
						sexs: [{
							required: true,
							message: '请选择性别',
							trigger: 'blur'
						}],
						birthday: [{
							required: true,
							message: '请选择出生日期',
							trigger: 'blur'
						}],
						ethnicitys: [{
							required: true,
							message: '请选择民族',
							trigger: 'blur'
						}],
						identityCard: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						}]
					},
				},
				formRules: {
					identityCard: [{
							required: true,
							message: '请输户主身份证',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在18个字符',
							trigger: 'blur'
						}
					],
					name: [{
						required: true,
						message: '请输入户主姓名',
						trigger: 'blur'
					}],
					povertyAttributes: [{
						required: true,
						message: '请选择贫困属性',
						trigger: 'blur'
					}],
					telephone: [{
						required: true,
						message: '请选输入联系方式',
						trigger: 'blur'
					}, {
						validator: 'validatePhoneUnique',
						trigger: 'change'
					}],
					planYears: [{
						required: true,
						message: '请选择计划实施年度',
						trigger: 'blur'
					}],
					relocateTypes: [{
						required: true,
						message: '请选择安置形式',
						trigger: 'blur'
					}],
					relocateModes: [{
						required: true,
						message: '请选择安置方式',
						trigger: 'blur'
					}],
					newAddresss: [{
						required: true,
						message: '请选择老宅住址',
						trigger: 'blur'
					}],
					accountOwner: [{
						required: true,
						message: '请输户持卡人/机构',
						trigger: 'blur'
					}],
					accountPhone: [{
						required: true,
						message: '请输户收款人手机',
						trigger: 'blur'
					}],
					accountIdcard: [{
						required: true,
						message: '请输户证件号',
						trigger: 'blur'
					}],
					accountBanks: [{
						required: true,
						message: '请选择开户银行',
						trigger: 'blur'
					}],
					accountCardnumber: [{
						required: true,
						message: '请输户银行卡号',
						trigger: 'blur'
					}],
					accountRelations: [{
						required: true,
						message: '请选择与户主关系',
						trigger: 'blur'
					}]
				},
				ydfpbqcyTable: []
			};
		},
		methods: {
			formValidate(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
						return true;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitForm(formName) {
				this.formValidate(formName);
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				this.form.idcardImg = URL.createObjectURL(file.raw);
				this.sqclUploadEnlarge = true;
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
			handleEnlargeImg() {
				this.dialogVisible = true;
			},
			handleDeleteImg() {
				console.log('handleDeleteImg')
				this.sqclUploadEnlarge = false;
			},
			handleYDFPBQCYTable(val) {
				this.multipleSelection = val;
				this.disabled = !this.disabled;
			},
			saveYDFPBQCYInfo(formName) {
				console.log(this.form.ydfpbqcyForm.birthday);

				var flag = this.formValidate(formName);
				//				if(flag) {
				this.dialogFormVisible = false;
				this.form.ydfpbqcyTable.push(this.form.ydfpbqcyForm);
				//				}
				console.log(this.form.ydfpbqcyForm);
			},
			formatBirthday(val) {
				this.form.ydfpbqcyForm.birthday = val;
				console.log(val);
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
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 250px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	/*-----【设置上传图片大小】------*/
	
	.up-file {
		/*transition: all .5s cubic-bezier(.55, 0, .1, 1);*/
		position: relative;
		width: 250px;
		height: 178px;
		margin-bottom: 30px;
	}
	
	.avatar-uploader {
		width: 250px;
		height: 178px;
	}
	
	.el-upload-dragger {
		width: 250px;
		height: 178px;
		background-color: #fbfbfb;
	}
	
	.avatar {
		width: 250px;
		height: 178px;
		display: block;
	}
	
	.el-upload-list__item-actions:hover {
		opacity: 1;
	}
	
	.el-upload-list__item-actions {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		cursor: default;
		text-align: center;
		color: #fff;
		opacity: 0;
		font-size: 20px;
		border-radius: 6px;
		background-color: rgba(0, 0, 0, .5);
		transition: all .3s;
	}
	
	.el-upload-list__item-actions:hover {
		opacity: 1;
	}
	
	.el-upload-list__item-actions:hover span {
		display: inline-block;
	}
	
	.el-upload-list__item-actions span {
		display: none;
		cursor: pointer;
	}
	
	.el-upload-list__item-actions:after {
		display: inline-block;
		content: "";
		height: 100%;
		vertical-align: middle;
	}
</style>