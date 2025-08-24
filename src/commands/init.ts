import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import { getProjectConfig } from "../utils/prompts";
import { TemplateManager } from "../utils/templates";
import { PackageInstaller } from "../utils/installer";

export async function initCommand(): Promise<void> {
  try {
    console.log(chalk.blue.bold("🚀 Exgen CLI\n"));

    const config = await getProjectConfig();
    const projectPath = path.join(process.cwd(), config.name);

    if (await fs.pathExists(projectPath)) {
      console.error(chalk.red(`❌ Directory "${config.name}" already exists!`));
      process.exit(1);
    }

    console.log(chalk.green("✨ Initialising project..."));

    await fs.ensureDir(projectPath);

    console.log(chalk.blue("📁 Copying template files..."));
    const templateManager = new TemplateManager();
    await templateManager.copyTemplate(config, projectPath);

    try {
      await PackageInstaller.initGit(projectPath);
    } catch (error) {
      console.log(
        chalk.yellow("⚠️ Git initialization failed (git not installed?)")
      );
    }

    if (config.installDependencies) {
      try {
        await PackageInstaller.install(config.packageManager, projectPath);
      } catch (error) {
        console.error(chalk.red("❌ Failed to install dependencies:"), error);
        console.log(
          chalk.yellow(
            `💡 Run "${config.packageManager} install" manually in the project directory`
          )
        );
      }
    }

    console.log(chalk.green.bold("\n🎉 Project created successfully!\n"));

    console.log(chalk.blue("Next steps:"));
    console.log(`  cd ${config.name}`);
    if (!config.installDependencies) {
      console.log(`  ${config.packageManager} install`);
    }
    console.log(`  ${config.packageManager} run dev`);
    console.log("");
  } catch (error) {
    console.error(chalk.red("❌ Failed to create project:"), error);
    process.exit(1);
  }
}
