const express = require("express")
const {connect,sync} = require("./db")
const app = express()
const port = 1234
const usersRouter = require("./controllers/users.js")
const cors = require('cors')
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("hey")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use("/users",usersRouter)

connect()
sync()