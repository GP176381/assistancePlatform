import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8004';//配置接口地址
//axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';   //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//配置请求头
// axios.defaults.withCredentials=true;  //解决跨域问题，后台也对应的有一个类，两者都加上才解决跨域的问题

//var querystring = require('querystring'); //和下面qs一样，两者都可以用
var qs = require('qs');//用于参数处理
// var config = { auth: {username: 'cos3', password: 'password'}} ;

//登陆login

export const login = params => { return axios.post('/login',qs.stringify(params)).then(res => res.data); };
export const logout = params => { return axios.post('/logout').then(res => res.data); };
export const AreaInfo = params => { return axios.get('/cos3-system-manager/area/select/getAreaByCode').then(res => res.data); };
export const PersonalInfo = params => { return axios.get('/cos3-system-manager/personnel/select/getOneByLogin').then(res => res.data); };
//========================行政区划table
export const getTreeData = params => { return axios.get('/cos3-system-manager/area/select/getTreeByCode').then(res => res.data); };
export const getAdministrativeDivision = params => { return axios.get('/cos3-system-manager/area/select/getPageByCode',{ params: params }).then(res => res.data); };
export const saveAdministrativeDivision = params => {return axios.post('/cos3-system-manager/area/save',qs.stringify(params)).then(res => res.data); };
export const getAreaById = params => { return axios.get('/cos3-system-manager/area/select/getOneById',{ params: params }).then(res => res.data); };
export const delAreaById = params => { return axios.get('/cos3-system-manager/area/delete/delById',{ params: params }).then(res => res.data); };
export const importArea = params => {return axios.post('/cos3-system-manager/area/import/importArea',qs.stringify(params)).then(res => res.data); };
export const isexitCode = params => { return axios.get('/cos3-system-manager/area/isexit',{ params: params }).then(res => res.data); };

//=====================职能管理
export const getFunctionalByLevel = params => { return axios.get('/cos3-system-manager/functional/select/getlistbylevel',{ params: params }).then(res => res.data); };
export const saveFunctional = params => {return axios.post('/cos3-system-manager/functional/save',qs.stringify(params)).then(res => res.data); };
export const getFunctionalById = params => { return axios.get('/cos3-system-manager/functional/select/getOneById',{ params: params }).then(res => res.data); };
export const delFunctionalById = params => { return axios.get('/cos3-system-manager/functional/delete/delById',{ params: params }).then(res => res.data); };
export const updateFunctionalStatus = params => {return axios.get('/cos3-system-manager/functional/update/updateStatus',{ params: params }).then(res => res.data); };

//====================单位管理
export const getUnitListByCode = params => { return axios.get('/cos3-system-manager/unit/select/list',{ params: params }).then(res => res.data); };
export const saveUnit = params => {return axios.post('/cos3-system-manager/unit/save',qs.stringify(params)).then(res => res.data); };
export const getUnitById = params => { return axios.get('/cos3-system-manager/unit/select/getOneById',{ params: params }).then(res => res.data); };
export const delUnitById = params => { return axios.get('/cos3-system-manager/unit/delete/delById',{ params: params }).then(res => res.data); };
export const updateUnitStatus = params => {return axios.get('/cos3-system-manager/unit/update/updateStatus',{ params: params }).then(res => res.data); };


//==================人员管理
export const personnelPageList= params => { return axios.get('/cos3-system-manager/personnel/select/getPageList',{ params: params }).then(res => res.data); };
export const personnelList = params => { return axios.get('/cos3-system-manager/personnel/select/getList',{ params: params }).then(res => res.data); };
//得到单位下拉框的值
export const getUnitList= params => { return axios.get('/cos3-system-manager/personnel/add/getUnitList',{ params: params }).then(res => res.data); };
export const validateLoginName = params => {return axios.post('/cos3-system-manager/personnel/add/validateLoginName',qs.stringify(params)).then(res => res.data); };
export const validatePhone = params => { return axios.get('/cos3-system-manager/personnel/add/validatePhone',{ params: params }).then(res => res.data); };
export const savePersonnel = params => {return axios.post('/cos3-system-manager/personnel/add/save',qs.stringify(params)).then(res => res.data); };
//删除人员
export const delPersonnelById = params => { return axios.get('/cos3-system-manager/personnel/delete/delById',{ params: params }).then(res => res.data); };
export const updatePersonnelStatus = params => {return axios.post('/cos3-system-manager/personnel/update/updateStatus',params).then(res => res.data); };
export const updatePersonnelStatus2 = params => {return axios.get('/cos3-system-manager/personnel/update/updateStatus2',{ params: params }).then(res => res.data); };
//得到单个对象--修改用
export const getPersonnelById = params => { return axios.get('/cos3-system-manager/personnel/select/getOneById',{ params: params }).then(res => res.data); };
export const importPersonnel = params => {return axios.post('/cos3-system-manager/personnel/import/importPersonnel',qs.stringify(params)).then(res => res.data); };

