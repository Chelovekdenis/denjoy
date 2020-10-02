// const createError = require('http-errors')
// const express = require('express')
// const path = require('path')
// const logger = require('morgan')
//
// const indexRouter = require('./routes/index')
// const loginRouter = require('./routes/login')
//
// const app = express()
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')
//
// app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
//
// app.use(express.static(path.join(__dirname, 'public')))
//
//
// app.use('/', indexRouter)
// app.use('/login', loginRouter)
//
//
//
//
//
//
// // app.get('/', (req, res) => {
// //   res.sendFile(__dirname + "/public/form_data.html")
// // })
// //
// //
// //
// // const multer = require("multer")
// //
// // const storageConfig = multer.diskStorage({
// //   destination: (req, file, cb) =>{
// //     cb(null, "uploads")
// //   },
// //   filename: (req, file, cb) =>{
// //     cb(null, file.originalname)
// //   }
// // })
// //
// // const upload = multer({storage:storageConfig})
// //
// // app.post('/upload', upload.single("filedata"), (req, res) => {
// //   let filedata = req.file
// //   console.log(filedata)
// //   if(!filedata)
// //     res.send("Ошибка при загрузке файла")
// //   else
// //     res.send("Файл загружен")
// // })
//
//
//
// app.use(function(req, res, next) {
//   next(createError(404))
// })
//
// app.use(function(err, req, res) {
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//   res.status(err.status || 500)
//   res.render('error')
// })
//
// module.exports = app
//
// // let http = require('http')
// // let fs = require('fs')
// //
// // http.createServer(function(request,response){
// //   response.writeHead(200)
// //   let destinationFile = fs.createWriteStream("uploads/destination.png")
// //   request.pipe(destinationFile)
// //
// //   let fileSize = request.headers['content-length']
// //   let uploadedBytes = 0
// //
// //   request.on('data',function(d){
// //
// //     uploadedBytes += d.length
// //     let p = (uploadedBytes/fileSize) * 100
// //     // response.write("Uploading " + parseInt(p)+ " %\n")
// //
// //   })
// //
// //   request.on('end',function(){
// //     response.end("File Upload Complete")
// //   })
// //
// // }).listen(3000,function(){
// //
// //   console.log("server started")
// //
// // })


const createError = require('http-errors')
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

let count = 20

app.post('/upload', async (req, res) => {


  let file = await fs.createWriteStream(`./uploads/${count}`)
  count++



  req.pipe(file)


  res.send("Файл загружен")
})


let f = fs.readFileSync("./uploads/20")

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


fs.writeFile(`./${filename}`, f, err => {
  console.log(err)
})

console.log(f[0])


app.listen(3000, () => {
  console.log("Server started...")
})