const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = combine(
    colorize(),
    timestamp(),
    format.printf(({ level, message, timestamp }) => {
        return `${level}: ${message}`;
    })
);

// Create a Winston logger
const logger = createLogger({
    level: "info",
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({ filename: './logs/all.log' ,
            label: 'file'
        }),
    ],
});

console.log("Logger was created");

exports.logger = logger;