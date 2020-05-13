const fs = require('fs-extra');
const path = require('path');
const { customAlphabet } = require('nanoid');
const _ = require('lodash');

const getRandomSass = require('./getRandomSass');
const getRandomJs = require('./getRandomJs');

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

const entriesNumber = parseInt(process.env.ENTRIES, 10) || 1;
const entryComponentsNumber = parseInt(process.env.COMPONENTS, 10) || 1;

const rootDir = process.cwd();
const srcDir = path.resolve(rootDir, 'generatedSrc');
const entriesDir = path.resolve(srcDir, 'entries');
const cmpDir = path.resolve(srcDir, 'components');

async function generateComponent(id, entryId) {
  // Generating basic component files
  const componentDir = path.resolve(cmpDir, id);
  await fs.ensureDir(componentDir);

  // Generate styles
  const styles = getRandomSass(id);
  await fs.writeFile(`${componentDir}/index.scss`, styles, 'utf8');

  // Generate JS
  const jsContent = getRandomJs(id);
  await fs.writeFile(`${componentDir}/index.js`, jsContent, 'utf8');

  console.log(`Generated component ${id} for entry ${entryId}`);
}

async function generateEntry(id) {
  // Generate directory
  const entryDir = path.resolve(entriesDir, id);
  await fs.ensureDir(entryDir);

  // Generate styles
  const styles = getRandomSass(id);
  await fs.writeFile(`${entryDir}/index.scss`, styles, 'utf8');

  // Generating entry components
  const componentPromises = [];
  const componentIds = [];
  let i = 0;
  const cmpNumber = process.env.RANDOMIZE ? _.random(entryComponentsNumber > 1 ? entryComponentsNumber / 2 : 1, entryComponentsNumber) : entryComponentsNumber;
  while (i < cmpNumber) {
    const componentId = nanoid();
    componentPromises.push(generateComponent(componentId, id));
    componentIds.push(componentId);
    i++;
  }
  await Promise.all(componentPromises);

  // Generate JS
  const jsContent = getRandomJs(id, componentIds);
  await fs.writeFile(`${entryDir}/index.js`, jsContent, 'utf8');

  console.log(`Generated entry ${id}`);
}

async function generate() {
  // Empty generatedSrc dir
  await fs.emptyDir(srcDir);

  // generate entries
  const entryPromises = [];
  let i = 0;
  while (i < entriesNumber) {
    const id = nanoid();
    entryPromises.push(generateEntry(id));
    i++;
  }

  await Promise.all(entryPromises);
}

generate()
  .then(() => {
    console.log(`Generated ${entriesNumber} entries with ${entryComponentsNumber} components`);
  })
  .catch((error) => {
    console.error(error);
  });
