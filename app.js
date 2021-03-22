const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const cors = require('cors')

// Create Redis Client
let client = redis.createClient()
client.on('connect', () => {
  console.log('Connected to Redis...')
})

// Set Port
const port = 5000

// Init app
const app = express()
app.use(cors())

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


// Get all links
app.get('/links', (req, res) => {

  client.HGETALL("links", (err, results) => {
    res.json(results)
  })

})

// Add a new link
app.post('/link/add', (req, res) => {
  let long = req.body.long
  let short = Buffer.from(long).toString('base64')

  client.hmset("links", [
    short, long

  ], (err, reply) => {
    if(err){
      console.log(err)
    }
    console.log(reply)
    res.json("successfully added link")
  })
})

// Get link by base64
app.get("/:shortened", (req, res) => {
  let short = req.params.shortened
  client.hget("links", short, function (err, obj) {
    res.json(obj)
 });
})


app.listen(port, () => {
  console.log('Server started on port ' + port)
})