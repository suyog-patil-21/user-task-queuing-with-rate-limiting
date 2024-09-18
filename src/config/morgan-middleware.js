const morgan = require("morgan");
const { logger } = require("./logger");

const morganMiddleware = morgan('combined',
    {
        stream: {
            write: (data) => {
                logger.info(data);
            }
    }
    }
);

exports.morganMiddleware = morganMiddleware;