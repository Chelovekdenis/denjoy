const fs = require('fs')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {

    // http://localhost:3000/download?filename=oc6TRb.jpg

    let fileName = req.query.filename

    let filePath = "./uploads/" + fileName
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            res.statusCode = 404;
            res.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(res)
        }
    });
})

module.exports = router
