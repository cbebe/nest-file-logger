import { ConsoleLogger, Inject, Injectable } from "@nestjs/common";
import "reflect-metadata";
import { Logger as WinstonLogger } from "winston";

type Level = "debug" | "log" | "warn" | "error";
@Injectable()
export class FileLogger extends ConsoleLogger {
  @Inject("winston") logger: WinstonLogger;

  private doLog(level: Level, message: any, ...optionalParams: any[]) {
    super[level](message, ...optionalParams);
    this.logger[level === "log" ? "info" : level](
      JSON.stringify([
        message instanceof Error ? message.stack : message,
        ...optionalParams,
      ])
    );
  }

  public debug(message: any, ...optionalParams: any[]): void {
    this.doLog("debug", message, ...optionalParams);
  }
  public log(message: any, ...optionalParams: any[]): void {
    this.doLog("log", message, ...optionalParams);
  }
  public warn(message: any, ...optionalParams: any[]): void {
    this.doLog("warn", message, ...optionalParams);
  }
  public error(message: any, ...optionalParams: any[]): void {
    this.doLog("error", message, ...optionalParams);
  }
}
