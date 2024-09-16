const morgan = require("morgan");
const { logger } = require("./logger");

const morganMiddleware = morgan('dev',
    {
        stream: {
            write: (data) => {
                logger.info(data);
            }
    }
    }
);

exports.morganMiddleware = morganMiddleware;