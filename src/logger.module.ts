import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import { FileLogger } from "./file.logger.service";

const { combine, timestamp, printf } = format;
const logFormat = printf(
  ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
);

const CustomWinstonModule = WinstonModule.forRoot({
  format: combine(
    timestamp({ format: () => new Date().toISOString() }),
    logFormat
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "warn" }),
    new transports.File({ filename: "logs/combined.log", level: "info" }),
    new transports.File({ filename: "logs/debug.log", level: "debug" }),
  ],
});

@Module({
  imports: [CustomWinstonModule],
  providers: [FileLogger],
  exports: [FileLogger],
})
export class LoggerModule {}
