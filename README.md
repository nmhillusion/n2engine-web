# n2ngin-bull-engine

n2engine bull engine: render (pug|markdown|scss|typescript|assets|variables) to (html|css|javascript|assets)

---

## Usage:

```typescript
new BullEngine()
  .config({
    rootDir: fs.realpathSync(rootDir),
    outDir: fs.realpathSync(outDir),
    watch: {
      enabled: !isTesting,
      config: {
        handleRenameEvent: true, // default `true`
        handleChangeEvent: true, // default `true`
        minIntervalInMs: 2_000, // default 1000ms
      },
    },
    pug: {
      enabled: true,
      config: {
        // config from pug.Options & pug.LocalsObject
        pretty: false,
      },
    },
    markdown: {
      enabled: true,
      highlightStyleName: "atom-one-dark",
      config: {
        // config from markdown.Options
      },
    },
    scss: {
      enabled: true,
      config: {
        // config from node-sass.SyncOptions
        outputStyle: "compressed",
      },
    },
    typescript: {
      enabled: true,
      config: {
        // config from tsconfig.json
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          sourceMap: false,
        },
      },
    },
    copyResource: {
      enabled: true,
      config: {
        // default of extsToCopy: [".jpg", ".jpeg", ".png", ".gif", ".ico", ".woff", ".ttf"]
        extsToCopy: [".png", ".jpg", ".tff", ".json"],
      },
    },
    rewriteJavascript: {
      enabled: true,
      config: {
        rewriteImport: true,
        compress: true,
      },
    },
  })
  .setVariableFilePathToInject(
    fs.realpathSync(process.cwd() + "/test/env/dev.env.json")
  )
  .render();
```

## Notes:

- Purpose to use for client mainly, so when use `<script>` tag, it should be type of `type="module"` to use feature module of ECMA Script. Eg: `<script src="./main.js" type="module" ></script>`
- Links in script tag or link tag with css, will auto replace path ends with `.scss` to `.css` and `.ts` to `.js`.
  Example:

```pug
link(href="./style.scss", rel="stylesheet")
script(src="./main.ts", type="module")
```

will render to:

```html
<link href="./style.css" rel="stylesheet">
<script src="./main.js" type="module></script>
```

## Pre-requisites:

- Required to install command `npx` to use Typescript renderer.
- SCSS: Only support SCSS file, not support SASS file
- Root Dir and Out Dir: must be the real path (full path), not support relative path (start with `./`, `../`)

## Metadata of Markdown file:

- `layoutPath`: path of layout file, relative to current file
- `title`: title of post
- `iconLink`: link of icon, url address of image
- `@<<paramName>>`: variables with paramName

### Example:

```markdown
---
layoutPath: "../layout/_posts2.pug"
title: "DNA definition"
iconLink: "/post/dna.png"
@author: nmhillusion
@date: 2024-08-18 12:14:46 +0700
@categories: news, science, biology
---

Deoxyribonucleic acid (/diːˈɒksɪˌraɪboʊnjuːˌkliːɪk, -ˌkleɪ-/ ⓘ;[1] DNA) is a polymer composed of two polynucleotide chains that coil around each other to form a double helix.
```

## Variables:

Structure of a variable environment file must look like:

```json
{
  "app": {
    "name": "Street Dancer",
    "version": "1.0.1"
  },
  "author": {
    "name": "nmhieu",
    "email": "nguyenminhhieu.geek@gmail.com",
    "gender": "M"
  }
}
```

Then, you can use these variables in code by syntax: `{{\s*n2v:<variable.path>\s*}}`

### Example of usage:

```pug
html
  head
    title {{ n2v:app.name }}

  body
    h1.author {{n2v:author.name}}
    p {{ n2v.author.email }}
```

---

## Development:

- Main source directory: `src`

- You have to run `npm run build` for any chnages in this project `src` to rebuild the project.

- Read `package.json` for more commands.

- Core parts:

  - Engine: `src/core` - main module to proceed engine
  - Renderer: `src/renderer` - module of renders:

    - Pre-renderer: `src/renderer/pre-renderer` - module of pre-renderers
    - Post-renderer: `src/renderer/post-renderer` - module of post-renderers

  - Helpers: `src/helper` - module of helpers and utilities

## Testing:

- Run `npm run test` to test this project.

## Example Server for testing:

- Locate at `/sample`

- `npm run watch` to test this example server in watch mode. Or `npm run test` to build example server for serve.

- Then, serving for Example Server by `npm run serve`.
