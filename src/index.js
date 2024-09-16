const express = require("express");

const { connectRedis } = require("./config/redis-config");

const PORT = process.env.PORT || 3000;

connectRedis();

const app = express();

app.use(express.json());

app.get('/',
    (req, res) => {
        res.json({ "message": "Server is live" });
    }
);

app.use('/api/v1', require("./routes"));


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});