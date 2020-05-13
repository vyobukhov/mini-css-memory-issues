const { sample } = require('lodash');

module.exports = function (moduleName) {
  return `
@import '../../../src/common/variables';

.sr-${moduleName}_ {
  &_wrapper {
    padding: $spacing-${sample(['xxxs', 'xxs', 'xs', 's', 'm'])};
  }
}
  `;
};
