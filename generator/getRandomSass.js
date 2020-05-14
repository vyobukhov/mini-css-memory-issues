const { sample } = require('lodash');

module.exports = function (moduleName) {
  return `
@import '../../../src/common/variables';
$lmtAspectRatio: 352 / 568;

@mixin absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.sr-${moduleName}_ {
  &_wrapper {
    padding: $spacing-${sample(['xxxs', 'xxs', 'xs', 's', 'm'])};
  }
  
  &_container {
    padding-bottom: $lmtAspectRatio * 100%;
    background-color: #5c8301;
    position: relative;
    overflow: hidden;
    z-index: 0;
  }
  
  &_svg-container {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: absolute;
    opacity: 0.54;
    &.srm-is-light {
        opacity: .25;
    }
  }
  
  &_overlay {
    background: radial-gradient(ellipse closest-corner at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  
  &_stripes {
    position: absolute;
    left: 6.7%;
    right: 1.7%;
    top: 3%;
    bottom: 3%;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 50%, transparent 20%);
    background-size: 14.575% 1%;
    &.srm-is-light {
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.025) 50%, transparent 20%);
    }
  }
  
  &_custom-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
  `;
};
