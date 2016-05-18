(function() {
  'use strict';
  /**
   *  表单模块
   *  @module opui.form
   *  @desc 表单验证：特殊字符验证、数据库重复验证、正则表达式验证
   *  还有其他自定义验证
   */
  angular.module('ogui.form', []);
  var $ = angular.element;
  //输入Enter查询
  angular.module('ogui.form')
          
  .directive('ogPattern', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs,ctrl) {
        var reg = new RegExp(attrs.ogPattern);//将字符串转化为正则，否则下面无法做正则判断
        scope.$watch(attrs.ngModel, function(value) {
          if(!value){
            ctrl.$setValidity('speString', false);
            $('#'+attrs.name+'Tip').collapse('show');
            return;
          }
          if (reg.test(value)) {
            ctrl.$setValidity('speString', true);
            $('#'+attrs.name+'Tip').collapse('hide');
          } else {
            ctrl.$setValidity('speString', false);
            $('#'+attrs.name+'Tip').collapse('show');
          }
        });
      }
    };
  })
  //表单验证第4版本，bootstap版
  .directive('ogSave', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      link: function(scope, element, attrs) {
        var toDoGetter = $parse(attrs.ogSave);
        var formName = attrs.formName || 'form';
        var errorName = formName + '.$error';
        //用于处理重复提交,使用定时器，1秒之后才能再次提交
        var submitTimer;

        //绑定提交按钮,当提交时验证表单,只有全部通过之后才能执行相应的后续函数
        element.bind('click', function() {
          //判断是否在限制时间内
          if (submitTimer){return;}
          
          //将所有未验证通过的字段显示提示
          var invalidFields = [];
          var formErrors = $parse(errorName)(scope);
          for(var i in formErrors){
            if(i!=='speString'){
              continue;
            }
            for(var j in formErrors[i]){
              var errorObj = formErrors[i][j];
              var newElement = $('[name=' + errorObj.$name + ']');
              invalidFields.push(newElement);
            }
          }

          //聚焦到第一个错误的输入框
          if (invalidFields.length > 0) {
            invalidFields[0].focus();
            return;
          }
         
          //验证成功，继续下一步动作
          toDoGetter(scope);
          //设置限定时间1s
          submitTimer = $timeout(function() {
            submitTimer = undefined;
          }, 1000);
        });
      }
    };
  }]);
})();