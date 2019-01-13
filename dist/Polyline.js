import React, { Component } from 'react';
import { Polyline } from 'react-google-maps';

class MapViewPolyline extends Component {
  render() {
    return (
      <Polyline
        path={this.props.coordinates.map((coordinate) => { return {lat : coordinate.latitude, lng : coordinate.longitude}})}
        options={{
            strokeColor: this.props.strokeColor,
            strokeOpacity: this.props.strokeOpacity ? this.props.strokeOpacity : 1,
            strokeWeight: this.props.strokeWidth
        }}
      />
    );
  }
}

export default MapViewPolyline;