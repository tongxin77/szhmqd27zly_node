// 导包
const express = require('express')

const app = express()

// 处理请求
app.get('/',(req,res)=>{
    res.send('hello')
})
// 启动
app.listen(7788,'127.0.0.1',err=>{
    if(err){
        console.log(err);
        
    }
    console.log('ok');
    
}) 