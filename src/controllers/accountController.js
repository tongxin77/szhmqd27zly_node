const path = require('path')
// 导包

const dataBase=require(path.join(__dirname, '../tools/dataBaseTool.js'))

var captchapng = require('captchapng')



// 导出
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'))
}


// 导出注册
exports.register = (req, res) => {
    const result = {
        "status": 0,
        "message": "注册成功"
    }

    // 拿到浏览器传过来的数据 body-parser 
    const {
        username
    } = req.body

    // console.log(username);
    dataBase.findOne('accountname',{username},(err,doc)=>{
        if (doc) {
            result.status = 1
            result.message = "用户名已经存在"

            res.json(result)
        } else {
            dataBase.insertOne('accountname',req.body,(err, data) => {
                if (!data) {
                    result.status = 2
                    result.message = "注册失败"
                    client.close();
                    res.json(result)
                }
                res.json(result)
            })
        }
    })

}

// 导出登录
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
}


// 导出验证码
exports.getVcodePage = (req, res) => {

    const vcode1 = parseInt(Math.random() * 9000 + 1000)

    req.session.vcode1 = vcode1
    // console.log(req.session);

    var p = new captchapng(80, 30, vcode1); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 =Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

// 导出登录
exports.login = (req, res) => {
    // console.log(req.session);
    // console.log(req.body);

    const result = {
        "status": 0,
        "message": "注册成功"
    }

    const {vcode,username,password} = req.body
    const {vcode1} = req.session
    // console.log(vcode,vcode1)
    if (vcode != vcode1) {
        result.status = 1
        result.message = "验证码错误"

        res.json(result)
        return       
    }
        dataBase.findOne('accountname',{username,password},(err, doc) => {
            // 如果doc 为null 说明数据库没有这条文档，如果不为null 说明不成功
            // console.log(doc);
            if (!doc) {
                result.status = 2
                result.message = "用户名或密码错误"
    
            }else{
                req.session.loginname=username
            }
            res.json(result)
        })
}

// 
exports.logout=(req,res)=>{
    req.session.loginname=null
    res.send("<script>location='/account/login'</script>")
}