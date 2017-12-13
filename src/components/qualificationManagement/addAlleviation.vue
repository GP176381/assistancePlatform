<template>
	<div class="container">
		<router-link to="/detailAlleviation" active-class="active">
			<el-button type="success">查看详情</el-button>
		</router-link>
		<div class="pannel">
			<el-form ref="addAlleviationForm" :rules="addAlleviationRules" :model="addAlleviationForm" :label-width="formLabelWidth" :label-position="labelPosition">
				<el-row :xs="24" :sm="24" :md="24" :lg="24">
					<el-button type="primary" @click="submitForm('addAlleviationForm')" size="large">保存</el-button>
					<el-button @click="resetForm('addAlleviationForm')" size="large">重置</el-button>
				</el-row>
				<el-collapse v-model="activeNames">
					<el-collapse-item name="1">

						<template slot="title">
							基本信息<i class="header-icon el-icon-information"></i>
						</template>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户主身份证" prop="identityCard">
									<el-input type="text" v-model="addAlleviationForm.alleviation.identityCard" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户主姓名" prop="hostName">
									<el-input type="text" v-model="addAlleviationForm.alleviation.hostName" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户籍性质" prop="householdNatures">
									<el-select v-model="addAlleviationForm.householdNatures" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.householdNature" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="贫困属性" prop="povertyAttributes">
									<el-select v-model="addAlleviationForm.povertyAttributes" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.povertyAttribute" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="脱贫标识" prop="povertyFlags">
									<el-select v-model="addAlleviationForm.povertyFlags" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.povertyFlag" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="(预)脱贫年度" prop="antiPovertyYears">
									<el-date-picker v-model="addAlleviationForm.antiPovertyYears" align="right" type="year" placeholder="选择年">
									</el-date-picker>
									<!--<el-select v-model="addAlleviationForm.antiPovertyYears" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.antiPovertyYear" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>-->
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="主要致贫原因" prop="mainPovertyReasons">
									<el-select v-model="addAlleviationForm.mainPovertyReasons" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.mainPovertyReason" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="家庭全年收入 (元)" prop="annualIncome">
									<el-input type="text" v-model="addAlleviationForm.alleviation.annualIncome" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系方式" prop="telephone">
									<el-input type="text" v-model="addAlleviationForm.alleviation.telephone" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="产业就业发展(人)" prop="cyjyfz">
									<el-input type="text" v-model="addAlleviationForm.alleviation.cyjyfz" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="低保政策兜底(人)" prop="dbzcdd">
									<el-input type="text" v-model="addAlleviationForm.alleviation.dbzcdd" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="医疗救助扶持(人)" prop="yljzfc">
									<el-input type="text" v-model="addAlleviationForm.alleviation.yljzfc" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="灾后重建帮扶(人)" prop="zhcjbf">
									<el-input type="text" v-model="addAlleviationForm.alleviation.zhcjbf" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="户籍地址" prop="householdAddresss">
									<el-select v-model="addAlleviationForm.householdAddresss" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.householdAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.householdAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.householdAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="addAlleviationForm.householdAddresss" auto-complete="off"></el-input>
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
									<el-date-picker v-model="addAlleviationForm.planYears" align="right" type="year" placeholder="选择年">
									</el-date-picker>
									<!--<el-select v-model="addAlleviationForm.planYears" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.planYear" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>-->
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="安置形式" prop="relocateTypes">
									<el-select v-model="addAlleviationForm.relocateTypes" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.relocateType" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="安置方式" prop="relocateModes">
									<el-col :xs="24" :sm="12" :md="8" :lg="12">
										<el-select v-model="addAlleviationForm.relocateModes" filterable placeholder="请选择">
											<el-option v-for="item in addAlleviationForm.alleviation.relocateMode" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-col>
									<el-col :xs="24" :sm="12" :md="8" :lg="12">
										<el-select v-model="addAlleviationForm.relocateModes" filterable placeholder="请选择">
											<el-option v-for="item in addAlleviationForm.alleviation.relocateMode" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-col>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-form-item label="">
									<el-checkbox v-model="addAlleviationForm.alleviation.noHouse">是否无房户</el-checkbox>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="8">
								<el-form-item label="稳定脱贫措施" prop="measures">
									<el-select v-model="addAlleviationForm.measures" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.measure" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="老宅地址" prop="oldAddresss">
									<el-select v-model="addAlleviationForm.oldAddresss" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.oldAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.oldAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.oldAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="addAlleviationForm.oldAddresss" auto-complete="off"></el-input>
							</el-col>
						</el-row>

						<el-row :gutter="30" type="flex">
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="新宅地址" prop="newAddresss">
									<el-select v-model="addAlleviationForm.newAddresss" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.newAddress" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="4">
								<el-select v-model="addAlleviationForm.newAddresss" filterable placeholder="请选择">
									<el-option v-for="item in addAlleviationForm.alleviation.newAddress" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-input type="text" v-model="addAlleviationForm.newAddresss" auto-complete="off"></el-input>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="3">
						<template slot="title">
							申请材料<i class="header-icon el-icon-information"></i>
						</template>
						<el-row :gutter="15" type="flex">

							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :drag="drag" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.idcardImg" :src="addAlleviationForm.idcardImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">身份证正面</i>
									</el-upload>
									<!--<span class="el-upload-list__item-actions" v-show="sqclUploadEnlarge">
										<span @click="handleEnlargeImg"><i class="el-icon-view"></i></span>
									<span @click="handleDeleteImg"><i class="el-icon-delete2"></i></span>
									</span>
									<el-dialog v-model="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.idcardBehindImg" :src="addAlleviationForm.idcardBehindImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">身份证反面</i>
									</el-upload>
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.hkbImg" :src="addAlleviationForm.hkbImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">户口本</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.bqsqzsImg" :src="addAlleviationForm.bqsqzsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">搬迁申请证书</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.bqsqzsImg" :src="addAlleviationForm.bqsqzsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">搬迁申请证书</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.chyjyImg" :src="addAlleviationForm.chyjyImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村会议纪要</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.chyImg" :src="addAlleviationForm.chyImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村会议照片</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.cgsImg" :src="addAlleviationForm.cgsImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村公示照片</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.cgsclImg" :src="addAlleviationForm.cgsclImg" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">村公示材料</i>
									</el-upload>
									<!--<i class="el-icon-delete"></i>-->
								</div>
							</el-col>
							<el-col :xs="24" :sm="12" :md="6" :lg="6">
								<div class="up-file">
									<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="addAlleviationForm.bqdxqrbImg" :src="addAlleviationForm.bqdxqrbImg" class="avatar">
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
									<el-input type="text" v-model="addAlleviationForm.alleviation.accountOwner" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="收款人手机" prop="accountPhone">
									<el-input type="text" v-model="addAlleviationForm.alleviation.accountPhone" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="证件号" prop="accountIdcard">
									<el-input type="text" v-model="addAlleviationForm.alleviation.accountIdcard" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="开户银行" prop="accountBanks">
									<el-select v-model="addAlleviationForm.accountBanks" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.accountBank" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="银行卡号" prop="accountCardnumber">
									<el-input type="text" v-model="addAlleviationForm.alleviation.accountCardnumber" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="确认卡号" prop="accountCardnumber">
									<el-input type="text" v-model="addAlleviationForm.alleviation.accountCardnumber" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>

							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="与户主关系" prop="accountRelations">
									<el-select v-model="addAlleviationForm.accountRelations" filterable placeholder="请选择">
										<el-option v-for="item in addAlleviationForm.alleviation.accountRelation" :key="item.value" :label="item.label" :value="item.value">
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
									<el-input type="text" v-model="addAlleviationForm.alleviation.contactLeader" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系人员" prop="contactDepartment">
									<el-input type="text" v-model="addAlleviationForm.alleviation.contactDepartment" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="12" :md="8" :lg="6">
								<el-form-item label="联系电话" prop="contactPerson">
									<el-input type="text" v-model="addAlleviationForm.alleviation.contactPerson" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item name="6">
						<template slot="title">
							易地扶贫搬迁成员<i class="header-icon el-icon-information"></i>
						</template>

						<el-row>
							<el-button type="primary" icon="plus" @click="addAlleviationMenber">添加</el-button>
							<el-button type="primary" icon="edit" :disabled="updateMenbersDisabled" @click="updateAlleviationMenber(addAlleviationMemberForm.id)">修改</el-button>
							<el-button type="primary" icon="delete" :disabled="deleteMenberdisabled">删除</el-button>
						</el-row>

						<el-row>
							<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
								<el-form ref="addAlleviationMemberForm" :rules="addAlleviationMemberRules" :model="addAlleviationMemberForm" :label-width="formLabelWidth" :label-position="labelPosition">
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="姓名" prop="name">
											<el-input type="text" v-model="addAlleviationMemberForm.name" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="与户主关系" prop="relationships">
											<el-select v-model="addAlleviationMemberForm.relationships" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.relationship" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="家庭成员" prop="familys">
											<el-select v-model="addAlleviationMemberForm.familys" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.family" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="性别" prop="sexs">
											<el-select v-model="addAlleviationMemberForm.sexs" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.sex" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="出生日期" prop="birthday">
											<el-date-picker v-model="addAlleviationMemberForm.birthday" align="right" type="date" placeholder="选择日期" :picker-options="addAlleviationMemberForm.pickerBirthday" @change="formatBirthday">
											</el-date-picker>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="名族" prop="ethnicitys">
											<el-select v-model="addAlleviationMemberForm.ethnicitys" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.ethnicity" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="健康状况" prop="healthConditions">
											<el-select v-model="addAlleviationMemberForm.healthConditions" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.healthCondition" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="身份证号" prop="name">
											<el-input type="text" v-model="addAlleviationMemberForm.identityCard" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="联系方式" prop="telephone">
											<el-input type="text" v-model="addAlleviationMemberForm.telephone" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="文化程度" prop="educations">
											<el-select v-model="addAlleviationMemberForm.educations" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.education" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="政治面貌" prop="politicals">
											<el-select v-model="addAlleviationMemberForm.politicals" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.political" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="12" :lg="12">
										<el-form-item label="务工状况" prop="workStatuss">
											<el-select v-model="addAlleviationMemberForm.workStatuss" filterable placeholder="请选择">
												<el-option v-for="item in addAlleviationMemberForm.workStatus" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="24" :lg="24">
										<el-form-item label="工作单位" prop="wordCompany">
											<el-input type="text" v-model="addAlleviationMemberForm.wordCompany" auto-complete="off"></el-input>
										</el-form-item>
									</el-col>

									<el-col :xs="24" :sm="24" :md="24" :lg="24">
										<el-form-item label="个人证明照片" prop="personalProve">
											<div class="up-file">
												<el-upload class="avatar-uploader" action="http://192.168.1.86:9999/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
													<img v-if="addAlleviationMemberForm.personalProve" :src="addAlleviationMemberForm.personalProve" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon">个人证明照片</i>
												</el-upload>
											</div>
										</el-form-item>
									</el-col>

								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="dialogFormVisible = false">取 消</el-button>
									<el-button type="primary" @click="saveAlleviationMenberInfo('addAlleviationMemberForm')">确 定</el-button>
								</div>
							</el-dialog>
						</el-row>

						<el-row>
							<template>
								<el-table ref="multipleTable" :data="addAlleviationForm.alleviation.alleviationMemberTable" border tooltip-effect="dark" style="width: 100%" @selection-change="handleAlleviationMenberTable">
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
	import { alleviations, updateAlleviationAction, addAlleviationAction } from '../../api/api';

	console.log("axios返回：alleviations,updateAlleviationAction");

	export default {
		data() {
			return {
				multipleSelection: [],
				dialogImageUrl: '',
				sqclUploadEnlarge: false,
				dialogVisible: false,
				activeNames: ['1', '2', '3', '4', '5', '6'],
				dialogFormVisible: false,
				formLabelWidth: '150px',
				labelPosition: 'right',
				updateMenbersDisabled: true,
				deleteMenberdisabled: true,
				drag: true,
				addAlleviationMemberForm: {
					id: '',
					name: '',
					relationship: [],
					family: [],
					sex: [],
					birthday: '',
					pickerBirthday: {},
					ethnicity: [],
					healthCondition: [],
					identityCard: '',
					telephone: '',
					education: [],
					political: [],
					wordCompany: '',
					personalProve: '',
					householdId: '',
					relationships: '',
					familys: '',
					sexs: '',
					ethnicitys: '',
					healthConditions: '',
					educations: '',
					politicals: '',
					workStatuss: '',
					workStatus: [],
				},
				addAlleviationForm: {
					householdNatures: '',
					povertyAttributes: '',
					povertyFlags: '',
					antiPovertyYears: '',
					mainPovertyReasons: '',
					householdAddresss: '',
					planYears: '',
					measures: '',
					oldAddresss: '',
					newAddresss: '',
					relocateTypes: '',
					relocateModes: '',
					accountBanks: '',
					accountRelations: '',
					idcardImg: '',
					idcardBehindImg: '',
					hkbImg: '',
					bqsqzsImg: '',
					chyjyImg: '',
					chyImg: '',
					cgsImg: '',
					cgsclImg: '',
					bqdxqrbImg: '',
					alleviation: alleviations
				},
				addAlleviationRules: {
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
					hostName: [{
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
				addAlleviationMemberRules: {
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

			};
		},
		created() {
			alleviations().then((data) => {
				this.addAlleviationForm.alleviation = data;
				console.log("返回绑定data: ", this.addAlleviationForm.alleviation);
				if(data && data.length > 0) {}
			});
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
				//				var result = this.formValidate(formName); 

				var para = this.addAlleviationForm.alleviation;

				//				if(result) {
				addAlleviationAction(para).then((data) => {
					console.log("addAlleviationActionData:", data);
				});
				//				}
			},
			resetForm(formName) {
				console.log(this.$refs[formName]);
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				this.addAlleviationForm.alleviation.idcardImg = res.referenceId;
				console.log(this, 'http://192.168.1.86:9999/file/download/' + res.referenceId);

				this.addAlleviationForm.idcardImg = URL.createObjectURL(file.raw);
				//				this.sqclUploadEnlarge = true;
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
			handleAlleviationMenberTable(val) {
				this.multipleSelection = val;
				this.updateMenbersDisabled = !this.updateMenbersDisabled;
				this.deleteMenbersDisabled = !this.deleteDisabled;
			},
			saveAlleviationMenberInfo(formName) {

				var flag = this.formValidate(formName);
				//				if(flag) {
				this.dialogFormVisible = false;
				console.log(this.updateMenbersDisabled);
				if(!this.updateMenbersDisabled) {
					alert("修改");
				} else {
					alert("添加");
					this.addAlleviationForm.alleviation.alleviationMemberTable.push(this.addAlleviationMemberForm);
					console.log(this.addAlleviationForm.alleviation.alleviationMemberTable);
				}

				//				}

			},
			addAlleviationMenber() {
				this.dialogFormVisible = true;
			},
			updateAlleviationMenber(id) {
				console.log(id);

				var para = id;
				updateAlleviationAction(para).then((data) => {
					console.log("updateAlleviationData:", data);
					this.dialogFormVisible = true;
				});
			},
			formatBirthday(val) {
				this.addAlleviationMemberForm.birthday = val;
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