### Installation
```
npm install
```

### Generating test data
```
ENTRIES=10 COMPONENTS=10 npm run generate
```
### Build
```
npm run build
```

### For causing OOM scenario, use
```
ENTRIES=1 COMPONENTS=1000 ENUMS=5000 npm run generate && npm run build
```