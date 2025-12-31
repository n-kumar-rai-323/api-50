const http = require('http');
const app = require('./src/config/express.config');

const server = http.createServer(app);

server.listen(9005,'localhost', (err) => {
    if (!err){
        console.log('Server is running on http://localhost:9005');
    }
});