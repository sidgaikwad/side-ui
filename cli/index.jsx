#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const program = new Command();

// Component registry
const COMPONENTS = {
  button: {
    name: "Button",
    files: ["components/Button.js"],
    dependencies: ["ink", "react"],
  },
  progressbar: {
    name: "ProgressBar",
    files: ["components/ProgressBar.js", "utils/animations.js"],
    dependencies: ["ink", "react"],
  },
  spinner: {
    name: "Spinner",
    files: ["components/Spinner.js", "utils/animations.js"],
    dependencies: ["ink", "react"],
  },
  box: {
    name: "Box",
    files: ["utils/Box.js", "themes/index.js"],
    dependencies: ["ink", "react", "chalk"],
  },
};

program
  .name("siddcn")
  .description("CLI to install siddcn components")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize siddcn in your project")
  .action(async () => {
    const spinner = ora("Initializing siddcn...").start();

    try {
      // Create directories
      await fs.ensureDir("./src/components");
      await fs.ensureDir("./src/utils");
      await fs.ensureDir("./src/themes");

      // Create config file
      const config = {
        componentsDir: "./src/components",
        utilsDir: "./src/utils",
        themesDir: "./src/themes",
      };

      await fs.writeJSON("./siddcn.json", config, { spaces: 2 });

      spinner.succeed("siddcn initialized successfully!");
      console.log(chalk.green("\\n✓ Created directories:"));
      console.log(chalk.gray("  - src/components"));
      console.log(chalk.gray("  - src/utils"));
      console.log(chalk.gray("  - src/themes"));
      console.log(chalk.green("\\n✓ Created siddcn.json"));
      console.log(chalk.cyan("\\nNext steps:"));
      console.log(chalk.gray("  Run: siddcn add <component>"));
    } catch (error) {
      spinner.fail("Failed to initialize siddcn");
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command("add <component>")
  .description("Add a component to your project")
  .action(async (component) => {
    const componentKey = component.toLowerCase();
    const componentInfo = COMPONENTS[componentKey];

    if (!componentInfo) {
      console.error(chalk.red(`Component "${component}" not found.`));
      console.log(chalk.cyan("\\nAvailable components:"));
      Object.keys(COMPONENTS).forEach((key) => {
        console.log(chalk.gray(`  - ${key}`));
      });
      process.exit(1);
    }

    const spinner = ora(`Installing ${componentInfo.name}...`).start();

    try {
      // Check if siddcn.json exists
      let config;
      try {
        config = await fs.readJSON("./siddcn.json");
      } catch {
        spinner.fail('siddcn.json not found. Run "siddcn init" first.');
        process.exit(1);
      }

      // Copy component files
      const sourceDir = path.join(__dirname, "../src");

      for (const file of componentInfo.files) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join("./src", file);

        await fs.ensureDir(path.dirname(targetPath));
        await fs.copy(sourcePath, targetPath);
      }

      spinner.succeed(`${componentInfo.name} installed successfully!`);

      console.log(chalk.green("\\n✓ Installed files:"));
      componentInfo.files.forEach((file) => {
        console.log(chalk.gray(`  - src/${file}`));
      });

      console.log(chalk.cyan("\\n📦 Required dependencies:"));
      componentInfo.dependencies.forEach((dep) => {
        console.log(chalk.gray(`  - ${dep}`));
      });

      console.log(chalk.cyan("\\n💡 Usage:"));
      console.log(
        chalk.gray(
          `  import { ${componentInfo.name} } from './components/${componentInfo.name}';`,
        ),
      );
    } catch (error) {
      spinner.fail(`Failed to install ${componentInfo.name}`);
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List all available components")
  .action(() => {
    console.log(chalk.cyan.bold("\\nAvailable Components:\\n"));
    Object.entries(COMPONENTS).forEach(([key, info]) => {
      console.log(chalk.green(`  ${key}`));
      console.log(chalk.gray(`    ${info.name}`));
      console.log(chalk.gray(`    Files: ${info.files.length}`));
      console.log();
    });
  });

program.parse();
