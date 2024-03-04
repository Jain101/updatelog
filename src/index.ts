/*HTTP Server without framework 

const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        req.statusCode = 200
        // go to localhost:3001 in your browser to see these messages
        console.log('GET request received')
        res.write('Hello from HTTP server!')
        // console.log(req)
        // console.log(res)
        res.end()
    }
})
server.listen(3001, () => {
    console.log('Server is running on port 3001')
})
*/

// HTTP Server with Express

import * as dotenv from 'dotenv'
dotenv.config()
import app from "./server"

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})