//--------------------------------------人员关联角色
//得到未授权的角色分类--得到登录人创建的角色或登录人可转授的角色
export const getHasNoConnectRoleTypes = params => {return axios.get('/cos3-system-manager/personnel/connect/getHasNoConnectRoleTypes',{}).then(res => res.data); };
//得到未授权的角色--得到登录人创建的角色或登录人可转授的角色
export const getHasNoConnectRole = params => {return axios.get('/cos3-system-manager/personnel/connect/getHasNoConnectRole',{ params: params }).then(res => res.data); };
//得到已经授权的角色
export const getHasConnectRole = params => {return axios.get('/cos3-system-manager/personnel/connect/getHasConnectRole',{ params: params }).then(res => res.data); };
//保存关联
export const saveRolePersonnel = params => {return axios.post('/cos3-system-manager/personnel/connect/addRolePersonnel',params).then(res => res.data); };


//===============================角色管理
//查询左侧角色分类
export const getRoleTypes = params => { return axios.get('/cos3-system-manager/role/select/getTypes',{}).then(res => res.data); };
//根据角色分类查询角色列表
export const getPageByAreaCode = params => { return axios.get('/cos3-system-manager/role/select/getPage',{ params: params}).then(res => res.data); };
//角色管理-根据行政区划查和分类名询此区划的角色列表
//export const getPageByAreaCodeAndType = params => { return axios.get('/cos3-system-manager/role/select/getPageForType',{ params: params }).then(res => res.data); };
//角色管理-新增角色
export const saveRole = params => { return axios.post('/cos3-system-manager/role/add/save', params ).then(res => res.data); };
//角色管理-删除角色
export const deleteRoleById = params => { return axios.post('/cos3-system-manager/role/delete/deleteById',qs.stringify(params) ).then(res => res.data); };
//角色管理-更新状态
export const updateRoleStatus = params => { return axios.post('/cos3-system-manager/role/update/updateStatus',qs.stringify(params) ).then(res => res.data); };
//新增时验证代码唯一
export const validateRoleCode = params => { return axios.get('/cos3-system-manager/role/add/validateCode',{ params: params}).then(res => res.data); };

//--------------------------------------角色关联人员
//得到左侧的行政区划树
export const getTreeDataByConnect = params => { return axios.get('/cos3-system-manager/role/connect/getTreeByCode').then(res => res.data); };
//查询已经授权的人员
export const getHasConnectPerson = params => { return axios.post('/cos3-system-manager/role/connectd/getHasConnectPerson',qs.stringify(params) ).then(res => res.data); };
//查询未授权的人员
export const getHasNoConnectPerson = params => { return axios.post('/cos3-system-manager/role/connectd/getHasNoConnectPerson',qs.stringify(params) ).then(res => res.data); };
//保存--关联人员
export const saveConnectRolePersonnel = params => { return axios.post('/cos3-system-manager/role/connectd/saveRolePersonnel',params ).then(res => res.data); };

//--------------------------------------角色关联权限
//查询左侧权限分类
export const getPerssionTypesByConnect = params => { return axios.get('/cos3-system-manager/role/connectd/getPermissionTypes',{params:params}).then(res => res.data); };
//根据分类查询未授权的权限
export const getHasNoConnectPermission = params => { return axios.get('/cos3-system-manager/role/connectd/getHasNoConnectPermission',{params:params}).then(res => res.data); };
//根据分类查询已授权的权限
export const getHasConnectPermission = params => { return axios.get('/cos3-system-manager/role/connectd/getHasConnectPermission',{params:params}).then(res => res.data); };
//保存角色关联权限集合
//export const saveRolePermissions = params => { return axios.post('/cos3-system-manager/role/connectd/saveRolePermission',qs.stringify(params)).then(res => res.data); };
export const saveRolePermissions = params => { return axios.post('/cos3-system-manager/role/connectd/saveRolePermission',params).then(res => res.data); };


