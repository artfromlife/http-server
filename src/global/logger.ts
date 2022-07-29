import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as stack from 'callsite';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as path from 'path';

const logDirectory = path.join(__dirname, '../../logs');

const innerLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} | ${level} | ${message} `),
  ),
  transports: [
    new winston.transports.Console({
      format: nestWinstonModuleUtilities.format.nestLike(),
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: logDirectory,
      auditFile: path.join(logDirectory, 'access.audit.json'),
      filename: 'access.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      dirname: logDirectory,
      auditFile: path.join(logDirectory, 'error.audit.json'),
      filename: 'error.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const serialize = (args: any[]): string => {
  const stackList = stack() || [];
  const caller = stackList[2];
  let preStr = '';
  if (caller.getFileName) {
    const filename = caller.getFileName();
    preStr += filename.substring(filename.lastIndexOf('/') + 1) + ' : ';
    preStr += caller.getLineNumber() + ' | ';
  }
  let content = '';
  args.forEach(log => {
    if (log instanceof Error) {
      content += log.stack + ' ';
    } else if (['Object', 'Array'].includes(Object.prototype.toString.call(log).slice(8, -1))) {
      content += JSON.stringify(log, null, 2) + ' ';

    } else {
      content += log + ' ';
    }
  });
  return preStr + content;
  return '';
};

global.logger = {
  info: (...args) => innerLogger.info(serialize(args)),
  debug: (...args) => innerLogger.debug(serialize(args)),
  error: (...args) => innerLogger.error(serialize(args)),
  warn: (...args) => innerLogger.warn(serialize(args)),
  verbose: (...args) => innerLogger.verbose(serialize(args)),
  silly: (...args) => innerLogger.silly(serialize(args)),
};
