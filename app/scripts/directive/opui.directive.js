(function() {
  'use strict';
  /**
   *  表单模块
   *  @module opui.form
   *  @desc 表单验证：特殊字符验证、数据库重复验证、正则表达式验证
   *  还有其他自定义验证
   */
  angular.module('opui.form', []);

  //输入Enter查询
  angular.module('opui.form')
  .directive('opValidate',function(){
    //正则表达式
    var PATTERN = {
      email:'^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}\;))*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$'
    };
    return{
      restrict:'EA',
      require:'ngModel',
      scope:{
        ngModel:'=',
        opMsg:'@',//默认提示
        opPattern:'@',//正则验证名称
        opEmpty:'@',//是否允许为空,true:允许；其它值：不允许。
        opPlacement:'@'//提示方向，top:向上；left:左；right：右；bottom:下。
      },
      link:function(scope, element, attrs,ctrl){
        var opMsg = scope.opMsg;//默认提示
        var reg = new RegExp(PATTERN[attrs.opPattern]);//将字符串转化为正则，否则下面无法做正则判断
        var opPlacement = scope.opPlacement||'bottom';//提示方向
        var opEmpty = scope.opEmpty;//true：允许为空，false/undefined：不允许为空。
        var showTip = false;
        element.popover({
          trigger: 'click',
          placement: opPlacement,
          content: function() {
            var opTip =  element.attr('op-tip');
            if(opTip){
              return opTip;
            }else{
              if (!element.val()&&opEmpty!=='true'){
                return '该字段不得为空！';
              }
              return '';
            }
          }
        }).on('shown.bs.popover', function() {
          if (showTip) {
            clearTimeout(showTip);
          }
          showTip = setTimeout(function() {
            element.popover('hide');
            showTip = false;
          }, 2000);
        });

        scope.$watch('ngModel', function(value) {
          //如果值为空，且opEmpty不允许为空
          //如果有正则，且正则没验证通过
          if (!value&&opEmpty!=='true'){
            element.attr('op-tip', '该字段不得为空！');
            ctrl.$setValidity('speString', false);
            element.popover('show');
          }else if(scope.opPattern&&!reg.test(value)){
            element.attr('op-tip', opMsg);
            ctrl.$setValidity('speString', false);
            element.popover('show');
          }else{
            element.attr('op-tip','');
            ctrl.$setValidity('speString', true);
            element.popover('hide');
          }
        });
      }
    };
  })
 
  //表单验证第4版本，bootstap版
  .directive('opSave', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      link: function(scope, element, attrs) {
        var toDoGetter = $parse(attrs.opSave);
        var formName = attrs.formName || 'form';
        var errorName = formName + '.$error';
        //用于处理重复提交,使用定时器，1秒之后才能再次提交
        var submitTimer;

        //绑定提交按钮,当提交时验证表单,只有全部通过之后才能执行相应的后续函数
        element.bind('click', function() {
          //解决页面闪动问题
          element.focus();
          //判断是否在限制时间内
          if (submitTimer){return;}
          
          //将所有未验证通过的字段显示提示
          var invalidFields = [];
          var formErrors = $parse(errorName)(scope);//获取表单错误对象
          for(var i in formErrors){
            if(i!=='speString'){
              continue;
            }
            for(var j in formErrors[i]){
              var newErrorObj = formErrors[i][j];
              var newElement = $('[name=' + newErrorObj.$name + ']');
              invalidFields.push(newElement);
              newElement.popover('show');
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