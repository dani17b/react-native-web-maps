import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

class MapViewMarker extends Component {
  render() {
    if(this.props.children){
      return (
        <MarkerWithLabel
          draggable={this.props.draggable}
          onDragEnd={this.props.onDragEnd}
          title={this.props.description ? `${this.props.title}\n${this.props.description}` : this.props.title}
          position={{ lat: this.props.coordinate.latitude, lng: this.props.coordinate.longitude }}
          opacity={typeof this.props.opacity != "undefined" ? this.props.opacity : 1}
        >
          {this.props.children}
        </MarkerWithLabel>
      );
    }

    return (
      <Marker
        draggable={this.props.draggable}
        onDragEnd={this.props.onDragEnd}
        title={this.props.description ? `${this.props.title}\n${this.props.description}` : this.props.title}
        position={{ lat: this.props.coordinate.latitude, lng: this.props.coordinate.longitude }}
        opacity={typeof this.props.opacity != "undefined" ? this.props.opacity : 1}
      >
        {this.props.children}
      </Marker>
    );
  }
}

export default MapViewMarker;