const { player, population } = require('./models').models
const express = require("express")
const path = require("path")
const app = express()

player.sync()
  .then(() => console.log('Success sync player table'))
  .catch(err => {
    console.log(err)
    console.log('Failed sync player table')
  })

population.sync()
  .then(() => console.log('Successs sync population table'))
  .catch(err => {
    console.log(err)
    console.log('Failed sync population table')
  })

if (process.env.NODE_ENV == "development") app.use(require("cors")())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use("/api", require("./routes/api"))

app.get("/", (req, res) => res.sendFile(path.join(__dirname), "public", "index.html"))
app.get("*", (req, res) => res.redirect("/"))

module.exports = app
