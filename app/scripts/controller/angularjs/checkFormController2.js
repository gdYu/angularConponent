'use strict';

/**
 * @description 表单验证2
 * @author yugd
 * @createDate 2016.05.11 14:40
 */
angular.module('conponent.controller')
  .controller('checkFormCtrl2', ['$scope','$log','checkFormService',
  	function ($scope,$log,checkFormService) {
		$scope.supplier = {};
  	checkFormService.initQuery(function(result){
  		if('Y'===result.state){
  			$scope.supplier = result.data;
  		}
  	});

    $scope.submit = function(){
    	checkFormService.commitForm($scope.supplier,function(result){
  			console.log(result.desc);
    	});
    };
  }]);
