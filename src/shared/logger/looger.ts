/* eslint-disable no-undef */
import path from 'path'
// import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minutes}:${second} [${label}] ${level}: ${message}  `
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'phu-%DATE%-success.log',
      ),
      level: 'info',
    }),
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'phu-%DATE%-error.log',
      ),
      level: 'error',
    }),
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
