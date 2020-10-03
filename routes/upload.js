const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'form_data.html'))
})

// Нужен только для того, чтобы временно созданный файл не конфликтовал,
// если придет новый запрос, пока записывается в потоке
// Поэтому как только используется 30, count++
let count = 30

router.post('/', async (req, res) => {
    const filePath = `./uploads/${count}`
    count++
    let file =  fs.createWriteStream(filePath)
    req.pipe(file)

    file.on('finish', err => {
        if(err) console.log(err)

        let f = fs.readFileSync(filePath)
        let filename = ''

        // Записсаный файл "битый" потому, что у него в начале и в конце метки
        // В цикле ниже убирается верхняя метка, которая заканчивается
        // символами 013 010 013 010 Decimal кодировки
        for (let i = 0; i < f.length; i++) {
            // 013 010 013 010
            if (i < f.length - 4 &&
                f[i] === 13 &&
                f[i + 1] === 10 &&
                f[i + 2] === 13 &&
                f[i + 3] === 10 ) {
                // Регулярнами выражениями из метки вынимается имя файла
                let val = f.slice(0, i + 4).toString()
                let reg = /filename="[^"]*"/
                let arr = reg.exec(val)

                filename = arr[0].slice(10).slice(0, -1)

                f = f.slice(i + 4)
                break
            }
        }

        // В цикле ниже убирается нижняя метка, которая начинается
        // символами 013 010 045 045 Decimal кодировки
        for (let i = f.length; i > 0; i--) {
            // 013 010 045 045
            if (i > 3 &&
                f[i] === 45 &&
                f[i - 1] === 45 &&
                f[i - 2] === 10 &&
                f[i - 3] === 13) {
                f = f.slice(0, i - 3)
                break
            }
        }


        fs.writeFile(`./uploads/${filename}`, f, err => {
            if (err) console.log(err)
        })

        fs.unlinkSync(filePath)


        res.send("Файл загружен")
    })
})

module.exports = router