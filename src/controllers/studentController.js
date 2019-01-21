const path = require('path')

const template = require('art-template')

// 导包
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd27';

// 导出
exports.getIndexPage = (req, res) => {
    console.log(req);
    
    const keyword=req.query.keyword||""

    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {

        const db = client.db(dbName);
        // 获取到要操作的集合
        const collection = db.collection('studentname');

        

        collection.find({name:{$regex:`${keyword}`}}).toArray((err, docs) => {
            console.log(docs);
            var html = template(path.join(__dirname, '../public/html/index.html'), { students: docs,keyword });
            res.send(html)

        });

        client.close();
    })

}

// module.exports = {
//     getindexPage 
//   };