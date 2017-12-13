import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8004';//配置接口地址
//axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';   //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//配置请求头
// axios.defaults.withCredentials=true;  //解决跨域问题，后台也对应的有一个类，两者都加上才解决跨域的问题

//var querystring = require('querystring'); //和下面qs一样，两者都可以用
var qs = require('qs');
// var config = { auth: {username: 'cos3', password: 'password'}} ;

//----------人员管理
//移动至
export const movePersonnel = params => { return axios.get('/cos3-system-manager/personnel/move/movePersonnel',{ params: params }).then(res => res.data); };

