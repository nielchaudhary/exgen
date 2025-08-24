export interface ProjectConfig {
  name: string;
  description: string;
  author: string;
  template: string;
  packageManager: "npm" | "pnpm";
  installDependencies: boolean;
  mongoURI: string;
}

export interface TemplateInfo {
  name: string;
  displayName: string;
  description: string;
}
