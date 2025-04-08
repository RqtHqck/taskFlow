const { createLogger, format, transports } = require("winston");

// Конфигурация логгера
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json() // Формат логов в JSON
  ),
  transports: [
    new transports.File({
      level: "error",
      filename: "./logs/all-logs.log",
      handleExceptions: true,
      format: format.json(),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exitOnError: false,
});

// Поток для использования с morgan
logger.stream = {
  write: function (message: any): void {
    // Убираем возможные проблемы с передачей строки в log
    logger.info({ message: message.trim() });
  },
};

export default logger;
