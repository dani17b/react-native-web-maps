import React, { Component } from 'react';
import { Circle } from 'react-google-maps';

class MapViewCircle extends Component {
  render() {
    return (
      <Circle
        draggable={this.props.draggable}
        center={{ lat: this.props.center.latitude, lng: this.props.center.longitude }}
        radius={this.props.radius}
        options={{
            strokeColor : this.props.strokeColor,
            fillColor : this.props.fillColor
        }}
      />
    );
  }
}

export default MapViewCircle;