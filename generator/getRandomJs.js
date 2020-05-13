module.exports = function (moduleName = 'DefaultComponent', componentNames = []) {

  const c = (className) => {
    return `${moduleName}__${className}`;
  };

  let componentImports = '';
  let componentJSX = '';
  if (componentNames && componentNames.length) {
    componentNames.forEach(name => {
      componentImports += `import ${name} from '../../components/${name}';\n`;
      componentJSX += `<${name} />\n`;
    });
  }

  return `
import './index.scss';
import React from 'react';
${componentImports}

export default class ${moduleName} extends React.Component {
  render() {
    return (
      <div className="${c('wrapper')}">${componentJSX}</div>
    );
  }
}  
  `;
};
