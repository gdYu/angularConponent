'use strict';

/**
 * @description 表单验证
 * @author yugd
 * @createDate 2016.05.19 09:40
 */
angular.module('conponent.service')
  .service('checkFormService', ['$log','Restangular',function ($log,Restangular) {
  	return{
  		initQuery:fInitQuery,//初始化查询
  		commitForm:fCommitForm//提交表单
  	};

  	//供应商初始化查询
  	function fInitQuery(callback){
  		return Restangular.one('/angularConponent/angulars/querySupplier').get().then(callback);
  	}

  	//供应商信息修改
  	function fCommitForm(params,callback){
  		return Restangular.all('/angularConponent/angulars/updateSupplier').post(params).then(callback);
  	}
  }]);
