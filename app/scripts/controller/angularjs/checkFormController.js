'use strict';

/**
 * @description 表单验证
 * @author yugd
 * @createDate 2016.05.11 14:40
 */
angular.module('conponent.controller')
  .controller('checkFormCtrl', ['$scope','$log',function ($scope,$log) {
  	/*$scope.showTip = function(){
  		$('#emailTip').collapse('toggle');
  		console.log('显示提示');
  	};*/
    $scope.submit = function(){
    	$log.info('提交表单');
    };
  }]);
