const express = require("express");

const { connectRedis } = require("./config/redis-config");
const { logger } = require('./config/logger');
const { morganMiddleware } = require('./config/morgan-middleware');

const PORT = process.env.PORT || 3000;

connectRedis();

const app = express();

app.use(morganMiddleware);

app.use(express.json());

app.get('/',
    (req, res) => {
        res.json({ "message": "Server is live" });
    }
);

app.use('/api/v1', require("./routes"));


app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});