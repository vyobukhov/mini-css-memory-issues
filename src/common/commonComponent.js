import React from 'react';
import './commonComponent.scss';

export default class CommonComponent extends React.PureComponent {
  render() {
    return (
      <div className="sr-common-component">{this.props.children}</div>
    )
  }
}
