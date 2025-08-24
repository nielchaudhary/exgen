#!/usr/bin/env node

import { program } from "commander";
import { initCommand } from "./commands/init";

program
  .name("super-express-init")
  .description("stop writing BS boilerplate code again & again")
  .version("1.0.0");

program.action(async () => {
  await initCommand();
});

program.parse();
