'use strict';
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/config');
var $sql = {
  update: 'update supplier set supplierName=?,level=?,supplierAbbreviate=?,cooperationWay=?,'+
          'paymentWay=?,username=?,sex=?,position=?,phoneNumber=?,email=?,fax=?,qq=?,'+
          'aliwangwang=?,address=?,remark=? where id=1',
  query: 'select * from supplier'
};

// 使用连接池，提升性能
var connection = mysql.createConnection($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.send({
      state: 'N',
      desc: '操作失败'
    });
  } else {
    res.send({
      state:'Y',
      desc:'操作成功',
      data:ret[0]
    });
  }
};

connection.connect();

module.exports = {

  query: function(req, res) {
    connection.query($sql.query, function(err, rows) {
      if (err) {
        throw err;
      }
      jsonWrite(res, rows);
    });
  },
  update: function(req, res) {
    var param = req.body;
    console.log(param);
    connection.query($sql.update, 
      [param.supplierName,
      param.level,//级别
      param.supplierAbbreviate,//供应商简称
      param.cooperationWay,//合作方式
      param.paymentWay,//结算方式
      param.username,//联系人
      param.sex,//性别
      param.position,//职务
      param.phoneNumber,//联系电话
      param.email,//邮箱
      param.fax,//传真
      param.qq,//QQ
      param.aliwangwang,//阿里旺旺
      param.address,//联系地址
      param.remark], function(err) {
      if (err) {
        jsonWrite(res);
        throw err;
      } else {
        jsonWrite(res,'');
      }
    });

  }
};