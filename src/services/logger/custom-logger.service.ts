import { ConsoleLogger, Injectable } from '@nestjs/common';
import { mkdir, rename, stat, appendFile } from 'fs/promises';

import { resolve } from 'path';

import * as dotenv from 'dotenv';
import { LogLevels } from './log-levels';

dotenv.config();

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly maxFileSize: number;
  private readonly logLevel: number;
  private readonly pathToLogFile: string;
  private readonly pathToErrorFile: string;

  private static pathToLogsDir = resolve(process.cwd(), 'logs');

  constructor() {
    super();
    this.setLogDirectory();
    this.globalRejectHandler();
    this.maxFileSize = this.parseFileSize(process.env.LOG_MAX_SIZE || '100KB');
    this.logLevel = this.getLogLevelFromConfig(process.env.LOG_LEVEL);
    this.pathToLogFile = resolve(CustomLogger.pathToLogsDir, 'logsStack.log');
    this.pathToErrorFile = resolve(
      CustomLogger.pathToLogsDir,
      'errorsStack.log',
    );
  }

  private globalRejectHandler() {
    process.on('uncaughtException', (err: Error) => {
      this.error({
        type: 'UncaughtException',
        message: err.message,
        stack: err.stack,
      });

      process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown) => {
      this.error({
        type: 'UnhandledRejection',
        reason:
          reason instanceof Error
            ? {
                message: reason.message,
                stack: reason.stack,
              }
            : JSON.stringify(reason),
      });

      process.exit(1);
    });
  }

  log(message: any, context?: string) {
    if (this.logLevel > 2) return;

    super.log(message, context);
    this.writeToFile(LogLevels[2], message, this.pathToLogFile, context);
  }

  warn(message: any, context?: string) {
    if (this.logLevel < 1) return;

    super.warn(message, context);
    this.writeToFile(LogLevels[1], message, this.pathToLogFile, context);
  }

  error(message: any, trace?: string, context?: string) {
    // always showed error
    super.error(message, trace, context);
    this.writeToFile(
      LogLevels[0],
      { message, trace },
      this.pathToErrorFile,
      context,
    );
  }

  debug(message: any, context?: string) {
    if (this.logLevel < 3) return;

    super.debug(message, context);
    this.writeToFile(LogLevels[3], message, this.pathToLogFile, context);
  }

  verbose(message: any, context?: string) {
    if (this.logLevel < 3) return;

    super.verbose(message, context);
    this.writeToFile(LogLevels[4], message, this.pathToLogFile, context);
  }

  private async setLogDirectory() {
    try {
      await mkdir(CustomLogger.pathToLogsDir);

      this.log(
        `Directory for log files was created on path: ${CustomLogger.pathToLogsDir}`,
      );
    } catch {
      this.log(
        `Directory for log files already exists on path: ${CustomLogger.pathToLogsDir}`,
      );
    }
  }

  private parseFileSize(size: string) {
    const units = {
      kb: 1024,
      mb: Math.pow(1024, 2),
    };

    const matchSize = size.match(/(\d+)(KB|MB)$/i);
    // default 100KB size
    if (!matchSize) return 100 * 1024;

    const [_, value, unit] = matchSize;

    return parseInt(value) * units[unit.toLowerCase()];
  }

  private getLogLevelFromConfig(level: string) {
    switch (level) {
      case LogLevels[0]:
      case LogLevels.ERROR:
        return 0;

      case LogLevels[1]:
      case LogLevels.WARN:
        return 1;

      case LogLevels[2]:
      case LogLevels.LOG:
        return 2;

      case LogLevels[3]:
      case LogLevels.DEBUG:
        return 3;

      case LogLevels[4]:
      case LogLevels.VERBOSE:
        return 4;

      default:
        return 2;
    }
  }

  private async checkRotation(pathToFile: string, additionalSize?: number) {
    try {
      const size = await this.getFileSize(pathToFile);
      if (
        !size ||
        size < this.maxFileSize ||
        (additionalSize && size + additionalSize < this.maxFileSize)
      )
        return;

      const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
      const pathToNewFile = resolve(
        CustomLogger.pathToLogsDir,
        `${pathToFile}-${timeStamp}.log`,
      );

      await rename(pathToFile, pathToNewFile);
    } catch (err) {
      this.error({
        type: `Error with renaming log file ${pathToFile} inside checkRotation`,
        reason:
          err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
              }
            : JSON.stringify(err),
      });
    }
  }

  private async writeToFile(
    logLevel: string,
    message: any,
    path: string,
    context?: string,
  ) {
    try {
      const timeStamp = new Date().toISOString();

      const logEntity =
        JSON.stringify({
          timeStamp,
          level: logLevel,
          context,
          message,
        }) + '\n';

      const sizeInAdvance = this.getSizeOfString(logEntity);
      await this.checkRotation(path, sizeInAdvance);

      await appendFile(path, logEntity, { encoding: 'utf-8', flag: 'a' });
    } catch (err) {
      this.error({
        type: `Error with writing log file ${path} inside writeToFile`,
        reason:
          err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
              }
            : JSON.stringify(err),
      });
    }
  }

  private getSizeOfString = (str: string) => Buffer.from(str).length;

  private async getFileSize(path: string) {
    try {
      return (await stat(path)).size;
    } catch {
      return null;
    }
  }
}
