import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';
import Circle from './Circle';
import Polyline from './Polyline';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = { center: { lat: typeof props.region != "undefined" ? props.region.latitude : 0, lng: typeof props.region != "undefined" ? props.region.longitude : 0 } };
  }

  handleMapMounted = map => (this.map = map);

  onDragEnd = () => {
    const center = this.map.getCenter();
    !!this.props.onRegionChangeComplete &&
      this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
  };

  render() {
    const { style } = this.props;
    if (!this.state.center)
      return (
        <View style={style}>
          <ActivityIndicator />
        </View>
      );
    return (
      <View style={style}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          onDragStart={!!this.props.onRegionChange && this.props.onRegionChange}
          onDragEnd={this.onDragEnd}
          defaultZoom={15}
          onClick={this.props.onPress}
        >
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Circle = Circle;
MapView.Polyline = Polyline;



export default MapView;