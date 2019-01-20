
const path=require('path')
// 导出
exports.getRegisterPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/html/register.html'))
}

