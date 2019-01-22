// 导包
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd27';
/**
 * 
 * @param {*} collectName 集合名称
 * @param {*} data  数据
 * @param {*} callback 回调函数, 把结果告知控制器
 */

 function mongodb(){
     
 }
const findOne=(collectName,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
 
 
        const db = client.db(dbName);
      // 获取到要操作的集合
        const collection = db.collection(collectName);
        
        collection.findOne(data,(err, doc) => {
            callback(err,doc)
            client.close();
          });
    })

}
const findMany=(collectName,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
 
 
        const db = client.db(dbName);
      // 获取到要操作的集合
        const collection = db.collection(collectName);
        
        collection.find(data).toArray((err, docs) => {
           callback(err,docs)
           client.close();

        });
    })

}

const insertOne=(collectName,data,callback)=>{
    connection(collectName,(collection,client)=>{
        collection.insertOne(data,(err, doc) => {
            callback(err,doc)
            client.close();
          })
    })
       
}
/**
 * 
 * @param {*} collectName 
 * @param {*} condition 条件
 * @param {*} data 
 * @param {*} callback 
 */
const updateOne=(collectName,condition,data,callback)=>{
    connection(collectName,(collection,client)=>{
        collection.updateOne(condition,{$set:data},(err, result) => {
            callback(err,result)
            client.close();
          });
    })
}

const connection=(collectName,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
 
 
        const db = client.db(dbName);
      // 获取到要操作的集合
        const collection = db.collection(collectName);
        callback(collection,client)
    })
}

const deleteOne=(collectName,data,callback)=>{
    connection(collectName,(collection,client)=>{
        collection.deleteOne(data,(err, result) => {
            callback(err,result)
            client.close();
        })
    }
)}

module.exports={
    findOne,
    insertOne,
    findMany,
    updateOne,
    deleteOne,
    objectId
}