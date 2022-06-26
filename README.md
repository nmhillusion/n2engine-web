# n2ngin-bull-engine

n2engine series: BullEngine to render (pug|scss|typescript|assets|variables) to (html|css|javascript|assets)

---

## Usage:

```typescript
new BullEngine()
  .config({
    rootDir: fs.realpathSync(rootDir),
    outDir: fs.realpathSync(outDir),
    watch: {
      enabled: !isTesting,
      handleRenameEvent: true,
      handleChangeEvent: true,
      minIntervalInMs: 2_000,
    },
    pug: {
      enabled: true,
      config: {
        // config from pug.Options & pug.LocalsObject
        pretty: false,
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
      extsToCopy: [".png", ".jpg", ".tff", ".json"],
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

## Caveats:
- SCSS: Only support SCSS file, not support SASS file
- Root Dir and Out Dir: must be the real path (full path), not support relative path (start with `./`, `../`)

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

Then, you can use these variables in code by synctax: `{{\s*n2v:<variable.path>\s*}}`

### Example of usage:
```pug
html
  head
    title {{ n2v:app.name }}

  body
    h1.author {{n2v:author.name}}
    p {{ n2v.author.email }}
```