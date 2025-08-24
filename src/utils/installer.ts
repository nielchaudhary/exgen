import { spawn } from "child_process";
import chalk from "chalk";

export class PackageInstaller {
  static async install(
    packageManager: "npm" | "pnpm",
    projectPath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(chalk.blue("📦 Installing dependencies..."));

      const child = spawn(packageManager, ["install"], {
        cwd: projectPath,
        stdio: "inherit",
        shell: true,
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`${packageManager} install failed with code ${code}`)
          );
        }
      });

      child.on("error", (error) => {
        reject(error);
      });
    });
  }

  static async initGit(projectPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(chalk.blue("🔧 Initializing git repository..."));

      const child = spawn("git", ["init"], {
        cwd: projectPath,
        stdio: "pipe",
        shell: true,
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Git init failed with code ${code}`));
        }
      });

      child.on("error", (error) => {
        reject(error);
      });
    });
  }
}