//===============================权限管理
//权限管理-列表左边的权限分类
export const getPermissionTypes = params => { return axios.get('/cos3-system-manager/permission/select/getTypes',{ params: params }).then(res => res.data); };
//权限管理-列表
export const getPermissionPageByType = params => { return axios.get('/cos3-system-manager/permission/select/getPageByType',{ params: params}).then(res => res.data); };
//权限管理-保存
export const savePermission = params => { return axios.post('/cos3-system-manager/permission/save', params ).then(res => res.data); };
//权限管理-删除
export const deletePermissionById = params => { return axios.post('/cos3-system-manager/permission/delete/deleteById', qs.stringify(params) ).then(res => res.data); };
//验证code唯一--还没联调
export const validatePermissionCode = params => { return axios.get('/cos3-system-manager/permission/add/validateCode', { params: params} ).then(res => res.data); };

//参数管理-得到分类列表
export const getParameterTypes = params => { return axios.get('/cos3-system-manager/parameter/select/getTypes').then(res => res.data); };
//参数管理-新增和修改
export const saveAndUpdateParameter = params => { return axios.post('/cos3-system-manager/parameter/saveParm',params).then(res => res.data); };
//参数管理-根据分类名询此参数
export const getParameterPageByType = params => { return axios.get('/cos3-system-manager/parameter/select/getPageByType',{ params: params }).then(res => res.data); };
//参数管理-更新状态
export const updateParameterStatus = params => { return axios.post('/cos3-system-manager/parameter/update/updateStatus', qs.stringify(params) ).then(res => res.data); };
//参数管理-删除
export const deleteParameterById = params => { return axios.post('/cos3-system-manager/parameter/removeParm/'+params).then(res => res.data); };
//参数管理-验证参数键是否重复
export const validateParameterKey = params => { return axios.get('/cos3-system-manager/parameter/validparmkey',{ params: params }).then(res => res.data); };

//============================
//数据字典管理-得到分类列表
export const getDictionaryTypes = params => { return axios.get('/cos3-system-manager/dictionary/select/getTypes').then(res => res.data); };
//数据字典管理-根据分类名询此参数
export const getDictionaryListByType = params => { return axios.get('/cos3-system-manager/dictionary/select/getListByType',{ params: params }).then(res => res.data); };
//数据字典管理-新增和修改
export const saveDictionary = params => { return axios.post('/cos3-system-manager/dictionary/saveDicData',params).then(res => res.data); };
//数据字典管理-新增和修改
export const saveDictionaryItem = params => { return axios.post('/cos3-system-manager/dictionary/saveDicItem',params).then(res => res.data); };
//数据字典管理-删除字典，同时删除该字典下的数据项
export const destroyDictionary = params => { return axios.post('/cos3-system-manager/dictionary/removeDictionary/'+params).then(res => res.data); };
//数据字典管理-删除数据字典项
export const destoryDictionaryItem = params => { return axios.post('/cos3-system-manager/dictionary/destoryDicItem/'+params).then(res => res.data); };
//数据字典管理-根据name模糊查询数据字典
export const getDictionaryListByName = params => { return axios.get('/cos3-system-manager/dictionary/select/getListByName',{ params: params }).then(res => res.data); };
//数据字典管理-根据value模糊查询数据字典项
export const getDicItemByValue = params => { return axios.get('/cos3-system-manager/dictionary/getDicItemByValue',{ params: params }).then(res => res.data); };
//数据字典管理-根据key查询指定字典下字典项列表
export const getDicItemListByDicKey = params => { return axios.get('/cos3-system-manager/dictionary/getDicItemListByDicKey',  { params: params }).then(res => res.data); };
//参数管理-验证参数键是否重复
export const validateDictionaryKey = params => { return axios.get('/cos3-system-manager/dictionary/validparmkey',{ params: params }).then(res => res.data); };
//参数管理-验证数据字典项参数键是否重复
export const validaDictionaryItemValue = params => { return axios.get('/cos3-system-manager/dictionary/validaDictionaryItemValue',{ params: params }).then(res => res.data); };



var url = 'http://localhost:8080/static/data/';

export const alleviations = params => { return axios.get(url + 'alleviation.json' ).then(res => res.data); };

export const updateAlleviationAction = params => { return axios.get(url + 'empty.json' + params ).then(res => res.data); };
export const addAlleviationAction = params => { return axios.get(url + 'empty.json' ,{ params: params } ).then(res => res.data); };
