const express = require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs')

const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/form_data.html")
})

let count = 30

app.get('/download', (req, res) => {
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

app.post('/upload', async (req, res) => {

  const filePath = `./uploads/${count}`

  let file =  fs.createWriteStream(filePath)

  req.pipe(file)

  file.on('finish', err => {
    let f = fs.readFileSync(filePath)

    let filename = ''

    for (let i = 0; i < f.length; i++) {
      // 013 010 013 010
      if (i < f.length - 4 &&
          f[i] === 13 &&
          f[i + 1] === 10 &&
          f[i + 2] === 13 &&
          f[i + 3] === 10 ) {
        let val = f.slice(0, i + 4).toString()
        let reg = /filename="[^"]*"/
        let arr = reg.exec(val)
        filename = arr[0].slice(10).slice(0, -1)

        f = f.slice(i + 4)
        break
      }
    }

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
      console.log(err)
    })

    console.log(f[0])

    fs.unlinkSync(filePath)

    count++

    res.send("Файл загружен")
  })
})

app.listen(3000, () => {
  console.log("Server started...")
})