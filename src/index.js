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

    let region = typeof this.props.region != "undefined" ? this.props.region : this.props.initialRegion; 

    this.state = { 
      center: { 
        lat: typeof region != "undefined" ? region.latitude : 0, 
        lng: typeof region != "undefined" ? region.longitude : 0 
      }
    };
  }

  handleMapMounted = map => (this.map = map);

  onDragEnd = () => {
    const center = this.map.getCenter();
    !!this.props.onRegionChangeComplete &&
      this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
  };

  getZoom() {
    if(typeof this.state.zoom != "undefined"){
      return this.state.zoom;
    }

    if(typeof this.props.zoom != "undefined"){
      return this.props.zoom;
    }

    let region = typeof this.props.region != "undefined" ? this.props.region : this.props.initialRegion;  

    if(typeof region != "undefined" && typeof region.latitudeDelta != "undefined" && typeof region.longitudeDelta != "undefined"){
      let latitudeDelta = region.latitudeDelta;
      let longitudeDelta = region.longitudeDelta;
      
      let zoomIndex = latitudeDelta * longitudeDelta;
      let zoom = 17 - (Math.log10((zoomIndex * 1800) * 1000));
  
      return zoom;
    }

    return 15;
  }

  animateToCoordinate(coordinates){
    this.setState({
      center : {
        lat : coordinates.latitude,
        lng : coordinates.longitude
      },
      zoom : 24
    });
  }

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
          defaultZoom={this.getZoom()}
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