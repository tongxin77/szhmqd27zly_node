const path = require('path')

const template = require('art-template')

const dataBase = require(path.join(__dirname, '../tools/dataBaseTool.js'))



// 导出
exports.getIndexPage = (req, res) => {

    const keyword = req.query.keyword || ""

    // Use connect method to connect to the server

    dataBase.findMany('studentname', { name: { $regex: `${keyword}` } }, (err, docs) => {
        var html = template(path.join(__dirname, '../public/html/index.html'), { students: docs, keyword,loginname:req.session.loginname });
        res.send(html)

    })
}
exports.getAddPage = (req, res) => {
    var html = template(path.join(__dirname, '../public/html/add.html'), {loginname:req.session.loginname});
    res.send(html)
}
exports.getAdd = (req, res) => {
    dataBase.insertOne('studentname', req.body, (err, result) => {
        if (!result) {
            res.send("<script>alert('插入失败')</script>")
        } else {
            res.send("<script>location='/student/index'</script>")
        }
    })
}

exports.getEdit = (req, res) => {
    console.log(1111);

    const _id = dataBase.objectId(req.params.studentId)
    console.log(_id);

    dataBase.findOne('studentname', { _id }, (err, doc) => {
        doc.loginname=req.session.loginname
        const html = template(path.join(__dirname, '../public/html/edit.html'), doc)
        res.send(html)
    })

}

exports.getEditPage = (req, res) => {
    const _id = dataBase.objectId(req.params.studentId)

    dataBase.updateOne('studentname', { _id }, req.body, (err, result) => {
        console.log(result);

        if (result.modifiedCount != 1) {
            res.send("<script>alert('修改失败')</script>")
        } else {
            res.send("<script>location='/student/index'</script>")
        }
    })
}
exports.deletestudent = (req, res) => {
    const _id = dataBase.objectId(req.params.studentId)
    dataBase.deleteOne('studentname', { _id }, (err, result) => {
        if (!result) {
            res.send("<script>alert('删除失败')</script>")
        } else {
            res.send("<script>location='/student/index'</script>")
        }
    })
}