const path = require('path')
// 导包
const MongoClient = require('mongodb').MongoClient;

var captchapng = require('captchapng')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd27';

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
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection('accountname');
        // console.log(collection);

        collection.findOne({
            username
        }, (err, doc) => {
            // 如果doc 为null 说明数据库没有这条文档，如果不为null 说明不成功
            if (doc) {
                result.status = 1
                result.message = "用户名已经存在"

                client.close();
                res.json(result)
            } else {
                collection.insertOne(req.body, (err, data) => {
                    console.log(data);

                    if (!data) {
                        result.status = 2
                        result.message = "注册失败"
                        client.close();
                        res.json(result)
                    }
                    client.close();
                    res.json(result)
                })
            }
        });
    });

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
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

// 导出登录
exports.login = (req, res) => {
    console.log(req.session);
    console.log(req.body);

    const result = {
        "status": 0,
        "message": "注册成功"
    }

    const {vcode,username,password} = req.body
    const {vcode1} = req.session
    console.log(vcode1)
    if (vcode != vcode1) {
        result.status = 1
        result.message = "验证码错误"

        res.json(result)
        return false
        
    }else{
        MongoClient.connect(url, function (err, client) {

            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection('accountname');
            // console.log(collection);
    
            collection.findOne({username,password}, (err, doc) => {
                // 如果doc 为null 说明数据库没有这条文档，如果不为null 说明不成功
                console.log(doc);
                if (!doc) {
                    result.status = 2
                    result.message = "用户名或密码错误"
        
                    client.close();
                    res.json(result)
                }else{
                    client.close();
                    res.json(result)
                }
            });
        });
    }
}