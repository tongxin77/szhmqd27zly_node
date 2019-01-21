/**
 * 
 */

//  导包
const express=require('express')

const path=require('path')


// 创建路由对象
const studentRouter=express.Router();


// 导入控制器模块
const studentController=require(path.join(__dirname,'../controllers/studentController'))


//获取页面的请求

studentRouter.get('/index',studentController.getIndexPage)


//导出路由对象
module.exports=studentRouter
