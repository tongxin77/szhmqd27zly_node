// 导包
const express = require('express')

const path=require('path')

const app = express()

// 处理请求
const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))

app.use('/account',accountRouter)

app.use(express.static(path.join(__dirname,'public')))

// 启动
app.listen(7788,'127.0.0.1',err=>{
    if(err){
        console.log(err);
        
    }
    console.log('ok');
    
}) 