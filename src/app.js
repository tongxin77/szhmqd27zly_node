// 导包
const express = require('express')

const path=require('path')

var bodyParser = require('body-parser')

var session = require('express-session')



const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', resave:false,saveUninitialized:false,cookie: { maxAge: 600000 }}))


// 配置静态资源
app.use(express.static(path.join(__dirname,'public')))

// 拦截所有请求
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginname){
            next()
        }else{
            res.send("<script>alert('你还没有登录,请先登录');location='/account/login'</script>")
        }  
    }
})

// 处理请求 导入路由
const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))
const studentRouter=require(path.join(__dirname,'./routers/studentRouter.js'))

app.use('/account',accountRouter)
app.use('/student',studentRouter)

// 启动
app.listen(8899,'127.0.0.1',err=>{
    if(err){
        console.log(err);
        
    }
    console.log('ok'); 
    
}) 