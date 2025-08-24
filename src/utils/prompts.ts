import inquirer from "inquirer";
import { ProjectConfig, TemplateInfo } from "../types";

const templates: TemplateInfo[] = [
  {
    name: "express-mongo",
    displayName: "Express + MongoDB Integration",
    description: "Express Backend Application with MongoDB Integration",
  },
];

export async function getProjectConfig(): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your project name?",
      validate: (input: string) => {
        if (!input.trim()) return "Project name is required";
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return "Project name can only contain letters, numbers, hyphens, and underscores";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "description",
      message: "Project description?",
      default: "Express.js BE Project",
    },
    {
      type: "list",
      name: "template",
      message: "Choose template:",
      choices: templates.map((t) => ({
        name: `${t.displayName} - ${t.description}`,
        value: t.name,
      })),
    },
    {
      type: "input",
      name: "author",
      message: "Author name?",
      default: "",
    },
    {
      type: "list",
      name: "packageManager",
      message: "Package manager:",
      choices: [
        { name: "npm", value: "npm" },
        { name: "pnpm", value: "pnpm" },
      ],
      default: "npm",
    },
    {
      type: "input",
      name: "mongoURI",
      message: "MongoDB URI?",
      validate: (input: string) => {
        if (!input.trim()) return "mongoURI is required";
        return true;
      },
    },
    {
      type: "confirm",
      name: "installDependencies",
      message: "Install dependencies?",
      default: true,
    },
  ]);

  return answers as ProjectConfig;
}
