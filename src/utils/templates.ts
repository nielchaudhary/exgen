import * as fs from "fs-extra";
import * as path from "path";
import { ProjectConfig } from "../types";
import chalk from "chalk";

export class TemplateManager {
  private templatesPath: string;

  constructor() {
    this.templatesPath = path.join(__dirname, "../../templates");
  }

  async copyTemplate(config: ProjectConfig, targetPath: string): Promise<void> {
    const templatePath = path.join(this.templatesPath, config.template);

    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template "${config.template}" not found`);
    }

    await fs.copy(templatePath, targetPath);

    await this.processTemplateFiles(targetPath, config);
    await this.createEnvFile(config, targetPath);
  }

  private async processTemplateFiles(
    targetPath: string,
    config: ProjectConfig
  ): Promise<void> {
    const filesToProcess = [
      "package.json",
      "README.md",
      "src/**/*.ts",
      "src/**/*.js",
    ];

    for (const pattern of filesToProcess) {
      const files = await this.getFilesByPattern(targetPath, pattern);

      for (const file of files) {
        await this.replaceTemplateVariables(file, config);
      }
    }
  }

  private async getFilesByPattern(
    basePath: string,
    pattern: string
  ): Promise<string[]> {
    const files: string[] = [];

    if (pattern.includes("**")) {
      await this.walkDirectory(basePath, (filePath) => {
        if (pattern.includes("*.ts") && filePath.endsWith(".ts"))
          files.push(filePath);
        if (pattern.includes("*.js") && filePath.endsWith(".js"))
          files.push(filePath);
      });
    } else {
      const filePath = path.join(basePath, pattern);
      if (await fs.pathExists(filePath)) {
        files.push(filePath);
      }
    }

    return files;
  }

  private async walkDirectory(
    dir: string,
    callback: (filePath: string) => void
  ): Promise<void> {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await this.walkDirectory(filePath, callback);
      } else {
        callback(filePath);
      }
    }
  }

  private async replaceTemplateVariables(
    filePath: string,
    config: ProjectConfig
  ): Promise<void> {
    let content = await fs.readFile(filePath, "utf8");

    content = content.replace(/{{PROJECT_NAME}}/g, config.name);
    content = content.replace(/{{PROJECT_DESCRIPTION}}/g, config.description);
    content = content.replace(/{{AUTHOR_NAME}}/g, config.author);
    content = content.replace(/{{MONGO_URI}}/g, config.mongoURI);

    await fs.writeFile(filePath, content);
  }

  private async createEnvFile(
    config: ProjectConfig,
    targetPath: string
  ): Promise<void> {
    const envContent = `
    NODE_ENV=development
    PORT=8090
    MONGO_URI="${config.mongoURI}"
    `;

    const envPath = path.join(targetPath, ".env");
    await fs.writeFile(envPath, envContent);

    console.log(chalk.blue("📝 Created .env file with MongoDB URI"));
  }
}
