var express = require('express')
var app = express()
const PORT = process.env.NODE_ENV === 'production' ? 80 : 4200
app.use(express.static(__dirname + '/dist'))
console.log('Listening to port ' + PORT)
app.listen(PORT)
