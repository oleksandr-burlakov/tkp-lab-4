const express = require('express');
const logger = require('./logger');
const { sendMetricsToGrafanaCloud } = require('./metrics');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Docker!');
});

server = app.listen(port, () => {

    logger.info(`Server is running on port: ${port}`);
});

sendMetricsToGrafanaCloud();
module.exports = { app, server };