const fs = require('fs')
const express = require('express')
const router = express.Router()


// Сервер находит в папке файл и отдает его по параметру строки запроса

router.get('/', (req, res) => {
    let fileName = req.query.filename

    if ((fileName.indexOf('/') || fileName.indexOf('\\')) > -1 )
        return req.end("not found")

    let filePath = "./uploads/" + fileName
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            res.statusCode = 404;
            res.end("Resource not found!");
        } else
            fs.createReadStream(filePath).pipe(res)
    })
})

module.exports = router
