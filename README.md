### Installation
```
yarn install
```

### Generating test data
```
ENTRIES=10 COMPONENTS=10 ENUMS=100 yarn generate
```
### Build
```
yarn build
```

### For causing OOM scenario set `experimentalUseImportModule` to `false` in MiniCSSExtractPlugin and use
```
ENTRIES=1 COMPONENTS=1000 ENUMS=5000 yarn generate && npm run build
```

### Hot reload
```
ENTRIES=5 COMPONENTS=1000 ENUMS=5000 yarn generate && yarn start
```

After this try to edit some JSX in `src/components/test.jsx`
