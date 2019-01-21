/**
 * 注册和登录的处理
 */

//  导包
const express=require('express')

const path=require('path')


// 创建路由对象
const accountRouter=express.Router();

// 导入控制器模块
const accountController=require(path.join(__dirname,'../controllers/accountController'))


//获取注册页面的请求

accountRouter.get('/register',accountController.getRegisterPage)
// 获取登录页面的请求
accountRouter.get('/login',accountController.getLoginPage)
// accountRouter.get('/login',(req,res)=>{
//     res.send("1111111111111111111111111")
// })
// 获取验证码的请求
accountRouter.get('/vcode',accountController.getVcodePage)


// 获取注册页面的post
accountRouter.post('/register',accountController.register)
// 获取登录页面的post
accountRouter.post('/login',accountController.login)

//导出路由对象
module.exports=accountRouter
