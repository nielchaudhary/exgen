# exgen
A CLI tool to **scaffold Express + TypeScript projects** quickly.  
---

## Features
- Generates a fully configured **Express + TypeScript** app
- Comes with ESLint, logger, and error handling out of the box
- Interactive prompts for setup
- Organized folder structure
- Ready for MongoDB

---

## Templates
- Express + TS + Mongo
- Express + TS - coming soon
- Express + Prisma + Supabase - coming soon

---


## Installation
### Global install (recommended)
```bash
npm install -g exgen
````
### Local usage (via npx)
```bash
npx exgen-init
```

---

## Usage
Run the CLI to initialize a new project:
```bash
exgen-init
```
Follow the interactive prompts to:
* Select project name
* Available Database Setup : MongoDB
* Scaffold TypeScript + Express boilerplate

---

## Example Project Structure
Generated project:
```
my-app/
├── src/
│   ├── app.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── error.ts
│   │   └── logger.ts
├── tsconfig.json
├── package.json
└── eslint.config.js
```

---

## Scripts in Generated Project
Inside your generated project you'll have:
```bash
npm run dev     # Start in watch mode (ts-node-dev)
npm run build   # Compile TypeScript
npm start       # Run compiled JS
```

---

## Development (for contributors)
Clone the repo:
```bash
git clone https://github.com/nielchaudhary/exgen.git
cd exgen
npm install
npm run build
```
Test your CLI locally:
```bash
npm link
exgen-init
```

---

## License
ISC © 2025 [Neel Chaudhary](https://github.com/nielchaudhary)
