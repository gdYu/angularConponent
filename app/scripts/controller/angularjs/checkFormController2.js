'use strict';

/**
 * @description 表单验证2
 * @author yugd
 * @createDate 2016.05.11 14:40
 */
angular.module('conponent.controller')
  .controller('checkFormCtrl2', ['$scope','$log',function ($scope,$log) {
    $scope.submit = function(){
    	$log.info('提交表单');
    };
  }]);
