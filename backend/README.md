# Backend

## Commands

- Init: `deno init my_project`
- Run: `deno run main.rs`
- Test: `deno test`
- Run scripts: `deno task script_name`
- Lint: `deno lint`
- Format: `deno fmt`
- Check formatting: `deno fmt --check`

## Type checking
`strict mode` by default

```bash
# Check the current directory/module
deno check

# Check a specific TypeScript file
deno check module.ts

# Include remote modules and npm packages in the check
deno check --all module.ts

# Check code snippets in JSDoc comments
deno check --doc module.ts

# Check code snippets in markdown files
deno check --doc-only markdown.md
```

By default, Deno will skip type checking when ran, could be enable though:

```bash
# will type check this particular module
deno run --check module.ts

# will type check remote modules and npm packages
deno run --check=all module.ts
```

## Node/npm

`npm` import example:
`import { Hono } from "npm:hono";`

