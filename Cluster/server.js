const cluster = require('cluster');

const os = require("os");
const express = require('express');

const totalCPUs = os.cpus().length;

if(cluster.isPrimary) {
    for(let i = 0; i < totalCPUs; i++){
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 8001;

app.get('/', (req, res) => {
    // console.log(`Request handled by process ${process.pid}`);
    return res.json({ message: `hello from express server ${process.pid}`});
})

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
}