const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
var bodyParser = require("body-parser")
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(middlewares)

server.post("/login", (req, res) => {
  console.log(req.body)
  var { users } = router.db['__wrapped__'];
  var p = users.find((user) => {
    return (user.username === req.body.username && user.password === req.body.password)
  })
  if (p) {
    var token = jwt.sign(p, "evaddiki cheppaku")
    res.send({ msg: "SUCCESS", token, username: p.username, role: p.role })
  }
  else {
    res.send({ msg: "FAILURE" })
  }
})

server.get("/getDetailsByToken", (req, res) => {
  try {
    var x = jwt.verify(req.headers.token, "evaddiki cheppaku")
    res.send({ msg: "UPDATED", username: x.username, role: x.role })
  }
  catch (e) {
    res.send({ msg: "ERROR" })
  }
})
// server.use(function(req,res,next){
//   // console.log(req.headers)
//   console.log("Middleware called")
//   // try{
//   //   var x = jwt.verify(req.headers.token,"evaddiki cheppaku")
//   //   next();
//   // }
//   // catch(e){
//   //   res.send({msg:"invalid"})
//   // }
//   jwt.verify(req.headers.token,"evaddiki cheppaku",function(err,decoded){
//     if(err){
//       res.send({msg:"invaliduuuu"})
//     }
//     else{
//       next();
//     }
//   })

// })
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})