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
studentRouter.get('/add',studentController.getAddPage)
studentRouter.post('/add',studentController.getAdd)

// 获取编辑的请求
// 以冒号开头
studentRouter.get("/edit/:studentId",studentController.getEdit)

studentRouter.post("/edit/:studentId",studentController.getEditPage)
// 发送删除学生的请求
studentRouter.get("/deleteone/:studentId",studentController.deletestudent)





//导出路由对象
module.exports=studentRouter
