# Nest File Logger

# Usage

Import `LoggerModule` into your `AppModule`

```ts
import { Module } from "@nestjs/common";
import LoggerModule from "nest-file-logger";

@Module({
  imports: [LoggerModule],
})
export class AppModule {}
```

Use `FileLogger` on application setup:

```ts
import { NestFactory } from "@nestjs/core";
import { FileLogger } from "nest-file-logger";
import { AppModule } from "./app.module";

const app = await NestFactory.create(AppModule);
app.useLogger(app.get(FileLogger));
```
