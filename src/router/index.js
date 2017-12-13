import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Login from '@/components/Login'
import Home from '@/components/home'
import systemSet from '@/components/system/systemSet'
import administrativeDivision from '@/components/system/administrativeDivision'
import personManagement from '@/components/system/personManagement'
import functionManagement from '@/components/system/functionManagement'
import roleManagement from '@/components/system/roleManagement'
import privilegeManagement from '@/components/system/privilegeManagement'
import unitManagement from '@/components/system/unitManagement'
import parameterManagement from '@/components/system/parameterManagement'
import dataDictionary from '@/components/system/dataDictionary'
import projectManagement from '@/components/project/projectManagement'
import processManage from '@/components/process/processManage'
import qualificationManagement from '@/components/qualificationManagement'
import addAlleviation from '@/components/qualificationManagement/addAlleviation'
import detailAlleviation from '@/components/qualificationManagement/detailAlleviation'
import tjdForm from '@/components/qualificationManagement/tjdForm'

import specialManagement from '@/components/specialManagement'
import specialManagementHome from '@/components/specialManagement/home'
import management from '@/components/specialManagement/management'
import qualification from '@/components/specialManagement/management/qualification'
import distribute from '@/components/specialManagement/management/distribute'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/Login',
			component: Login,
			alias: ''
		},
		{
			path: '/',
			component: specialManagement,
			name: 'specialManagement',
			redirect: '/home',
			children: [{
				path: '/specialManagement/home',
				component: specialManagementHome,
				name: 'specialManagementHome'
			}, {
				path: '/management',
				component: management,
				name: 'management',
				redirect: '/management/qualification',
				children: [{
					path: '/qualification',
					component: qualification,
					name: 'qualification',
				}, {
					path: '/distribute',
					component: distribute,
					name: 'distribute',
				}]
			}]
		},
		{
			path: '/qualificationManagement',
			component: qualificationManagement,
			name: 'qualificationManagement'
		},
		{
			path: '/addAlleviation',
			component: addAlleviation,
			name: 'addAlleviation'
		},
		{
			path: '/detailAlleviation',
			component: detailAlleviation,
			name: 'detailAlleviation'
		},
		{
			path: '/tjdForm',
			component: tjdForm,
			name: 'tjdForm',
		},
		{
			path: '/',
			name: 'Home',
			component: Home,
			redirect: '/systemSet',
			children: [{
				path: '/systemSet',
				component: systemSet,
				name: 'systemSet',
				redirect: '/systemSet/administrativeDivision',
				children: [{
						path: 'administrativeDivision',
						component: administrativeDivision,
						name: 'administrativeDivision',
					},
					{
						path: 'personManagement',
						component: personManagement,
						name: 'personManagement',
					},
					{
						path: 'functionManagement',
						component: functionManagement,
						name: 'functionManagement',
					},
					{
						path: 'roleManagement',
						component: roleManagement,
						name: 'roleManagement',
					},
					{
						path: 'privilegeManagement',
						component: privilegeManagement,
						name: 'privilegeManagement',
					},
					{
						path: 'unitManagement',
						component: unitManagement,
						name: 'unitManagement',
					},
					{
						path: 'parameterManagement',
						component: parameterManagement,
						name: 'parameterManagement',
					},
					{
						path: 'dataDictionary',
						component: dataDictionary,
						name: 'dataDictionary',
					},
					{
						path: 'processManage',
						component: processManage,
						name: 'processManage',
					}
				]
			}, {
				path: '/projectManagement',
				component: projectManagement,
				name: 'projectManagement',
			}]
		}
	]
})