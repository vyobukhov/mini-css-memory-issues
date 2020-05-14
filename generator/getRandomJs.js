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
import { differenceBy } from 'lodash';
import CommonComponent from '../../../src/common/commonComponent';
${componentImports}

export default class ${moduleName} extends React.Component {
  render() {
    return (
        <div className="${c('wrapper')}">
            <div className="${c('container')}">
                <div className="${c('svg-container')}">
                    ${componentJSX}
                </div>
                
                <CommonComponent>
                  <div className="${c('stripes')}">{differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)}</div>
                  <div className="${c('overlay')}">
                      <div className="${c('custom-image')}" />
                  </div>
                </CommonComponent>
            </div>
        </div>
    );
  }
}  
  `;
};
